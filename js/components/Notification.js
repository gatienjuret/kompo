import { h } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';
import { useState, useEffect } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';

const html = htm.bind(h);

const Notification = ({ message, type = 'success', duration = 3000, onClose, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onClose) onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    const glowClass = type === 'success' 
        ? 'shadow-[0_0_20px_rgba(34,197,94,0.5)]' // Green glow
        : type === 'error' 
            ? 'shadow-[0_0_20px_rgba(239,68,68,0.5)]' // Red glow
            : 'shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]'; // Default shadow

    return html`
        <div class="absolute inset-0 px-4 z-[9999] transition-all duration-300 ease-in-out flex items-center justify-center text-center bg-gradient-to-br from-white/40 to-white/10 dark:from-black/40 dark:to-black/10 backdrop-blur-xl border border-white/30 dark:border-white/10 ring-1 ring-white/40 dark:ring-white/10 ${glowClass} ${className}"
             style="opacity: ${isVisible ? 1 : 0};">
            <span class="text-neutral text-sm font-medium transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}">${message}</span>
        </div>
    `;
};

export default Notification;
