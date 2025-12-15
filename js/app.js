import { h, render } from 'https://unpkg.com/preact@latest?module';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';
import { PhotoProvider } from './store/PhotoStore.js';
import { AuthProvider, useAuth } from './store/AuthStore.js';

console.log('App loaded v2');

const html = htm.bind(h);

import Navigation from './components/Navigation.js';
import HomePage from './pages/Home.js';
import PolasPage from './pages/Polas.js';
import BookPage from './pages/Book.js';
import CalendarPage from './pages/Calendar.js';
import CameraPage from './pages/Camera.js';
import ProfilePage from './pages/Profile.js';
import AllPhotosPage from './pages/AllPhotos.js';
import LoginPage from './pages/Login.js';
import FinancePage from './pages/Finance.js';
import ArchiveDetailsPage from './pages/ArchiveDetails.js';
import NotificationsDrawer from './components/NotificationsDrawer.js';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [previousPage, setPreviousPage] = useState('home');
    const [selectedArchiveDate, setSelectedArchiveDate] = useState(null);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const { user, loading } = useAuth();

    const navigateToProfile = () => {
        setPreviousPage(currentPage);
        if (user) {
            setCurrentPage('profile');
        } else {
            setCurrentPage('login');
        }
    };

    const handleNavigate = (page, data = null) => {
        if (page === 'archive-details' && data) {
            setSelectedArchiveDate(data);
        }
        setPreviousPage(currentPage);
        setCurrentPage(page);
    };

    const renderPage = () => {
        if (loading) return html`<div class="flex items-center justify-center h-full">Chargement...</div>`;

        const props = { 
            onNavigate: handleNavigate,
            onBack: () => setCurrentPage(previousPage)
        };
        switch(currentPage) {
            case 'home': return html`<${HomePage} ...${props} />`;
            case 'book': return html`<${BookPage} ...${props} />`;
            case 'polas': return html`<${PolasPage} ...${props} />`;
            case 'archive-details': return html`<${ArchiveDetailsPage} date=${selectedArchiveDate} onBack=${() => setCurrentPage('polas')} />`;
            case 'calendar': return html`<${CalendarPage} ...${props} />`;
            case 'finance': return html`<${FinancePage} ...${props} />`;
            case 'camera': return html`<${CameraPage} ...${props} />`;
            case 'profile': return user ? html`<${ProfilePage} ...${props} />` : html`<${LoginPage} ...${props} />`;
            case 'login': return html`<${LoginPage} ...${props} />`;
            case 'all-photos': return html`<${AllPhotosPage} ...${props} />`;
            default: return html`<${HomePage} ...${props} />`;
        }
    };

    return html`
        <div class="flex flex-col h-full bg-secondary dark:bg-secondary-dark font-sans text-neutral dark:text-neutral-light transition-colors duration-300">
            <!-- Header -->
            ${(currentPage === 'camera' || currentPage === 'profile' || currentPage === 'login' || currentPage === 'all-photos' || currentPage === 'archive-details') ? null : html`
                <header class="h-16 border-b-0 flex justify-between items-center px-6 bg-secondary dark:bg-secondary-dark z-20 shrink-0 pt-4 transition-colors duration-300">
                    <button 
                        onClick=${navigateToProfile}
                        class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md hover:scale-105 transition-transform overflow-hidden"
                    >
                        ${user ? (user.email[0].toUpperCase()) : 'MJ'}
                    </button>
                    <button 
                        onClick=${() => setIsNotificationsOpen(true)}
                        class="relative p-2 text-neutral/40 dark:text-neutral-light/40 hover:text-primary transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-secondary dark:border-secondary-dark animate-pulse"></span>
                    </button>
                </header>
            `}
            
            <!-- Main Content -->
            <main class="flex-1 overflow-y-auto ${(currentPage === 'camera' || currentPage === 'profile' || currentPage === 'all-photos' || currentPage === 'archive-details') ? 'bg-black p-0' : 'bg-secondary dark:bg-secondary-dark px-6 pt-4 pb-24 transition-colors duration-300'}">
                ${renderPage()}
            </main>

            <!-- Navigation -->
            ${currentPage !== 'camera' && currentPage !== 'profile' && currentPage !== 'all-photos' && currentPage !== 'archive-details' && currentPage !== 'login' && html`<${Navigation} active=${currentPage} onChange=${setCurrentPage} />`}
            
            <${NotificationsDrawer} isOpen=${isNotificationsOpen} onClose=${() => setIsNotificationsOpen(false)} />
        </div>
    `;
}

render(html`<${AuthProvider}><${PhotoProvider}><${App} /><//><//>`, document.getElementById('app'));