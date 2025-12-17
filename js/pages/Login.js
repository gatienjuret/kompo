import { h } from 'https://unpkg.com/preact@latest?module';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';
import { useAuth } from '../store/AuthStore.js';

const html = htm.bind(h);

export default function LoginPage({ onNavigate }) {
    const { signIn, signUp } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                await signIn(email, password);
                onNavigate('home'); // Rediriger vers le profil après connexion
            } else {
                await signUp(email, password);
                alert('Compte créé ! Vérifiez vos emails pour confirmer.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return html`
        <div class="min-h-screen bg-secondary flex items-center justify-center p-4">
            <div class="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div class="p-8">
                    <div class="flex justify-center mb-6">
                        <img src="/assets/icons/logo.png" alt="Kompo Logo" class="h-16 w-auto" />
                    </div>
                    <h2 class="text-3xl font-bold text-center text-primary mb-2">
                        ${isLogin ? 'Connexion' : 'Inscription'}
                    </h2>
                    <p class="text-center text-neutral/60 mb-8">
                        ${isLogin ? 'Bon retour parmi nous !' : 'Créez votre compte pour commencer'}
                    </p>

                    ${error && html`
                        <div class="bg-red-50 text-red-500 p-3 rounded-lg mb-4 text-sm">
                            ${error}
                        </div>
                    `}

                    <form onSubmit=${handleSubmit} class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-neutral mb-1">Email</label>
                            <input 
                                type="email" 
                                value=${email}
                                onInput=${e => setEmail(e.target.value)}
                                class="w-full px-4 py-2 rounded-lg border border-neutral/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                                placeholder="votre@email.com"
                                required
                            />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-neutral mb-1">Mot de passe</label>
                            <input 
                                type="password" 
                                value=${password}
                                onInput=${e => setPassword(e.target.value)}
                                class="w-full px-4 py-2 rounded-lg border border-neutral/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
                                placeholder="••••••••"
                                required
                                minlength="6"
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled=${loading}
                            class="w-full bg-primary text-white py-3 rounded-lg font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ${loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
                        </button>
                    </form>

                    <div class="mt-6 text-center">
                        <button 
                            onClick=${() => setIsLogin(!isLogin)}
                            class="text-sm text-neutral/60 hover:text-primary transition"
                        >
                            ${isLogin ? "Pas encore de compte ? S'inscrire" : 'Déjà un compte ? Se connecter'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}
