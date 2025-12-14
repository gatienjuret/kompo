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
    lastPhotoDate: null,
    loading: false,
    addPhoto: async () => {}
});

// Provider Component
export const PhotoProvider = ({ children }) => {
    const { user } = useAuth();
    const [userPhotos, setUserPhotos] = useState([]);
    const [lastPhoto, setLastPhoto] = useState(null);
    const [lastPhotoDate, setLastPhotoDate] = useState(null);
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
                // On garde juste l'image_data pour l'affichage, mais on pourrait garder tout l'objet
                const photos = data.map(p => p.image_data);
                setUserPhotos(photos);
                if (photos.length > 0) {
                    setLastPhoto(photos[0]);
                    setLastPhotoDate(data[0].created_at);
                }
            }
        } catch (error) {
            console.error('Erreur chargement photos:', error);
        } finally {
            setLoading(false);
        }
    };

    const addPhoto = async (photoDataUrl) => {
        if (!user) {
            console.error("Impossible d'ajouter une photo : utilisateur non connecté");
            return;
        }

        // 1. Mise à jour optimiste (pour que l'interface soit réactive tout de suite)
        setUserPhotos(prev => [photoDataUrl, ...prev]);
        setLastPhoto(photoDataUrl);
        setLastPhotoDate(new Date().toISOString());

        // 2. Sauvegarde en base de données
        try {
            const { error } = await supabase
                .from('photos')
                .insert([
                    { 
                        user_id: user.id, 
                        image_data: photoDataUrl,
                        category: 'uncategorized'
                    }
                ]);

            if (error) throw error;
        } catch (error) {
            console.error('Erreur sauvegarde photo:', error);
            // En cas d'erreur, on pourrait annuler l'ajout (rollback) ici si on voulait être puriste
            alert("Erreur lors de la sauvegarde de la photo !");
        }
    };

    return html`
        <${PhotoContext.Provider} value=${{ userPhotos, lastPhoto, lastPhotoDate, loading, addPhoto }}>
            ${children}
        <//>
    `;
};

// Custom Hook
export const usePhotos = () => {
    const context = useContext(PhotoContext);
    if (!context) {
        return { userPhotos: [], lastPhoto: null, lastPhotoDate: null, addPhoto: () => {} };
    }
    return context;
};
