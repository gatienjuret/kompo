import { h, createContext } from 'https://unpkg.com/preact@latest?module';
import { useState, useContext, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';
import { supabase } from '../services/supabase.js';
import { useAuth } from './AuthStore.js';

const html = htm.bind(h);

// Create Context
const PhotoContext = createContext({
    userPhotos: [],
    lastPhoto: null,
    loading: false,
    addPhoto: async () => {}
});

// Provider Component
export const PhotoProvider = ({ children }) => {
    const { user } = useAuth();
    const [userPhotos, setUserPhotos] = useState([]);
    const [lastPhoto, setLastPhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    // Charger les photos au démarrage ou quand l'utilisateur change
    useEffect(() => {
        if (user) {
            loadPhotos();
        } else {
            setUserPhotos([]); // Vider les photos si déconnecté
        }
    }, [user]);

    const loadPhotos = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('photos')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (data) {
                // On garde l'objet complet maintenant, pas juste image_data
                setUserPhotos(data);
                if (data.length > 0) setLastPhoto(data[0].image_data);
            }
        } catch (error) {
            console.error('Erreur chargement photos:', error);
        } finally {
            setLoading(false);
        }
    };

    const addPhoto = async (photoDataUrl, category = 'uncategorized') => {
        if (!user) {
            console.error("Impossible d'ajouter une photo : utilisateur non connecté");
            return;
        }

        const newPhoto = {
            image_data: photoDataUrl,
            category: category,
            created_at: new Date().toISOString()
        };

        // 1. Mise à jour optimiste
        setUserPhotos(prev => [newPhoto, ...prev]);
        setLastPhoto(photoDataUrl);

        // 2. Sauvegarde en base de données
        try {
            const { error } = await supabase
                .from('photos')
                .insert([
                    { 
                        user_id: user.id, 
                        image_data: photoDataUrl,
                        category: category
                    }
                ]);

            if (error) throw error;
        } catch (error) {
            console.error('Erreur sauvegarde photo:', error);
            alert("Erreur lors de la sauvegarde de la photo !");
        }
    };

    return html`
        <${PhotoContext.Provider} value=${{ userPhotos, lastPhoto, loading, addPhoto }}>
            ${children}
        <//>
    `;
};

// Custom Hook
export const usePhotos = () => {
    const context = useContext(PhotoContext);
    if (!context) {
        return { userPhotos: [], lastPhoto: null, addPhoto: () => {} };
    }
    return context;
};
