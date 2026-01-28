'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Crosshair, Zap, ArrowRight, Loader2 } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { ROUTES } from '@/config/routes';
import type { HomepageContent } from '@/lib/api/homepage';

interface HeroSectionProps {
    content: HomepageContent['hero'];
}

export default function HeroSection({ content }: HeroSectionProps) {
    const router = useRouter();
    const [selectedProblem, setSelectedProblem] = useState<string>(content.problemTypes[0]?.id || 'impact');
    const [city, setCity] = useState('');
    const { loading: geoLoading, requestLocation } = useGeolocation();

    const handleGeolocation = async () => {
        const coords = await requestLocation();
        if (coords) {
            setCity('Position détectée');
        }
    };

    const handleViewAvailability = () => {
        const params = new URLSearchParams();
        if (city) params.set('city', city);
        params.set('problem', selectedProblem);

        const queryString = params.toString();
        router.push(`${ROUTES.BOOKING}${queryString ? `?${queryString}` : ''}`);
    };

    // Parse title into parts for styling
    const titleParts = content.title.split(/\s+/);
    const firstPart = titleParts.slice(0, -1).join(' ');
    const lastPart = titleParts[titleParts.length - 1];

    const problemIcons: Record<string, React.ReactNode> = {
        impact: (
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="2.5" />
                <circle cx="5" cy="5" r="2" />
                <circle cx="19" cy="5" r="2" />
                <circle cx="5" cy="19" r="2" />
                <circle cx="19" cy="19" r="2" />
            </svg>
        ),
        fissure: (
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 20L12 4L20 20" />
                <path d="M8 13h8" />
            </svg>
        ),
        casse: (
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="8" height="8" rx="1" />
                <rect x="14" y="2" width="8" height="8" rx="1" />
                <rect x="2" y="14" width="8" height="8" rx="1" />
                <rect x="14" y="14" width="8" height="8" rx="1" />
            </svg>
        ),
    };

    const defaultVideoUrl = 'https://parebriseexpress.ma//storage/theme-videos/March2025/Y8X7He7aKX51lU78FPHq.mp4';

    return (
        <section className="flex justify-center px-4 pt-4">
            {/* Main Card - 380px width, 24px radius */}
            <div
                className="relative w-full max-w-[380px] rounded-[24px] overflow-hidden flex flex-col"
                style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    backgroundColor: '#0F1115'
                }}
            >
                {/* Cinematic Video Header - natural 4:1 aspect ratio */}
                <div className="relative w-full" style={{ aspectRatio: '4/2' }}>
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source
                            src={content.videoUrl || defaultVideoUrl}
                            type="video/mp4"
                        />
                    </video>
                    {/* Softer gradient for smooth transition */}
                    <div
                        className="absolute inset-x-0 bottom-0 h-16"
                        style={{ background: 'linear-gradient(to top, #0F1115 0%, rgba(15,17,21,0.5) 50%, transparent 100%)' }}
                    />
                </div>

                {/* Content - dark background */}
                <div className="p-[24px] flex flex-col gap-[20px]">

                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-1.5 w-fit px-2 py-1 rounded-[4px]"
                        style={{ backgroundColor: '#FFD200' }}
                    >
                        <Zap size={12} fill="#111827" stroke="#111827" />
                        <span
                            className="uppercase tracking-wide"
                            style={{ fontSize: '10px', fontWeight: 700, color: '#111827' }}
                        >
                            {content.title}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 style={{ lineHeight: 1.1 }}>
                        <span style={{ fontSize: '28px', fontWeight: 700, color: '#FFFFFF', display: 'block' }}>
                            {firstPart || 'Réparation en'}
                        </span>
                        <span style={{ fontSize: '28px', fontWeight: 700, color: '#FFD200', display: 'block' }}>
                            {content.subtitle || '30 Minutes'}
                        </span>
                    </h1>

                    {/* Location Input - Pill shape */}
                    <div
                        className="flex items-center justify-between w-full"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '999px',
                            padding: '8px 8px 8px 16px'
                        }}
                    >
                        <div className="flex items-center flex-1 gap-2">
                            <MapPin size={20} style={{ color: '#FFD200' }} fill="#FFD200" stroke="#FFD200" />
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder={content.cityPlaceholder}
                                className="flex-1 bg-transparent outline-none"
                                style={{ color: '#111827', fontSize: '14px' }}
                            />
                        </div>
                        <button
                            onClick={handleGeolocation}
                            disabled={geoLoading}
                            className="flex items-center justify-center transition-colors hover:bg-gray-200 disabled:opacity-50"
                            style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                backgroundColor: '#F3F4F6'
                            }}
                            aria-label="Utiliser ma position"
                        >
                            {geoLoading ? (
                                <Loader2 size={18} className="animate-spin" style={{ color: '#111827' }} />
                            ) : (
                                <Crosshair size={18} style={{ color: '#111827' }} />
                            )}
                        </button>
                    </div>

                    {/* Problem Selection Grid */}
                    <div>
                        <p style={{ color: '#FFFFFF', fontSize: '14px', marginBottom: '8px' }}>
                            Quel est le problème ?
                        </p>
                        <div className="grid grid-cols-3" style={{ gap: '10px' }}>
                            {content.problemTypes.map((problem) => {
                                const isSelected = selectedProblem === problem.id;
                                const icon = problemIcons[problem.id] || problemIcons.impact;
                                return (
                                    <button
                                        key={problem.id}
                                        onClick={() => setSelectedProblem(problem.id)}
                                        className="flex flex-col items-center justify-center aspect-square"
                                        style={{
                                            backgroundColor: isSelected ? '#FFD200' : 'rgba(255, 255, 255, 0.1)',
                                            color: isSelected ? '#111827' : '#FFFFFF',
                                            borderRadius: '12px',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <div className="mb-2">{icon}</div>
                                        <span style={{ fontSize: '12px', fontWeight: 500 }}>{problem.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={handleViewAvailability}
                        className="w-full flex items-center justify-center transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                        style={{
                            height: '56px',
                            backgroundColor: '#FFD200',
                            borderRadius: '16px',
                            boxShadow: '0px 4px 15px rgba(255, 210, 0, 0.3)',
                            gap: '8px'
                        }}
                    >
                        <span style={{ fontSize: '14px', fontWeight: 800, color: '#111827', textTransform: 'uppercase' }}>
                            Déclarer un sinistre
                        </span>
                        <ArrowRight size={20} style={{ color: '#111827' }} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </section>
    );
}
