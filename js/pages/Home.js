import { h } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';
import { usePhotos } from '../store/PhotoStore.js';
const html = htm.bind(h);

const HomePage = ({ onNavigate }) => {
    const { lastPhoto, lastPhotoDate } = usePhotos();
    const bgImage = lastPhoto ? `url('${lastPhoto}')` : "url('./assets/polas-mannequin-paris-3.webp')";
    
    const formattedDate = lastPhotoDate 
        ? new Date(lastPhotoDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
        : 'Aucune';

    return html`
        <div class="flex flex-col h-full px-0 space-y-8 animate-fade-in bg-secondary">
            
            <div class="mt-4 flex items-baseline space-x-2">
                <h1 class="text-3xl font-light text-neutral">Hello,</h1>
                <h2 class="text-3xl font-bold text-primary">Maverick</h2>
            </div>

            <div class="flex-1 flex flex-col space-y-4">
                <!-- Main Feature: Polas -->
                <button 
                    onClick=${() => onNavigate('polas')}
                    class="flex-1 bg-neutral rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl flex flex-col justify-end items-start text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(167,38,38,0.2)] active:scale-95 active:shadow-lg border-2 border-transparent hover:border-primary/50"
                >
                    <!-- Background Image with Overlay -->
                    <div class="absolute inset-0 opacity-60 bg-cover bg-center transition duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" style="background-image: ${bgImage}"></div>
                    <div class="absolute inset-0 bg-black/40"></div> <!-- Additional dark overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-neutral via-neutral/50 to-transparent opacity-90"></div>
                    
                    <div class="relative z-10 w-full flex justify-between items-end">
                        <div>
                            <h3 class="text-5xl font-bold mb-2 tracking-tight">Polas</h3>
                            <p class="text-accent text-base font-medium opacity-90">Gérez vos snaps & mises à jour</p>
                        </div>
                    </div>
                </button>

                <!-- Secondary Features -->
                <div class="grid grid-cols-2 gap-4">
                    <button 
                        onClick=${() => onNavigate('book')}
                        class="h-36 bg-white rounded-[2rem] p-5 shadow-xl border border-accent hover:border-primary transition-all duration-300 flex flex-col justify-between items-start text-left group hover:-translate-y-1 hover:shadow-2xl active:scale-95 active:shadow-md relative overflow-hidden"
                    >
                        
                        <div class="p-3 bg-secondary rounded-2xl shadow-inner group-hover:scale-110 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                            </svg>
                        </div>
                        <div>
                            <span class="font-bold text-xl text-neutral tracking-tight mt-2 group-hover:text-primary transition-colors block">Book</span>
                            <span class="text-xs text-gray-400 mt-1 block">Màj: ${formattedDate}</span>
                        </div>
                    </button>

                    <button 
                        onClick=${() => onNavigate('calendar')}
                        class="h-36 bg-white rounded-[2rem] p-5 shadow-xl border border-accent hover:border-primary transition-all duration-300 flex flex-col justify-between items-start text-left group hover:-translate-y-1 hover:shadow-2xl active:scale-95 active:shadow-md relative overflow-hidden"
                    >

                        <div class="p-3 bg-secondary rounded-2xl shadow-inner group-hover:scale-110 transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <span class="font-bold text-xl text-neutral tracking-tight mt-2 group-hover:text-primary transition-colors block">Agenda</span>
                            <span class="text-xs text-gray-400 mt-1 block">Prochain: Demain 14h</span>
                        </div>
                    </button>

                    <button 
                        onClick=${() => onNavigate('finance')}
                        class="col-span-2 h-32 bg-white rounded-[2rem] p-6 shadow-xl border border-accent hover:border-primary transition-all duration-300 flex items-center justify-between text-left group hover:-translate-y-1 hover:shadow-2xl active:scale-95 active:shadow-md relative overflow-hidden"
                    >
                        <div class="flex items-center gap-6">
                            <div class="p-3 bg-secondary rounded-2xl shadow-inner group-hover:scale-110 transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span class="font-bold text-2xl text-neutral tracking-tight group-hover:text-primary transition-colors">Mes Finances</span>
                        </div>
                        <div class="text-right">
                            <span class="text-sm text-gray-400 block">Net estimé</span>
                            <span class="text-xl font-bold text-primary block">3 570 €</span>
                            <span class="text-xs text-green-600 font-medium block mt-1">↗ +12% vs M-1</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    `;
};

export default HomePage;