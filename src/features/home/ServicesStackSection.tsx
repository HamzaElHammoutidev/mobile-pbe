'use client';

import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Service {
    title: string;
    description: string;
    imageUrl: string;
}

function ServiceCard({ service }: { service: Service }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className="w-full flex flex-col items-center text-center p-6 relative overflow-hidden transition-all duration-300 ease-in-out"
            style={{
                borderRadius: '20px',
                minHeight: isExpanded ? '240px' : '180px',
                justifyContent: 'center' // Center content vertically
            }}
        >
            {/* Background Image */}
            <Image
                src={service.imageUrl}
                alt={service.title}
                fill
                className="object-cover"
                style={{ zIndex: 0 }}
                sizes="(max-width: 768px) 100vw, 33vw"
            />

            {/* Gradient Overlay */}
            <div
                className="absolute inset-0"
                style={{
                    // Updated gradient as requested
                    background: 'linear-gradient(180deg, rgb(29 27 27 / 13%) 0%, rgba(62, 37, 30, 0.95) 100%)',
                    zIndex: 1
                }}
            />

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center w-full">
                {/* Text Content */}
                <h3 className="mb-2" style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', marginTop: '4px' }}>
                    {service.title}
                </h3>

                {isExpanded && (
                    <p
                        className="max-w-[280px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300"
                        style={{
                            fontSize: '13px',
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: 1.5
                        }}
                    >
                        {service.description}
                    </p>
                )}

                {/* Action Indicator */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                    style={{
                        width: '32px',
                        height: '32px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: 'rgba(255, 255, 255, 0.6)'
                    }}
                >
                    {isExpanded ? <Minus size={16} strokeWidth={2} /> : <Plus size={16} strokeWidth={2} />}
                </button>
            </div>
        </div>
    );
}

export default function ServicesStackSection() {
    const services = [
        {
            title: "Réparation d'impact",
            description: "Intervention rapide et durable pour ne pas compromettre votre sécurité.",
            imageUrl: "https://parebriseexpress.ma/images/tech_serv.jpg",
        },
        {
            title: "Remplacement",
            description: "Service complet incluant le recalibrage de votre caméra ADAS.",
            imageUrl: "https://parebriseexpress.ma/images/jouj_serv.jpg",
        },
        {
            title: "Atelier Mobile",
            description: "Chez vous ou au bureau, sans frais supplémentaires.",
            imageUrl: "https://parebriseexpress.ma/images/van_serv.jpg",
        }
    ];

    return (
        <section className="py-8 bg-white" style={{ paddingTop: '32px', paddingBottom: '16px' }}>
            <div className="w-full px-6">
                {/* Section Header */}
                <div className="text-left mb-6">
                    <h2 className="mb-1" style={{ fontSize: '22px', fontWeight: 800, color: '#111827' }}>
                        Nos Services
                    </h2>
                    <p style={{ fontSize: '13px', fontWeight: 400, color: '#6B7280', lineHeight: 1.4 }}>
                        Découvrez nos services de réparation et de remplacement.
                    </p>
                </div>

                {/* Vertical Stack */}
                <div className="flex flex-col gap-4">
                    {services.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
