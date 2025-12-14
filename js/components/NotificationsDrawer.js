import { h } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

const NotificationsDrawer = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const notifications = [
        {
            id: 1,
            title: "Nouveau casting",
            message: "Casting pour la campagne d'été Zara demain à 14h.",
            time: "Il y a 2h",
            read: false
        },
        {
            id: 2,
            title: "Photos validées",
            message: "Votre agence a validé vos derniers polas.",
            time: "Il y a 5h",
            read: true
        },
        {
            id: 3,
            title: "Rappel",
            message: "N'oubliez pas de mettre à jour vos mensurations.",
            time: "Hier",
            read: true
        }
    ];

    return html`
        <div class="fixed inset-0 z-50 flex justify-end">
            <!-- Backdrop -->
            <div 
                class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
                onClick=${onClose}
            ></div>

            <!-- Drawer Panel -->
            <div class="relative w-4/5 max-w-sm h-full bg-white shadow-2xl flex flex-col animate-slide-in-right">
                <!-- Header -->
                <div class="p-6 border-b border-neutral/10 flex justify-between items-center bg-secondary">
                    <h2 class="text-xl font-bold text-neutral">Notifications</h2>
                    <button 
                        onClick=${onClose}
                        class="p-2 -mr-2 text-neutral/40 hover:text-neutral transition-colors rounded-full hover:bg-neutral/5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <!-- Content -->
                <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/30">
                    ${notifications.map(notif => html`
                        <div class="bg-white p-4 rounded-2xl shadow-sm border ${notif.read ? 'border-transparent' : 'border-primary/20'} relative overflow-hidden group hover:shadow-md transition-all">
                            ${!notif.read && html`
                                <div class="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"></div>
                            `}
                            <h3 class="font-bold text-neutral mb-1 pr-4">${notif.title}</h3>
                            <p class="text-neutral/60 text-sm mb-3 leading-relaxed">${notif.message}</p>
                            <span class="text-xs text-neutral/40 font-medium">${notif.time}</span>
                        </div>
                    `)}
                </div>

                <!-- Footer -->
                <div class="p-4 border-t border-neutral/10 bg-white">
                    <button class="w-full py-3 text-center text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                        Tout marquer comme lu
                    </button>
                </div>
            </div>
        </div>
    `;
};

export default NotificationsDrawer;
