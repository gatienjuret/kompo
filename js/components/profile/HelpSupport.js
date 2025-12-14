import { h } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

const HelpSupport = ({ onBack }) => {
    return html`
        <div class="animate-fade-in bg-secondary min-h-full pb-8">
            <!-- Header -->
            <div class="relative w-full p-6 flex items-center justify-center">
                <button onClick=${onBack} class="absolute left-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-neutral hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 class="text-xl font-bold text-neutral">Aide & Support</h2>
            </div>

            <div class="px-6 space-y-6 mt-4">
                <div class="bg-white rounded-2xl shadow-sm border border-accent overflow-hidden">
                    <div class="p-6 border-b border-secondary">
                        <h3 class="font-bold text-neutral mb-2">FAQ</h3>
                        <div class="space-y-4">
                            <details class="group">
                                <summary class="flex justify-between items-center font-medium cursor-pointer list-none text-sm">
                                    <span>Comment mettre à jour mon book ?</span>
                                    <span class="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <p class="text-neutral/60 text-sm mt-3 group-open:animate-fadeIn">
                                    Allez dans la section "Mon Book" et cliquez sur le bouton "+" pour ajouter de nouvelles photos.
                                </p>
                            </details>
                            <details class="group">
                                <summary class="flex justify-between items-center font-medium cursor-pointer list-none text-sm">
                                    <span>Comment contacter mon agent ?</span>
                                    <span class="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <p class="text-neutral/60 text-sm mt-3 group-open:animate-fadeIn">
                                    Vous pouvez utiliser le chat intégré ou appeler directement l'agence au numéro indiqué ci-dessous.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>

                <div class="bg-primary/5 rounded-2xl p-6 text-center border border-primary/10">
                    <h3 class="font-bold text-primary mb-2">Besoin d'aide ?</h3>
                    <p class="text-neutral/60 text-sm mb-4">Notre équipe est disponible du lundi au vendredi de 9h à 18h.</p>
                    <button class="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-primary/90 transition transform active:scale-95 w-full">
                        Contacter le support
                    </button>
                </div>
            </div>
        </div>
    `;
};

export default HelpSupport;
