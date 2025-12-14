import { h } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

const html = htm.bind(h);

const NotificationsSettings = ({ onBack }) => {
    const [emailNotif, setEmailNotif] = useState(true);
    const [pushNotif, setPushNotif] = useState(true);
    const [marketingNotif, setMarketingNotif] = useState(false);

    const Toggle = ({ checked, onChange }) => html`
        <div 
            onClick=${() => onChange(!checked)}
            class="w-12 h-7 rounded-full p-1 cursor-pointer transition-colors duration-300 ${checked ? 'bg-primary' : 'bg-neutral/20'}"
        >
            <div class="w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}"></div>
        </div>
    `;

    return html`
        <div class="animate-fade-in bg-secondary min-h-full pb-8">
            <!-- Header -->
            <div class="relative w-full p-6 flex items-center justify-center">
                <button onClick=${onBack} class="absolute left-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-neutral hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 class="text-xl font-bold text-neutral">Notifications</h2>
            </div>

            <div class="px-6 space-y-6 mt-4">
                <div class="bg-white rounded-2xl shadow-sm border border-accent overflow-hidden p-6 space-y-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="font-bold text-neutral">Notifications Email</h3>
                            <p class="text-xs text-neutral/40 mt-1">Recevoir les castings par email</p>
                        </div>
                        <${Toggle} checked=${emailNotif} onChange=${setEmailNotif} />
                    </div>
                    
                    <div class="w-full h-px bg-secondary"></div>

                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="font-bold text-neutral">Notifications Push</h3>
                            <p class="text-xs text-neutral/40 mt-1">Alertes sur votre téléphone</p>
                        </div>
                        <${Toggle} checked=${pushNotif} onChange=${setPushNotif} />
                    </div>

                    <div class="w-full h-px bg-secondary"></div>

                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="font-bold text-neutral">Offres partenaires</h3>
                            <p class="text-xs text-neutral/40 mt-1">Promotions et actualités</p>
                        </div>
                        <${Toggle} checked=${marketingNotif} onChange=${setMarketingNotif} />
                    </div>
                </div>
            </div>
        </div>
    `;
};

export default NotificationsSettings;
