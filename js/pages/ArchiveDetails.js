import { h } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';
const html = htm.bind(h);

const ArchiveDetailsPage = ({ date, onBack }) => {
    // Simuler des photos pour l'archive
    const photos = [
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1521119989659-a83eee488058?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ];

    return html`
        <div class="min-h-full flex flex-col bg-secondary animate-fade-in">
            <!-- Header -->
            <div class="px-6 py-4 flex items-center justify-between sticky top-0 bg-secondary/95 backdrop-blur-sm z-10 border-b border-neutral/5">
                <button 
                    onClick=${onBack}
                    class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-neutral shadow-sm border border-accent/50 hover:scale-105 transition-all active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                
                <div class="flex flex-col items-center">
                    <span class="text-xs font-bold text-accent uppercase tracking-widest mb-0.5">Archive</span>
                    <h1 class="text-xl font-bold text-neutral">${date}</h1>
                </div>
                
                <div class="w-10"></div> <!-- Spacer for centering -->
            </div>

            <!-- Grid -->
            <div class="px-6 py-6 grid grid-cols-2 gap-4 pb-24">
                ${photos.map((photo, index) => html`
                    <div class="bg-white p-2 rounded-2xl shadow-sm border border-accent/50 group animate-slide-up hover:shadow-lg transition-all duration-300 hover:-translate-y-1" style="animation-delay: ${index * 100}ms">
                        <div class="aspect-[3/4] rounded-xl overflow-hidden bg-secondary relative">
                            <img 
                                src="${photo}" 
                                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <!-- Gradient Overlay on hover -->
                            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                `)}
            </div>
        </div>
    `;
};

export default ArchiveDetailsPage;
