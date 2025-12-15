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
        <div class="animate-fade-in bg-secondary dark:bg-secondary-dark min-h-full pb-8 transition-colors duration-300">
            <!-- Back Button Header -->
            <div class="absolute top-0 w-full p-6 z-20 flex justify-between items-center">
                <button onClick=${onBack} class="w-10 h-10 rounded-full bg-white dark:bg-accent-dark shadow-md flex items-center justify-center text-neutral dark:text-neutral-light hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            <!-- Header Profile Section -->
            <div class="bg-white dark:bg-accent-dark rounded-b-[2.5rem] shadow-lg border-b border-accent dark:border-white/5 p-8 pt-20 text-center relative mb-8 transition-colors duration-300">
                <div class="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-xl border-4 border-white dark:border-white/10 overflow-hidden">
                    ${user?.email ? user.email[0].toUpperCase() : 'MJ'}
                </div>
                <h2 class="text-2xl font-bold text-neutral dark:text-neutral-light mb-1 transition-colors">
                    ${user?.email ? user.email.split('@')[0] : 'Marie Jeanne'}
                </h2>
                <p class="text-neutral/40 dark:text-neutral-light/40 text-sm font-medium mb-6 transition-colors">
                    ${user?.email || 'marie.jeanne@model-agency.com'}
                </p>
            </div>

            <!-- Settings List -->
            <div class="px-6 space-y-6">
                <!-- Personal Info Section -->
                <div>
                    <h3 class="text-neutral/40 dark:text-neutral-light/40 text-xs font-bold uppercase tracking-widest mb-3 ml-2 transition-colors">Informations</h3>
                    <div class="bg-white dark:bg-accent-dark rounded-2xl shadow-sm border border-accent dark:border-white/5 overflow-hidden transition-colors duration-300">
                        <div 
                            onClick=${() => setSubPage('edit')}
                            class="p-4 border-b border-secondary dark:border-white/5 flex justify-between items-center hover:bg-secondary/30 dark:hover:bg-white/5 transition cursor-pointer"
                        >
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span class="font-medium text-neutral dark:text-neutral-light transition-colors">Modifier le profil</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral/30 dark:text-neutral-light/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div 
                            onClick=${() => setSubPage('notifications')}
                            class="p-4 border-b border-secondary dark:border-white/5 flex justify-between items-center hover:bg-secondary/30 dark:hover:bg-white/5 transition cursor-pointer"
                        >
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span class="font-medium text-neutral dark:text-neutral-light transition-colors">Email & Notifications</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral/30 dark:text-neutral-light/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- App Settings Section -->
                <div>
                    <h3 class="text-neutral/40 dark:text-neutral-light/40 text-xs font-bold uppercase tracking-widest mb-3 ml-2 transition-colors">Application</h3>
                    <div class="bg-white dark:bg-accent-dark rounded-2xl shadow-sm border border-accent dark:border-white/5 overflow-hidden transition-colors duration-300">
                        
                        <!-- Dark Mode Toggle -->
                        <div 
                            onClick=${toggleDarkMode}
                            class="p-4 border-b border-secondary dark:border-white/5 flex justify-between items-center hover:bg-secondary/30 dark:hover:bg-white/5 transition cursor-pointer"
                        >
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-neutral/10 dark:bg-white/10 flex items-center justify-center text-neutral dark:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                </div>
                                <span class="font-medium text-neutral dark:text-neutral-light transition-colors">Mode Sombre</span>
                            </div>
                            <div class="w-10 h-5 bg-neutral/20 dark:bg-primary rounded-full relative transition-colors duration-300">
                                <div class="w-5 h-5 bg-white rounded-full shadow-sm absolute top-0 left-0 dark:left-5 transition-all duration-300 transform scale-110"></div>
                            </div>
                        </div>

                        <div 
                            onClick=${() => setSubPage('help')}
                            class="p-4 border-b border-secondary dark:border-white/5 flex justify-between items-center hover:bg-secondary/30 dark:hover:bg-white/5 transition cursor-pointer"
                        >
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span class="font-medium text-neutral dark:text-neutral-light transition-colors">Aide & Support</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral/30 dark:text-neutral-light/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div 
                            onClick=${handleLogout}
                            class="p-4 flex justify-between items-center hover:bg-secondary/30 dark:hover:bg-white/5 transition cursor-pointer text-red-500"
                        >
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </div>
                                <span class="font-medium">Déconnexion</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-8 text-center">
                <p class="text-neutral/30 dark:text-neutral-light/30 text-xs transition-colors">Version 1.0.2</p>
            </div>
        </div>
    `;
};

export default ProfilePage;