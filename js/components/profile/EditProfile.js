import { h } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

const EditProfile = ({ onBack }) => {
    return html`
        <div class="animate-fade-in bg-secondary min-h-full pb-8">
            <!-- Header -->
            <div class="relative w-full p-6 flex items-center justify-center">
                <button onClick=${onBack} class="absolute left-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-neutral hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 class="text-xl font-bold text-neutral">Modifier le profil</h2>
            </div>

            <div class="px-6 space-y-6 mt-4">
                <!-- Avatar -->
                <div class="flex flex-col items-center mb-8">
                    <div class="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl border-4 border-white mb-4 relative">
                        MJ
                        <button class="absolute bottom-0 right-0 w-8 h-8 bg-neutral text-white rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Form -->
                <form class="space-y-4">
                    <div>
                        <label class="block text-sm font-bold text-neutral/60 mb-2">Prénom</label>
                        <input type="text" value="Marie" class="w-full px-4 py-3 rounded-xl border border-accent bg-white text-neutral focus:border-primary focus:ring-1 focus:ring-primary outline-none transition" />
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-neutral/60 mb-2">Nom</label>
                        <input type="text" value="Jeanne" class="w-full px-4 py-3 rounded-xl border border-accent bg-white text-neutral focus:border-primary focus:ring-1 focus:ring-primary outline-none transition" />
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-neutral/60 mb-2">Email</label>
                        <input type="email" value="marie.jeanne@model-agency.com" class="w-full px-4 py-3 rounded-xl border border-accent bg-white text-neutral focus:border-primary focus:ring-1 focus:ring-primary outline-none transition" />
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-neutral/60 mb-2">Téléphone</label>
                        <input type="tel" value="+33 6 12 34 56 78" class="w-full px-4 py-3 rounded-xl border border-accent bg-white text-neutral focus:border-primary focus:ring-1 focus:ring-primary outline-none transition" />
                    </div>
                    
                    <div class="pt-4">
                        <button type="button" class="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary/90 transition transform active:scale-95">
                            Enregistrer les modifications
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
};

export default EditProfile;
