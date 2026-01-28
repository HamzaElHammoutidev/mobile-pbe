'use client';

import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import type { ServicesPageContent } from '@/lib/api/services';

interface EventsSectionProps {
    content: ServicesPageContent['events'];
}

const DEFAULT_EVENTS = [
    {
        id: 1,
        title: 'Team Building Annuel',
        date: '2023-07-15',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 2,
        title: "Salon de l'Auto",
        date: '2023-05-10',
        imageUrl: 'https://images.unsplash.com/photo-1561488111-5d800fd56b32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
    {
        id: 3,
        title: 'Nouveau Partenariat',
        date: '2023-04-20',
        imageUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    },
];

function formatEventDate(dateString: string): string {
    const date = new Date(dateString);
    const month = date.toLocaleDateString('fr-FR', { month: 'long' }).toUpperCase();
    const year = date.getFullYear();
    return `${month} ${year}`;
}

export default function EventsSection({ content }: EventsSectionProps) {
    const events = content.length > 0 ? content : DEFAULT_EVENTS;
    return (
        <section className="bg-[#F9FAFB] pt-2 pb-16 overflow-hidden">
            <div className="w-full max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center px-6 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-[#FFD200] rounded-full" />
                        <h2 className="text-[20px] font-extrabold text-[#111827] uppercase tracking-wide">
                            NOS ÉVÈNEMENTS
                        </h2>
                    </div>

                    <Link
                        href={ROUTES.ABOUT}
                        className="text-[14px] font-bold text-[#FFD200] hover:text-[#e5bd00] transition-colors"
                    >
                        Voir tout
                    </Link>
                </div>

                {/* Carousel */}
                <div
                    className="flex gap-4 overflow-x-auto pb-8 px-6 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollPaddingLeft: '24px' }}
                >
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="flex-shrink-0 w-[280px] bg-white rounded-[20px] overflow-hidden shadow-sm snap-center group cursor-pointer hover:shadow-md transition-all duration-300"
                            style={{
                                boxShadow: '0 4px 20px -5px rgba(0,0,0,0.05)'
                            }}
                        >
                            {/* Image Container */}
                            <div className="h-[200px] overflow-hidden relative">
                                <img
                                    src={event.imageUrl || DEFAULT_EVENTS[0].imageUrl}
                                    alt={event.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <p className="text-[12px] font-extrabold text-[#FFD200] uppercase tracking-wider mb-2">
                                    {formatEventDate(event.date)}
                                </p>
                                <h3 className="text-[18px] font-bold text-[#111827] leading-tight group-hover:text-gray-700 transition-colors">
                                    {event.title}
                                </h3>
                            </div>
                        </div>
                    ))}

                    {/* Spacer */}
                    <div className="w-2 flex-shrink-0" />
                </div>
            </div>
        </section>
    );
}
