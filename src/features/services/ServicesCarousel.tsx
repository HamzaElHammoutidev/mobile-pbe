'use client';

import Link from 'next/link';
import { ArrowRight, Wrench, Hammer, Eye } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import type { ServicesPageContent } from '@/lib/api/services';

interface ServicesCarouselProps {
    content: ServicesPageContent['services'];
}

const DEFAULT_SERVICES = [
    {
        id: 1,
        title: 'REMPLACEMENT',
        description: 'Pare-brise, lunette arrière, glaces latérales. Installation rapide et garantie.',
        iconUrl: null,
        href: '/services/remplacement',
    },
    {
        id: 2,
        title: 'RÉPARATION',
        description: 'Impacts plus petits qu\'une pièce de 2€. Intervention en 30 minutes sans RDV.',
        iconUrl: null,
        href: '/services/reparation',
    },
    {
        id: 3,
        title: 'CALIBRAGE ADAS',
        description: 'Recalibrage des caméras d\'aide à la conduite après remplacement.',
        iconUrl: null,
        href: '/services/calibrage',
    },
];

const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1625047509168-a7026f36de04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
];

const ICONS = [
    <Wrench key="wrench" size={24} className="text-black" strokeWidth={2.5} />,
    <Hammer key="hammer" size={24} className="text-black" strokeWidth={2.5} />,
    <Eye key="eye" size={24} className="text-black" strokeWidth={2.5} />,
];

export default function ServicesCarousel({ content }: ServicesCarouselProps) {
    const services = content.length > 0 ? content : DEFAULT_SERVICES;
    return (
        <section className="bg-[#F9FAFB] pt-2 pb-12 overflow-hidden flex flex-col">
            <div className="w-full max-w-7xl mx-auto">
                {/* 1. Section Header */}
                <div className="flex justify-between items-center px-6 mb-6">
                    <div className="flex items-center gap-3">
                        {/* Vertical Yellow Bar */}
                        <div className="w-1 h-6 bg-[#FFD200] rounded-full" />
                        <h2 className="text-[20px] font-extrabold text-[#111827] uppercase tracking-wide">
                            NOS SERVICES
                        </h2>
                    </div>

                    {/* View All Link */}
                    <Link
                        href={ROUTES.SERVICES}
                        className="text-[14px] font-bold text-[#111827] border-b-2 border-[#FFD200] pb-0.5 hover:opacity-80 transition-opacity"
                    >
                        Voir tout
                    </Link>
                </div>

                {/* 2. Horizontal Scroll Carousel */}
                <div
                    className="flex gap-4 overflow-x-auto pb-8 px-6 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollPaddingLeft: '24px' }}
                >
                    {services.map((service, idx) => (
                        <div
                            key={service.id}
                            className="relative flex-shrink-0 w-[280px] h-[350px] rounded-[24px] overflow-hidden snap-center group bg-[#111827]"
                            style={{
                                boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
                            }}
                        >
                            {/* Background Image */}
                            <img
                                src={DEFAULT_IMAGES[idx % DEFAULT_IMAGES.length]}
                                alt={service.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />

                            {/* Gradient Overlay */}
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
                            />

                            {/* Icon Badge (Top Right) */}
                            <div
                                className="absolute top-5 right-5 w-12 h-12 bg-[#FFD200] rounded-full flex items-center justify-center shadow-lg"
                            >
                                {ICONS[idx % ICONS.length]}
                            </div>

                            {/* Card Content (Bottom Aligned) */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start translate-y-0 transition-transform duration-300">

                                {/* Title */}
                                <h3
                                    className="text-[22px] font-extrabold text-[#FFD200] uppercase leading-none drop-shadow-md mb-2"
                                >
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="text-[14px] font-normal text-white leading-[1.4] mb-6 line-clamp-3"
                                >
                                    {service.description}
                                </p>

                                {/* Action Link */}
                                <Link
                                    href={service.href || ROUTES.SERVICES}
                                    className="flex items-center gap-2 group/btn"
                                >
                                    <span className="text-[12px] font-bold text-white uppercase tracking-widest">
                                        EN SAVOIR PLUS
                                    </span>
                                    <ArrowRight
                                        size={16}
                                        className="text-white transform group-hover/btn:translate-x-1 transition-transform"
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}

                    {/* Spacer for right padding in scrolling container */}
                    <div className="w-1 flex-shrink-0" aria-hidden="true" />
                </div>
            </div>
        </section>
    );
}
