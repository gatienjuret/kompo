import { h } from 'https://unpkg.com/preact@latest?module';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

const Finance = () => {
    // Données simulées pour l'exemple
    const [jobs] = useState([
        { id: 1, client: 'Vogue Paris', date: '2023-10-15', amount: 1500, status: 'payé', type: 'Shooting' },
        { id: 2, client: 'Zara Campaign', date: '2023-11-02', amount: 2800, status: 'en_cours', type: 'Campagne' },
        { id: 3, client: 'H&M E-com', date: '2023-11-10', amount: 800, status: 'en_cours', type: 'E-commerce' },
        { id: 4, client: 'Showroom Dior', date: '2023-11-20', amount: 1200, status: 'en_attente', type: 'Showroom' },
    ]);

    // Constantes de calcul
    const AGENCY_FEE_PERCENT = 20;
    const TAX_PERCENT = 15;

    // Calculs
    const pendingJobs = jobs.filter(j => j.status === 'en_cours' || j.status === 'en_attente');
    const grossTotal = pendingJobs.reduce((acc, job) => acc + job.amount, 0);
    const agencyFee = (grossTotal * AGENCY_FEE_PERCENT) / 100;
    const taxes = (grossTotal * TAX_PERCENT) / 100;
    const netTotal = grossTotal - agencyFee - taxes;

    const getStatusColor = (status) => {
        switch(status) {
            case 'payé': return 'bg-green-100 text-green-800';
            case 'en_cours': return 'bg-yellow-100 text-yellow-800';
            case 'en_attente': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status) => {
        switch(status) {
            case 'payé': return 'Payé';
            case 'en_cours': return 'Traitement';
            case 'en_attente': return 'En attente';
            default: return status;
        }
    };

    return html`
        <div class="min-h-screen bg-gray-50 pb-24">
            <!-- Header -->
            <div class="bg-white px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-sm mb-6">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Mes Finances</h1>
                        <p class="text-gray-500 text-sm">Estimation pour le mois prochain</p>
                    </div>
                    <div class="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>

                <!-- Main Card -->
                <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                    <div class="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full -ml-10 -mb-10 blur-xl"></div>
                    
                    <div class="relative z-10">
                        <p class="text-gray-400 text-sm mb-1">Net estimé à percevoir</p>
                        <h2 class="text-4xl font-bold mb-6">${netTotal.toLocaleString('fr-FR')} €</h2>
                        
                        <div class="space-y-3">
                            <div class="flex justify-between text-sm text-gray-400">
                                <span>Brut total</span>
                                <span>${grossTotal.toLocaleString('fr-FR')} €</span>
                            </div>
                            <div class="flex justify-between text-sm text-gray-400">
                                <span>Commission agence (${AGENCY_FEE_PERCENT}%)</span>
                                <span class="text-red-300">-${agencyFee.toLocaleString('fr-FR')} €</span>
                            </div>
                            <div class="flex justify-between text-sm text-gray-400">
                                <span>Charges & Taxes (~${TAX_PERCENT}%)</span>
                                <span class="text-red-300">-${taxes.toLocaleString('fr-FR')} €</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Jobs List -->
            <div class="px-6">
                <h3 class="text-lg font-bold text-gray-900 mb-4">Historique des jobs</h3>
                <div class="space-y-4">
                    ${jobs.map(job => html`
                        <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                            <div class="flex items-center gap-4">
                                <div class="h-10 w-10 rounded-full bg-gray-50 flex items-center justify-center text-xl">
                                    ${job.type === 'Shooting' ? '📸' : job.type === 'Campagne' ? '✨' : job.type === 'Showroom' ? '👗' : '💻'}
                                </div>
                                <div>
                                    <h4 class="font-bold text-gray-900">${job.client}</h4>
                                    <p class="text-xs text-gray-500">${job.type} • ${new Date(job.date).toLocaleDateString('fr-FR')}</p>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-gray-900">${job.amount} €</p>
                                <span class="inline-block px-2 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide ${getStatusColor(job.status)}">
                                    ${getStatusLabel(job.status)}
                                </span>
                            </div>
                        </div>
                    `)}
                </div>
            </div>
        </div>
    `;
};

export default Finance;
