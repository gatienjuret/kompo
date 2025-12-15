import { h } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import { useAuth } from '../store/AuthStore.js';
import EditProfile from '../components/profile/EditProfile.js';
import NotificationsSettings from '../components/profile/NotificationsSettings.js';
import HelpSupport from '../components/profile/HelpSupport.js';

const html = htm.bind(h);

const ProfilePage = ({ onNavigate, onBack }) => {
    const { user, signOut } = useAuth();
    const [subPage, setSubPage] = useState(null);

    const handleLogout = async () => {
        try {
            await signOut();
            onNavigate('login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
        }
    };

    const toggleDarkMode = () => {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    if (subPage === 'edit') return html`<${EditProfile} onBack=${() => setSubPage(null)} />`;
    if (subPage === 'notifications') return html`<${NotificationsSettings} onBack=${() => setSubPage(null)} />`;
    if (subPage === 'help') return html`<${HelpSupport} onBack=${() => setSubPage(null)} />`;

    return html`
        <div class="animate-fade-in min-h-full flex flex-col bg-secondary dark:bg-secondary-dark transition-colors duration-300">
            
            <!-- Header with Title & Back Button -->
            <div class="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 z-20 bg-secondary/95 dark:bg-secondary-dark/95 backdrop-blur-sm">
                <div class="flex items-center space-x-4">
                    <button onClick=${onBack} class="w-10 h-10 rounded-full bg-white dark:bg-accent-dark shadow-sm border border-accent dark:border-white/5 flex items-center justify-center text-neutral dark:text-neutral-light hover:scale-105 transition-transform active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 class="text-3xl font-bold text-primary">Profil</h1>
                </div>
            </div>

            <div class="flex-1 px-6 pb-24 space-y-6 overflow-y-auto">
                <!-- Profile Card -->
                <div class="bg-white dark:bg-accent-dark rounded-[2rem] p-6 shadow-xl dark:shadow-none border border-accent dark:border-white/5 flex flex-col items-center text-center relative overflow-hidden group">
                    <!-- Decor background -->
                    <div class="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary/10 to-transparent dark:from-primary/5"></div>
                    
                    <div class="relative w-28 h-28 mb-4">
                        <div class="w-full h-full bg-primary rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-white dark:border-[#2A2A2A] relative z-10">
                            ${user?.email ? user.email[0].toUpperCase() : 'MJ'}
                        </div>
                        <div class="absolute inset-0 bg-primary/20 blur-xl rounded-full transform translate-y-2 -z-0"></div>
                    </div>
                    
                    <h2 class="text-2xl font-bold text-neutral dark:text-neutral-light mb-1">
                        ${user?.email ? user.email.split('@')[0] : 'Marie Jeanne'}
                    </h2>
                    <div class="inline-flex items-center px-3 py-1 rounded-full bg-secondary dark:bg-white/5 border border-accent dark:border-white/5 mb-2">
                        <span class="text-neutral/60 dark:text-neutral-light/60 text-xs font-medium tracking-wide">
                            ${user?.email || 'marie.jeanne@model-agency.com'}
                        </span>
                    </div>
                </div>

                <!-- Settings Grid -->
                <div class="space-y-6">
                    <!-- Section: Informations -->
                    <div>
                        <h3 class="text-neutral/40 dark:text-neutral-light/40 text-xs font-bold uppercase tracking-widest mb-4 ml-2">Informations</h3>
                        <div class="grid gap-3">
                            <button 
                                onClick=${() => setSubPage('edit')}
                                class="bg-white dark:bg-accent-dark p-4 rounded-2xl shadow-sm border border-accent dark:border-white/5 flex items-center justify-between group hover:scale-[1.02] active:scale-95 transition-all duration-300"
                            >
                                <div class="flex items-center space-x-4">
                                    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <span class="font-bold text-neutral dark:text-neutral-light">Modifier le profil</span>
                                </div>
                                <div class="w-8 h-8 rounded-full bg-secondary dark:bg-white/5 flex items-center justify-center text-neutral/40 dark:text-neutral-light/40 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>

                            <button 
                                onClick=${() => setSubPage('notifications')}
                                class="bg-white dark:bg-accent-dark p-4 rounded-2xl shadow-sm border border-accent dark:border-white/5 flex items-center justify-between group hover:scale-[1.02] active:scale-95 transition-all duration-300"
                            >
                                <div class="flex items-center space-x-4">
                                    <div class="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <span class="font-bold text-neutral dark:text-neutral-light">Email & Notifications</span>
                                </div>
                                <div class="w-8 h-8 rounded-full bg-secondary dark:bg-white/5 flex items-center justify-center text-neutral/40 dark:text-neutral-light/40 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Section: Application -->
                    <div>
                        <h3 class="text-neutral/40 dark:text-neutral-light/40 text-xs font-bold uppercase tracking-widest mb-4 ml-2">Application</h3>
                        <div class="grid gap-3">
                            <!-- Dark Mode Toggle -->
                            <div 
                                onClick=${toggleDarkMode}
                                class="bg-white dark:bg-accent-dark p-4 rounded-2xl shadow-sm border border-accent dark:border-white/5 flex items-center justify-between group cursor-pointer active:scale-95 transition-all duration-300"
                            >
                                <div class="flex items-center space-x-4">
                                    <div class="w-10 h-10 rounded-full bg-neutral/10 dark:bg-white/10 flex items-center justify-center text-neutral dark:text-white transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                        </svg>
                                    </div>
                                    <span class="font-bold text-neutral dark:text-neutral-light">Mode Sombre</span>
                                </div>
                                <div class="w-12 h-6 bg-neutral/20 dark:bg-primary rounded-full relative transition-colors duration-300">
                                    <div class="w-6 h-6 bg-white rounded-full shadow-md absolute top-0 left-0 dark:left-6 transition-all duration-300 transform scale-110 border border-neutral/10"></div>
                                </div>
                            </div>

                            <button 
                                onClick=${() => setSubPage('help')}
                                class="bg-white dark:bg-accent-dark p-4 rounded-2xl shadow-sm border border-accent dark:border-white/5 flex items-center justify-between group hover:scale-[1.02] active:scale-95 transition-all duration-300"
                            >
                                <div class="flex items-center space-x-4">
                                    <div class="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span class="font-bold text-neutral dark:text-neutral-light">Aide & Support</span>
                                </div>
                                <div class="w-8 h-8 rounded-full bg-secondary dark:bg-white/5 flex items-center justify-center text-neutral/40 dark:text-neutral-light/40 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>

                            <button 
                                onClick=${handleLogout}
                                class="bg-white dark:bg-accent-dark p-4 rounded-2xl shadow-sm border border-accent dark:border-white/5 flex items-center justify-between group hover:scale-[1.02] active:scale-95 transition-all duration-300"
                            >
                                <div class="flex items-center space-x-4">
                                    <div class="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </div>
                                    <span class="font-bold text-red-500">Déconnexion</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="text-center pt-4">
                    <p class="text-neutral/30 dark:text-neutral-light/30 text-xs font-medium">Version 1.0.2</p>
                </div>
            </div>
        </div>
    `;
};

export default ProfilePage;