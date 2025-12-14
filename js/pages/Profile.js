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

    if (subPage === 'edit') return html`<${EditProfile} onBack=${() => setSubPage(null)} />`;
    if (subPage === 'notifications') return html`<${NotificationsSettings} onBack=${() => setSubPage(null)} />`;
    if (subPage === 'help') return html`<${HelpSupport} onBack=${() => setSubPage(null)} />`;

    return html`
        <div class="animate-fade-in bg-secondary min-h-full pb-8">
            <!-- Back Button Header -->
            <div class="absolute top-0 w-full p-6 z-20 flex justify-between items-center">
                <button onClick=${onBack} class="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-neutral hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            <!-- Header Profile Section -->
            <div class="bg-white rounded-b-[2.5rem] shadow-lg border-b border-accent p-8 pt-20 text-center relative mb-8">
                <div class="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-xl border-4 border-white overflow-hidden">
                    ${user?.email ? user.email[0].toUpperCase() : 'MJ'}
                </div>
                <h2 class="text-2xl font-bold text-neutral mb-1">
                    ${user?.email ? user.email.split('@')[0] : 'Marie Jeanne'}
                </h2>
                <p class="text-neutral/40 text-sm font-medium mb-6">
                    ${user?.email || 'marie.jeanne@model-agency.com'}
                </p>
            </div>

            <!-- Settings List -->
            <div class="px-6 space-y-6">
                <!-- Personal Info Section -->
                <div>
                    <h3 class="text-neutral/40 text-xs font-bold uppercase tracking-widest mb-3 ml-2">Informations</h3>
                    <div class="bg-white rounded-2xl shadow-sm border border-accent overflow-hidden">
                        <div 
                            onClick=${() => setSubPage('edit')}
                            class="p-4 border-b border-secondary flex justify-between items-center hover:bg-secondary/30 transition cursor-pointer"
                        >
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <span class="font-medium text-neutral">Modifier le profil</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div 
                            onClick=${() => setSubPage('notifications')}
                            class="p-4 border-b border-secondary flex justify-between items-center hover:bg-secondary/30 transition cursor-pointer"
                        >
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <span class="font-medium text-neutral">Email & Notifications</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- App Settings Section -->
                <div>
                    <h3 class="text-neutral/40 text-xs font-bold uppercase tracking-widest mb-3 ml-2">Application</h3>
                    <div class="bg-white rounded-2xl shadow-sm border border-accent overflow-hidden">
                        <div 
                            onClick=${() => setSubPage('help')}
                            class="p-4 border-b border-secondary flex justify-between items-center hover:bg-secondary/30 transition cursor-pointer"
                        >
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <span class="font-medium text-neutral">Aide & Support</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-neutral/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div 
                            onClick=${handleLogout}
                            class="p-4 flex justify-between items-center hover:bg-secondary/30 transition cursor-pointer text-red-500"
                        >
                            <div class="flex items-center space-x-3">
                                <div class="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
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
                <p class="text-neutral/30 text-xs">Version 1.0.2</p>
            </div>
        </div>
    `;
};

export default ProfilePage;