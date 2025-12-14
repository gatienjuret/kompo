import { h, createContext } from 'https://unpkg.com/preact@latest?module';
import { useState, useContext, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';
import { supabase } from '../services/supabase.js';

const html = htm.bind(h);

const AuthContext = createContext({
    user: null,
    session: null,
    loading: true,
    signIn: async () => {},
    signUp: async () => {},
    signOut: async () => {}
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Vérifier la session active au démarrage
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Écouter les changements d'état d'authentification
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) throw error;
        return data;
    };

    const signUp = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });
        if (error) throw error;
        return data;
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    };

    return html`
        <${AuthContext.Provider} value=${{ user, session, loading, signIn, signUp, signOut }}>
            ${children}
        <//>
    `;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
