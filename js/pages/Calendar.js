import { h } from 'https://unpkg.com/preact@latest?module';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';
const html = htm.bind(h);

const CalendarPage = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    // Generate calendar days for December 2024 (example)
    const daysInMonth = 31;
    const startDay = 5; // Friday (0=Sun, 1=Mon, ..., 5=Fri)
    
    const days = [];
    // Empty cells for previous month
    for (let i = 0; i < startDay; i++) {
        days.push(null);
    }
    // Days of current month
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    const events = [
        { day: 14, type: 'casting' },
        { day: 16, type: 'job' },
        { day: 20, type: 'option' },
    ];

    const getEventColor = (type) => {
        if (!type) return '';
        switch(type) {
            case 'casting': return 'bg-primary';
            case 'job': return 'bg-green-500';
            case 'option': return 'bg-orange-500';
            default: return 'bg-accent';
        }
    };

    const getEventForDay = (day) => events.find(e => e.day === day);

    const detailedEvents = [
        { day: '14', month: 'DEC', title: 'Casting Vogue', time: '14:00', location: 'Paris 8ème', type: 'casting' },
        { day: '16', month: 'DEC', title: 'Fitting Zara', time: '10:00', location: 'Studio A', type: 'job' },
        { day: '20', month: 'DEC', title: 'Option Pub TV', time: 'TBD', location: 'TBD', type: 'option' },
    ];

    const filteredEvents = selectedDay
        ? detailedEvents.filter(event => parseInt(event.day) === selectedDay)
        : detailedEvents;

    const getTypeLabelColor = (type) => {
        switch(type) {
            case 'casting': return 'bg-primary/10 text-primary';
            case 'job': return 'bg-green-100 text-green-600';
            case 'option': return 'bg-orange-100 text-orange-600';
            default: return 'bg-accent text-neutral';
        }
    };

    return html`
        <div class="space-y-8 animate-fade-in bg-secondary">
            <!-- Calendar Grid -->
            <div class="bg-white p-6 rounded-3xl shadow-lg border border-accent">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-bold text-neutral">Décembre 2024</h2>
                    <div class="flex space-x-2">
                        <button class="p-2 rounded-full hover:bg-secondary transition text-neutral/60 hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button class="p-2 rounded-full hover:bg-secondary transition text-neutral/60 hover:text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-7 gap-y-4 text-center mb-2">
                    ${['D', 'L', 'M', 'M', 'J', 'V', 'S'].map(d => html`
                        <div class="text-xs font-bold text-neutral/40">${d}</div>
                    `)}
                </div>

                <div class="grid grid-cols-7 gap-y-4 gap-x-1 text-center">
                    ${days.map((day, i) => {
                        if (!day) return html`<div></div>`;
                        const event = getEventForDay(day);
                        const isToday = day === 14; // Mock today
                        return html`
                            <div 
                                class="flex flex-col items-center justify-center h-8 relative cursor-pointer group hover:scale-110 transition-transform"
                                onClick=${() => setSelectedDay(day)}
                            >
                                <span class="text-sm font-medium ${isToday ? 'text-lg font-extrabold text-neutral w-8 h-8 flex items-center justify-center rounded-full' : selectedDay === day ? 'bg-primary text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md' : 'text-neutral'}"
                                      style="">
                                    ${day}
                                </span>
                                ${event && html`
                                    <div class="absolute -bottom-1 w-1.5 h-1.5 rounded-full ${getEventColor(event.type)}"></div>
                                `}
                            </div>
                        `;
                    })}
                </div>
            </div>

            <!-- Events List -->
            <div>
                <h3 class="font-bold text-lg mb-4 text-neutral">À venir</h3>
                <div class="space-y-4">
                    ${filteredEvents.map(event => html`
                        <div class="bg-white p-4 rounded-2xl shadow-sm border border-accent flex items-center hover:shadow-md transition hover:border-primary/30 group">
                            <div class="flex-shrink-0 w-14 text-center mr-4">
                                <div class="text-xs text-neutral/40 font-bold uppercase group-hover:text-primary transition-colors">${event.month}</div>
                                <div class="text-xl font-bold text-neutral">${event.day}</div>
                            </div>
                            <div class="flex-1 border-l pl-4 border-secondary">
                                <div class="flex justify-between items-start mb-1">
                                    <h4 class="font-bold text-neutral">${event.title}</h4>
                                    <span class="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide ${getTypeLabelColor(event.type)}">${event.type}</span>
                                </div>
                                <div class="flex items-center text-neutral/60 text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span class="mr-3">${event.time}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>${event.location}</span>
                                </div>
                            </div>
                        </div>
                    `)}
                </div>
            </div>
        </div>
    `;
};

export default CalendarPage;