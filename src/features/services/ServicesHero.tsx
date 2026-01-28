'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import type { ServicesPageContent } from '@/lib/api/services';

interface ServicesHeroProps {
    content: ServicesPageContent['hero'];
}

const DEFAULT_VIDEO = 'https://parebriseexpress.ma//storage/theme-videos/March2025/wRZK8aB8oLsXQUO0nwC9.mp4';

export default function ServicesHero({ content }: ServicesHeroProps) {
    return (
        <section className="flex flex-col w-full bg-[#0F1115]">
            {/* Cinematic Video Header - 4/2 (2:1) aspect ratio from HeroSection */}
            <div className="relative w-full" style={{ aspectRatio: '4/2' }}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source
                        src={content.videoUrl || DEFAULT_VIDEO}
                        type="video/mp4"
                    />
                </video>
                {/* Softer gradient for smooth transition */}
                <div
                    className="absolute inset-x-0 bottom-0 h-24"
                    style={{ background: 'linear-gradient(to top, #0F1115 0%, rgba(15,17,21,0.27) 50%, transparent 100%)' }}
                />
            </div>

            {/* Content Container - dark background, no card edges */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-6 pb-12">
                <div className="max-w-xl">
                    {/* Badge */}
                    <div className="flex justify-start mb-6">
                        <div
                            className="inline-flex items-center px-4 py-2 bg-[#FFD200] rounded-lg"
                        >
                            <span className="text-[12px] font-bold uppercase tracking-wider text-black">
                                {content.subtitle}
                            </span>
                        </div>
                    </div>

                    {/* Typography Stack */}
                    <div className="mb-8">
                        <h1 className="leading-[0.95] mb-6">
                            {content.title.split(' ').map((word, idx, arr) => (
                                <span
                                    key={idx}
                                    className={`block text-[40px] md:text-[56px] font-black uppercase tracking-tight ${
                                        idx === arr.length - 1 ? 'text-[#FFD200]' : 'text-white'
                                    }`}
                                >
                                    {word}
                                </span>
                            ))}
                        </h1>

                        {/* Vertical line accent + Text */}
                        <div className="flex gap-4 border-l-4 border-[#FFD200] pl-6">
                            <p className="text-[15px] md:text-[18px] font-medium text-gray-200 leading-[1.6]">
                                {content.description}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons (CTA) */}
                    <div className="flex items-center gap-4 mt-8">
                        <Link
                            href={ROUTES.ABOUT}
                            className="h-14 px-8 bg-[#FFD200] rounded-2xl flex items-center justify-center gap-3 shadow-lg hover:bg-yellow-400 transition-colors"
                        >
                            <span className="text-[15px] font-bold text-black uppercase tracking-wide">
                                {content.ctaText}
                            </span>
                            <ArrowRight size={20} className="text-black" strokeWidth={2.5} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
