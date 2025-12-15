import { h } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';
import { usePhotos } from '../store/PhotoStore.js';
const html = htm.bind(h);

const AllPhotosPage = ({ onNavigate, onBack }) => {
    const { userPhotos } = usePhotos();
    
    // Explicitly handle back navigation to book
    const handleBack = () => {
        onNavigate('book');
    };
    
    // Fallback images if user has no photos
    const demoPhotos = [
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1534030347209-71166d7faf92?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=300&q=80'
    ];

    // Filter photos to only show book category
    const bookPhotos = userPhotos
        .filter(p => p.category === 'book')
        .map(p => p.image_data);

    const displayPhotos = bookPhotos.length > 0 ? [...bookPhotos, ...demoPhotos] : demoPhotos;

    // Helper to get status
    const getStatus = (index) => {
        const statuses = ['pending', 'validated', 'rejected', 'validated'];
        return statuses[index % statuses.length];
    };

    const getStatusLabel = (status) => {
        switch(status) {
            case 'pending': return { text: 'En cours', color: 'bg-orange-500' };
            case 'validated': return { text: 'Validé', color: 'bg-green-500' };
            case 'rejected': return { text: 'Refusé', color: 'bg-red-500' };
            default: return { text: 'Inconnu', color: 'bg-gray-500' };
        }
    };

    return html`
        <div class="animate-fade-in bg-secondary min-h-full pb-8">
            <!-- Back Button Header -->
            <div class="fixed top-0 w-full p-4 z-30 flex justify-between items-center bg-secondary/80 backdrop-blur-md border-b border-accent/50">
                <button onClick=${handleBack} class="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-neutral hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h1 class="text-lg font-bold text-neutral uppercase tracking-widest">Toutes les photos</h1>
                <div class="w-10"></div> <!-- Spacer for centering -->
            </div>

            <!-- Photos Grid -->
            <div class="px-2 pt-24 pb-8">
                <div class="grid grid-cols-2 gap-4">
                    ${displayPhotos.map((photo, index) => {
                        const status = getStatus(index);
                        const label = getStatusLabel(status);
                        
                        return html`
                        <div class="aspect-[3/4] rounded-2xl overflow-hidden relative shadow-md group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                            <img src="${photo}" class="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
                            
                            <div class="absolute top-2 right-2 ${label.color} text-white px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide shadow-sm">
                                ${label.text}
                            </div>
                        </div>
                    `})}
                </div>
            </div>
        </div>
    `;
};

export default AllPhotosPage;