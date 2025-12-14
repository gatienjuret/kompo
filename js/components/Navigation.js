import { h } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';
const html = htm.bind(h);

const Navigation = ({ active, onChange }) => {
    const navItems = [
        { id: 'home', label: 'Accueil', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'polas', label: 'Polas', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z' },
        { id: 'book', label: 'Book', icon: 'M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' },
        { id: 'calendar', label: 'Agenda', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
    ];

    const activeIndex = navItems.findIndex(item => item.id === active);

    return html`
        <nav class="absolute bottom-6 left-12 right-12 h-16 rounded-full px-4 z-50 transition-all duration-300
            bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] ring-1 ring-white/40"
        >
            <div class="relative w-full h-full grid grid-cols-4 items-center">
                
                <!-- Liquid Drop Indicator -->
                <div 
                    class="absolute top-0 left-0 h-full w-1/4 flex items-center justify-center pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
                    style="transform: translateX(${activeIndex * 100}%)"
                >
                    <div class="w-12 h-12 relative">
                        <div class="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40 rounded-full blur-[2px] opacity-70 animate-pulse"></div>
                        <div class="absolute inset-0 bg-primary rounded-full shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.3)]"></div>
                    </div>
                </div>

                <!-- Nav Items -->
                ${navItems.map((item, index) => {
                    const isActive = active === item.id;
                    return html`
                    <button 
                        class="relative flex items-center justify-center w-full h-full rounded-full transition-all duration-300 group z-10"
                        onClick=${() => onChange(item.id)}
                        title="${item.label}"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="relative z-10 h-5 w-5 transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-neutral/60 group-hover:text-neutral group-hover:scale-110'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.icon}" />
                        </svg>
                    </button>
                `})}
            </div>
        </nav>
    `;
};

export default Navigation;