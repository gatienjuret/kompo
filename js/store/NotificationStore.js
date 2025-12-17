import { h, createContext } from 'https://unpkg.com/preact@latest?module';
import { useState, useContext, useRef } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

// Create Context
const NotificationContext = createContext({
    notification: null,
    showNotification: () => {},
    hideNotification: () => {},
    isNavbarHidden: false,
});

// Provider Component
export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null); // { message, type, duration }
    const [isNavbarHidden, setIsNavbarHidden] = useState(false);
    const notificationTimerRef = useRef(null);

    const showNotification = (message, type = 'success', duration = 5000) => { // Default to 5 seconds
        // Clear any existing timer
        if (notificationTimerRef.current) {
            clearTimeout(notificationTimerRef.current);
        }

        setIsNavbarHidden(true); // Hide navbar when notification shows
        setNotification({ message, type, duration });

        notificationTimerRef.current = setTimeout(() => {
            hideNotification();
        }, duration);
    };

    const hideNotification = () => {
        setNotification(null);
        setIsNavbarHidden(false); // Show navbar when notification hides
    };

    return h(NotificationContext.Provider, { value: { notification, showNotification, hideNotification, isNavbarHidden } }, children);
};

// Custom Hook
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
