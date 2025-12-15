import { h } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';
import { usePhotos } from '../store/PhotoStore.js';
const html = htm.bind(h);

const PolasPage = ({ onNavigate }) => {
    const { userPhotos } = usePhotos();

    // Group photos by month/year
    const getGroupedArchives = () => {
        const polaPhotos = userPhotos.filter(p => p.category === 'pola');
        
        const grouped = polaPhotos.reduce((acc, photo) => {
            const date = new Date(photo.created_at || Date.now());
            const monthYear = date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
            // Capitalize first letter
            const formattedDate = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
            
            if (!acc[formattedDate]) {
                acc[formattedDate] = [];
            }
            acc[formattedDate].push(photo);
            return acc;
        }, {});

        // Convert to array and sort (most recent first) - assuming created_at order
        // Mock data fallback if empty
        if (Object.keys(grouped).length === 0) {
            return [
                { date: 'Oct 2023', cover: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80', count: 8 },
                { date: 'Juin 2023', cover: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80', count: 12 },
                { date: 'Jan 2023', cover: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', count: 10 },
            ];
        }

        return Object.entries(grouped).map(([date, photos]) => ({
            date,
            cover: photos[0].image_data, // Use first photo as cover
            count: photos.length,
            photos: photos // Keep reference to photos
        }));
    };

    const archives = getGroupedArchives();

    return html`
        <div class="h-full flex flex-col space-y-4 animate-fade-in bg-secondary pt-2">
            <!-- Hero Section -->
            <div class="bg-neutral p-10 rounded-[2.5rem] shadow-2xl border border-white/10 text-center relative overflow-hidden group transition-all duration-300 shrink-0 transform hover:scale-[1.01]">
                <!-- Decorative background elements -->
                <div class="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse"></div>
                <div class="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-3xl -ml-10 -mb-10"></div>
                
                <div class="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 shadow-2xl ring-1 ring-white/20 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                
                <h2 class="text-3xl font-bold mb-3 text-white tracking-tight">Mettre à jour mes polas</h2>
                <p class="text-gray-400 text-base mb-8 leading-relaxed px-4 font-medium">
                    Assurez-vous d'avoir une belle lumière naturelle et un fond neutre.
                </p>
                
                <button 
                    onClick=${() => onNavigate('camera')}
                    class="bg-white text-black px-8 py-5 rounded-2xl font-bold text-lg w-full hover:bg-gray-100 transition transform active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center space-x-3"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Lancer le shooting</span>
                </button>
            </div>

            <!-- Archives Section -->
            <div class="flex-1">
                <div class="flex justify-between items-end mb-4">
                    <h3 class="font-bold text-lg text-neutral">Archives</h3>
                    <span class="text-xs text-neutral/40 font-medium uppercase tracking-wider">Historique</span>
                </div>
                
                <div class="space-y-4">
                    ${archives.map(item => html`
                        <div 
                            onClick=${() => onNavigate('archive-details', item.date)}
                            class="bg-white p-2 rounded-2xl shadow-sm border border-accent flex items-center hover:shadow-md transition cursor-pointer hover:border-primary/30 group"
                        >
                            <div class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-secondary group-hover:opacity-90 transition">
                                <img src="${item.cover}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                            </div>
                            <div class="ml-4 flex-1">
                                <h4 class="font-bold text-neutral text-lg group-hover:text-primary transition-colors">${item.date}</h4>
                                <p class="text-neutral/40 text-sm font-medium">${item.count} photos</p>
                            </div>
                            <div class="mr-4 text-accent group-hover:text-primary transition-colors bg-secondary p-2 rounded-full group-hover:bg-primary/10">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    `)}
                </div>
            </div>
        </div>
    `;
};

export default PolasPage;