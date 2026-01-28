'use client';

import React from 'react';

const NewsCarousel = () => {
    const news = [
        {
            id: 1,
            date: 'MARS 2024',
            title: 'Ouverture du nouveau centre Marrakech',
            description: 'Inauguration de notre plus grand centre technique au sud pour mieux vous servir.',
            image: 'https://images.unsplash.com/photo-1517486430290-3563494d2bb7?q=80&w=260&auto=format&fit=crop'
        },
        {
            id: 2,
            date: 'JAN 2024',
            title: 'Renouvellement Certification ISO 9001',
            description: 'Confirmation de notre engagement pour la sécurité et la qualité de service.',
            image: 'https://images.unsplash.com/photo-1504151932400-72d4384f04b3?q=80&w=260&auto=format&fit=crop'
        },
        {
            id: 3,
            date: 'DEC 2023',
            title: 'Nouveau service Mobile à Tanger',
            description: 'Extension de notre couverture mobile pour les interventions à domicile.',
            image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=260&auto=format&fit=crop'
        }
    ];

    return (
        <section className="py-12 bg-white overflow-hidden">
            <div className="px-5 mb-8 flex items-center justify-between">
                <div>
                    <div className="w-1.5 h-6 bg-[#FFD200] rounded-full inline-block mr-3 align-middle" />
                    <h2 className="text-[22px] font-extrabold text-[#111827] inline-block align-middle">Activité 2024</h2>
                </div>
                <button className="text-gray-400 text-xs font-black uppercase tracking-[0.15em] hover:text-black transition-colors">
                    VOIR TOUT
                </button>
            </div>

            <div className="flex gap-6 overflow-x-auto px-5 pb-10 no-scrollbar touch-pan-x snap-x snap-mandatory">
                {news.map((item) => (
                    <div
                        key={item.id}
                        className="shrink-0 w-[300px] bg-white rounded-[26px] overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.07)] border border-gray-50 flex flex-col group cursor-pointer snap-start"
                    >
                        {/* Image Container */}
                        <div className="relative h-[190px] overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Wet glass / Texture overlay */}
                            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />

                            {/* Date Badge */}
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-full text-[10px] font-black tracking-widest text-[#111827] shadow-lg">
                                    {item.date}
                                </span>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-[18px] font-extrabold text-[#111827] leading-[1.3] mb-2 group-hover:text-[#FFD200] transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-[14px] leading-relaxed line-clamp-3">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
                {/* Visual padding */}
                <div className="shrink-0 w-4" />
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default NewsCarousel;
