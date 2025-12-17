import { h } from 'https://unpkg.com/preact@latest?module';
import { useRef, useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';
import { usePhotos } from '../store/PhotoStore.js';
import { useNotification } from '../store/NotificationStore.js';
import Notification from '../components/Notification.js';
const html = htm.bind(h);

const BookPage = ({ onNavigate }) => {
    const { showNotification, notification } = useNotification();
    // Load existing book photos from store
    const { userPhotos, addPhoto } = usePhotos();
    
    // Filter photos to only show book category
    const bookPhotosFromStore = userPhotos
        .filter(p => p.category === 'book')
        .map(p => p.image_data);

    const fileInputRef = useRef(null);

    // Fallback images if user has no photos
    const demoPhotos = [
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
    ];

    // Local state for book photos
    const [bookPhotos, setBookPhotos] = useState([]);

    // Handle file selection from gallery
    const handleFileSelect = (event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Add to local book photos only
                    const newPhoto = e.target.result;
                    setBookPhotos(prev => [newPhoto, ...prev]);
                    // Also add to global store with category 'book'
                    addPhoto(newPhoto, 'book');
                    showNotification('Photo importée avec succès !', 'success');
                };
                reader.readAsDataURL(file);
            });
            // Reset input so same file can be selected again if needed
            event.target.value = '';
        }
    };

    // Trigger hidden file input click
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Helper to get status for demo purposes
    const getStatus = (index) => {
        // Mock logic: first photo is pending, second valid, third rejected, etc.
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

    const displayPhotos = (bookPhotos.length > 0 || bookPhotosFromStore.length > 0)
        ? [...bookPhotos, ...bookPhotosFromStore, ...demoPhotos].slice(0, 4) 
        : demoPhotos;

    return html`
        <div class="h-full flex flex-col space-y-4 animate-fade-in bg-secondary pt-2">
            
            <!-- Hero Section -->
            <div class="bg-white p-6 rounded-[2rem] shadow-xl border border-accent text-center relative overflow-hidden group hover:border-primary transition-all duration-300 shrink-0">
                <!-- Decorative background elements -->
                <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary to-accent/20 rounded-bl-[100%] -z-10 transition-transform duration-500 group-hover:scale-110"></div>
                <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary to-accent/20 rounded-tr-[100%] -z-10 transition-transform duration-500 group-hover:scale-110"></div>
                
                <div class="w-16 h-16 bg-gradient-to-br from-neutral to-black rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-4 shadow-xl group-hover:rotate-6 group-hover:scale-105 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                
                <h2 class="text-2xl font-bold mb-2 text-neutral tracking-tight">Mettre à jour mon book</h2>
                <p class="text-neutral/60 text-sm mb-6 leading-relaxed px-4 font-medium">
                    Ajoutez vos derniers éditos, tests et parutions pour garder votre portfolio à jour.
                </p>
                
                <input 
                    type="file" 
                    ref=${fileInputRef} 
                    onChange=${handleFileSelect} 
                    accept="image/*" 
                    multiple
                    class="hidden" 
                />

                <div class="flex space-x-3">
                    <div class="relative flex-1 h-16">
                        <button 
                                onClick=${triggerFileInput}
                                class="absolute inset-0 bg-neutral text-white px-3 py-2 rounded-2xl font-bold text-xs hover:bg-primary transition transform active:scale-95 shadow-xl flex items-center justify-center space-x-2 group-hover:shadow-2xl ${notification ? 'opacity-0' : 'opacity-100'}"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Importer depuis la galerie</span>
                        </button>
                        ${notification && html`<${Notification} message=${notification.message} type=${notification.type} duration=${notification.duration} onClose=${() => {}} className="rounded-2xl" />`}
                    </div>
                </div>
            </div>

            <!-- Recent Additions Preview -->
            <div class="flex-1">
                <div class="flex justify-between items-end mb-4">
                    <h3 class="font-bold text-lg text-neutral">Derniers ajouts</h3>
                    <span onClick=${() => onNavigate('all-photos')} class="text-xs text-primary font-bold uppercase tracking-wider cursor-pointer hover:underline">Voir tout</span>
                </div>

                <div class="grid grid-cols-2 gap-4 pb-4">
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

export default BookPage;