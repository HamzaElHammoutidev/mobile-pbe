'use client';

import Link from 'next/link';
import type { AboutPageContent } from '@/lib/api/about';
import { ROUTES } from '@/config/routes';

interface AboutHeroSectionProps {
    content: AboutPageContent['hero'];
}

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80';

export default function AboutHeroSection({ content }: AboutHeroSectionProps) {
    return (
        <section className="bg-white py-8 px-4">
            <div className="max-w-[380px] mx-auto">

                {/* Header Group */}
                <div className="flex flex-col gap-3 mb-6">
                    {/* Top Label */}
                    <div className="flex items-center gap-2">
                        <div
                            style={{
                                width: '4px',
                                height: '14px',
                                backgroundColor: '#FFD200',
                                borderRadius: '2px'
                            }}
                        />
                        <span
                            className="uppercase"
                            style={{
                                fontWeight: 700,
                                fontSize: '12px',
                                letterSpacing: '1px',
                                color: '#4B5563'
                            }}
                        >
                            {content.sinceYear}
                        </span>
                    </div>

                    {/* Main Title */}
                    <h1
                        style={{
                            fontWeight: 800,
                            fontSize: '32px',
                            lineHeight: 1.1,
                            color: '#0F172A'
                        }}
                    >
                        {content.title}
                    </h1>
                    <Link
                        href={ROUTES.NETWORK}
                        className="w-fit text-sm font-semibold text-[#111827] underline decoration-[#FFD200] decoration-2 underline-offset-4"
                    >
                        Découvrir notre réseau
                    </Link>
                </div>

                {/* Hero Visual */}
                <div
                    className="relative rounded-[24px] overflow-hidden mb-6"
                    style={{ aspectRatio: '3/2' }}
                >
                    {/* Image */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${content.imageUrl || DEFAULT_IMAGE})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    {/* Floating Badge */}
                    <div
                        className="absolute bottom-4 left-4 flex items-center gap-2 bg-white px-4 py-2"
                        style={{
                            borderRadius: '999px',
                            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                backgroundColor: '#22C55E'
                            }}
                        />
                        <span style={{ fontWeight: 600, fontSize: '13px', color: '#111827' }}>
                            {content.serviceAvailability}
                        </span>
                    </div>
                </div>

                {/* Key Statistics Row */}
                <div className="grid grid-cols-3" style={{ gap: '12px' }}>
                    {content.stats.map((stat, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center py-5"
                            style={{
                                backgroundColor: '#F9FAFB',
                                borderRadius: '16px',
                                border: '1px solid #F3F4F6'
                            }}
                        >
                            {/* Number */}
                            <div className="flex items-start">
                                <span style={{ fontWeight: 800, fontSize: '32px', color: '#111827' }}>
                                    {stat.value}
                                </span>
                                <span
                                    style={{
                                        fontWeight: 800,
                                        fontSize: '20px',
                                        color: '#FFD200',
                                        marginLeft: '2px',
                                        marginTop: '4px'
                                    }}
                                >
                                    +
                                </span>
                            </div>

                            {/* Label */}
                            <span
                                className="uppercase"
                                style={{
                                    fontWeight: 600,
                                    fontSize: '11px',
                                    letterSpacing: '0.5px',
                                    color: '#6B7280',
                                    marginTop: '4px'
                                }}
                            >
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
