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
                onNavigate('profile');
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
        <div class="h-full w-full bg-secondary flex items-center justify-center p-6 relative overflow-hidden animate-fade-in">
            <!-- Decorative Background Elements -->
            <div class="absolute top-[-20%] right-[-20%] w-[80%] h-[60%] bg-primary/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
            <div class="absolute bottom-[-10%] left-[-10%] w-[60%] h-[50%] bg-accent/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div class="w-full max-w-sm z-10">
                <!-- Logo & Brand -->
                <div class="text-center mb-12">
                    <div class="w-24 h-24 bg-white rounded-[2rem] shadow-2xl mx-auto flex items-center justify-center mb-6 transform hover:rotate-6 transition-transform duration-500 ring-1 ring-white/50">
                        <img src="/assets/icons/logo.png" alt="Kompo" class="w-14 h-14 object-contain" />
                    </div>
                    <h1 class="text-4xl font-bold text-neutral tracking-tight mb-2">Kompo</h1>
                    <p class="text-neutral/40 text-sm font-medium uppercase tracking-widest">Model Management</p>
                </div>

                <!-- Form Card -->
                <div class="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 relative overflow-hidden">
                    <!-- Top Gradient Line -->
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>

                    <h2 class="text-2xl font-bold text-neutral mb-2 text-center">
                        ${isLogin ? 'Bienvenue' : 'Créer un compte'}
                    </h2>
                    <p class="text-center text-neutral/40 text-sm mb-8">
                        ${isLogin ? 'Connectez-vous à votre espace' : 'Rejoignez l\'agence dès maintenant'}
                    </p>

                    ${error && html`
                        <div class="bg-red-50 border border-red-100 text-red-500 p-4 rounded-2xl mb-6 text-sm flex items-center shadow-sm animate-shake">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            ${error}
                        </div>
                    `}

                    <form onSubmit=${handleSubmit} class="space-y-5">
                        <div class="group">
                            <label class="block text-xs font-bold text-neutral/40 uppercase tracking-wider mb-2 ml-1">Email</label>
                            <div class="relative">
                                <input 
                                    type="email" 
                                    value=${email}
                                    onInput=${e => setEmail(e.target.value)}
                                    class="w-full bg-secondary/50 px-5 py-4 rounded-2xl text-neutral font-medium placeholder-neutral/30 outline-none border border-transparent focus:border-primary/20 focus:bg-white focus:shadow-[0_0_0_4px_rgba(167,38,38,0.05)] transition-all duration-300"
                                    placeholder="modele@agence.com"
                                    required
                                />
                                <div class="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div class="group">
                            <label class="block text-xs font-bold text-neutral/40 uppercase tracking-wider mb-2 ml-1">Mot de passe</label>
                            <div class="relative">
                                <input 
                                    type="password" 
                                    value=${password}
                                    onInput=${e => setPassword(e.target.value)}
                                    class="w-full bg-secondary/50 px-5 py-4 rounded-2xl text-neutral font-medium placeholder-neutral/30 outline-none border border-transparent focus:border-primary/20 focus:bg-white focus:shadow-[0_0_0_4px_rgba(167,38,38,0.05)] transition-all duration-300"
                                    placeholder="••••••••"
                                    required
                                    minlength="6"
                                />
                                <div class="absolute right-4 top-1/2 -translate-y-1/2 text-primary opacity-0 group-focus-within:opacity-100 transition-opacity duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled=${loading}
                            class="w-full bg-primary text-white py-4 rounded-2xl font-bold tracking-wide shadow-[0_10px_20px_rgba(167,38,38,0.2)] hover:shadow-[0_15px_30px_rgba(167,38,38,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-4 relative overflow-hidden group"
                        >
                            <span class="relative z-10">${loading ? 'Connexion en cours...' : (isLogin ? 'Se connecter' : "S'inscrire")}</span>
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                        </button>
                    </form>

                    <div class="mt-8 text-center">
                        <button 
                            onClick=${() => setIsLogin(!isLogin)}
                            class="text-sm font-medium text-neutral/50 hover:text-primary transition-colors duration-300"
                        >
                            ${isLogin ? "Pas encore de compte ? " : 'Déjà un compte ? '}
                            <span class="font-bold text-neutral">${isLogin ? "Créer un compte" : 'Se connecter'}</span>
                        </button>
                    </div>
                </div>
                
                <p class="text-center text-neutral/20 text-xs mt-8 font-medium">
                    © 2024 Kompo Agency
                </p>
            </div>
        </div>
    `;
}
