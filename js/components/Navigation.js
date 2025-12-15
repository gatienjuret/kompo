import { h } from 'https://unpkg.com/preact@latest?module';
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';
const html = htm.bind(h);

const Navigation = ({ active, onChange }) => {
    const navItems = [
        { id: 'polas', label: 'Polas', icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z' },
        { id: 'book', label: 'Book', icon: 'M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z' },
        { id: 'home', label: 'Accueil', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { id: 'calendar', label: 'Agenda', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
        { id: 'finance', label: 'Finances', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
    ];

    const activeIndex = navItems.findIndex(item => item.id === active);
    const activeItem = navItems[activeIndex] || navItems[0]; // Fallback if not found
    const [isMoving, setIsMoving] = useState(false);

    useEffect(() => {
        setIsMoving(true);
        // Timing adjusted to match the transition duration
        const timer = setTimeout(() => setIsMoving(false), 300);
        return () => clearTimeout(timer);
    }, [active]);

    // Safety check: If the active page is not in the navigation items, do not render the navigation bar.
    // This prevents crashes when navigating to pages like 'login', 'archive-details', etc.
    if (activeIndex === -1) return null;

    return html`
        <nav class="absolute bottom-6 left-6 right-6 h-16 z-50">
            
            <!-- 1. Glass Background (Independent, NO FILTER) -->
            <div class="absolute inset-0 rounded-full bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] ring-1 ring-white/50"></div>

            <!-- Wrapper that provides the padding context -->
            <div class="relative w-full h-full px-4">
                
                <!-- The "Grid Container" context -->
                <div class="relative w-full h-full">
                    
                    <!-- 2. Liquid Layer (Absolute, Same Size, WITH FILTER) -->
                    <!-- Removed filter: url('#goo') to avoid blobby merging artifacts. We want a clean glass lens sliding. -->
                    <div class="absolute inset-0 pointer-events-none">
                         <!-- Indicator (positioned relative to this container) -->
                         <div 
                             class="absolute top-0 left-0 h-full w-1/5 flex items-center justify-center transition-transform duration-[400ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] z-20"
                             style="transform: translateX(${activeIndex * 100}%)"
                         >
                            <div class="relative flex items-center justify-center transition-all duration-300 ${isMoving ? 'scale-x-125 scale-y-75' : 'scale-100'}">
                                <!-- 
                                     PURE GLASS INDICATOR
                                     A clean, pill/circle shape that acts as a lens.
                                     - bg-white/20: Semi-transparent body.
                                     - backdrop-blur-[2px]: Subtle blur to distort what's behind (the icon placeholder or bg).
                                     - shadow-[...]: Deep inset shadows for the "thick glass" bevel effect.
                                     - border-white/40: Crisp edge.
                                -->
                                <div class="w-16 h-12 rounded-[2rem] bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-[1px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.15)] border border-white/50 transition-all duration-300"></div>
                                
                                <!-- Shine reflection on top -->
                                <div class="absolute top-1 w-10 h-3 bg-gradient-to-b from-white/80 to-transparent rounded-full opacity-60"></div>
                            </div>
                         </div>
                    </div>
                    
                    <!-- 2b. Sharp Icon Overlay (Absolute, Same Size, NO FILTER) -->
                     <div class="absolute inset-0 pointer-events-none z-30">
                         <div 
                             class="absolute top-0 left-0 h-full w-1/5 flex items-center justify-center transition-transform duration-[400ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]"
                             style="transform: translateX(${activeIndex * 100}%)"
                         >
                            <!-- Icon is slightly magnified and colored when active -->
                            <div class="relative flex items-center justify-center transition-all duration-300 scale-100 opacity-100">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="w-6 h-6 text-primary drop-shadow-sm transition-all duration-300" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                    style="stroke-width: 2.5px; stroke-linecap: round; stroke-linejoin: round;"
                                >
                                    <path d="${activeItem.icon}" />
                                </svg>
                            </div>
                         </div>
                    </div>

                    <!-- 3. Content Layer (Grid, Same Size, NO FILTER) -->
                    <div class="relative w-full h-full grid grid-cols-5 items-center">
                        ${navItems.map((item) => {
                            const isActive = active === item.id;
                            const isHome = item.id === 'home';
                            
                            // Base size classes
                            let iconClasses = "transition-all duration-300 ";
                            
                            if (isHome) {
                                iconClasses += "w-7 h-7 ";
                            } else {
                                iconClasses += "w-5 h-5 ";
                            }

                            // Inactive state styling
                            if (isActive) {
                                iconClasses += "opacity-0";
                            } else {
                                iconClasses += "text-neutral/60 group-hover:text-neutral group-hover:scale-110";
                            }

                            return html`
                            <button 
                                class="relative flex items-center justify-center w-full h-full rounded-full transition-all duration-300 group z-10"
                                onClick=${() => onChange(item.id)}
                                title="${item.label}"
                            >
                                <!-- Inactive Icon Background (for Goo effect - moved here but won't goo with main blob across layers easily, but keeps blur) -->
                                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
                                     <div class="w-8 h-8 bg-neutral/20 rounded-full blur-sm"></div>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" class="${iconClasses}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${item.icon}" />
                                </svg>
                            </button>
                        `})}
                    </div>
                    
                </div>
            </div>
        </nav>
    `;
};

export default Navigation;
