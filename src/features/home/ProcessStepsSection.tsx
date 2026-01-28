'use client';

import { FilePen, Car } from 'lucide-react';
import Image from 'next/image';

const steps = [
    {
        title: "Déclarez votre sinistre",
        description: "Fissure, bris de glace, nous vous aidons à remplir votre déclaration pour la soumettre à votre assureur.",
        iconUrl: "https://parebriseexpress.ma/images/shape/comp.svg",
        fallbackIcon: null
    },
    {
        title: "Prenez rendez-vous",
        description: "Choisissez le centre technique et le créneau qui vous convient le mieux.",
        iconUrl: "https://parebriseexpress.ma/images/shape/check.svg",
        fallbackIcon: null
    },
    {
        title: "Confiez-nous votre voiture",
        description: "Nos experts confirmés prendront grand soin de votre véhicule.",
        iconUrl: null,
        fallbackIcon: <Car size={48} color="black" strokeWidth={1} />
    }
];

export default function ProcessStepsSection() {
    return (
        <section className="py-4 px-4" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="flex flex-col items-center w-full">
                {/* Section Header */}
                <div className="text-center mb-4 pt-4 pb-4 px-4">
                    <h2 className="mb-1" style={{ fontSize: '22px', fontWeight: 800, color: '#111827' }}>
                        Comment ça marche ?
                    </h2>
                    <p style={{ fontSize: '14px', fontWeight: 400, color: '#6B7280' }}>
                        Simple, rapide et efficace
                    </p>
                </div>

                {/* Horizontal Card Carousel */}
                <div
                    className="w-full overflow-x-auto flex gap-4 px-4 pb-6 no-scrollbar snap-x snap-mandatory"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        // Use CSS padding for the scroll container to center the first item if needed,
                        // but simple padding-inline is often enough for simple carousels.
                        // We'll keep the visual alignment logic simple for now: start aligned with padding.
                    }}
                >
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 snap-center relative flex flex-col items-center text-center bg-white w-[75vw] sm:w-[300px] aspect-[4/5] p-5 sm:p-6"
                            style={{
                                borderRadius: '24px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            }}
                        >
                            {/* Decorative Circle */}
                            <div
                                className="absolute top-0 right-0"
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: '#FEF9C3',
                                    borderTopRightRadius: '24px',
                                    borderBottomLeftRadius: '100px',
                                    opacity: 0.5
                                }}
                            />

                            {/* Icon Group */}
                            <div className="relative mb-4 mt-auto">
                                <div
                                    className="flex items-center justify-center rounded-full"
                                    style={{
                                        width: '90px',
                                        height: '90px',
                                        backgroundColor: '#FFFFFF', // Transparent or white
                                        zIndex: 10,
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {step.iconUrl ? (
                                        <Image
                                            src={step.iconUrl}
                                            alt={step.title}
                                            width={50}
                                            height={50}
                                            className="object-contain" // SVGs might need this
                                        />
                                    ) : (
                                        step.fallbackIcon || <div style={{ width: '100%', height: '100%', background: '#f3f4f6' }}></div>
                                    )}
                                </div>
                                <div
                                    className="absolute bottom-0 left-1/2 flex items-center justify-center rounded-full bg-black text-white"
                                    style={{
                                        width: '24px',
                                        height: '24px',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        zIndex: 20,
                                        transform: 'translate(-50%, 50%)'
                                    }}
                                >
                                    {index + 1}
                                </div>
                            </div>

                            {/* Typography */}
                            <div className="mb-auto">
                                <h3 className="mb-2" style={{ fontSize: '18px', fontWeight: 700, color: '#000000', marginTop: '12px' }}>
                                    {step.title}
                                </h3>
                                <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="w-full px-4 mt-0 mb-8 max-w-[380px]">
                    <button
                        className="w-full flex items-center justify-center hover:opacity-90 transition-opacity"
                        style={{
                            backgroundColor: '#FFD200',
                            color: '#000000',
                            height: '56px',
                            borderRadius: '16px',
                            fontSize: '14px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            boxShadow: '0 4px 12px rgba(255, 210, 0, 0.3)'
                        }}
                    >
                        FAIRE UNE DÉCLARATION
                    </button>
                </div>
            </div>
        </section>
    );
}
