'use client';

import { Star, StarHalf, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import type { HomepageContent } from '@/lib/api/homepage';

interface TrustSectionProps {
    content: HomepageContent['trust'];
}

const PARTNER_LOGOS = [
    "https://parebriseexpress.ma/images/LOGO_ASSURANCE/LOGO_ASSURANCE/AXA.png",
    "https://parebriseexpress.ma/images/LOGO_ASSURANCE/LOGO_ASSURANCE/CAT_.png",
    "https://parebriseexpress.ma/images/LOGO_ASSURANCE/LOGO_ASSURANCE/RMA.png",
    "https://parebriseexpress.ma/images/LOGO_ASSURANCE/LOGO_ASSURANCE/SANLAM.png",
    "https://parebriseexpress.ma/images/LOGO_ASSURANCE/LOGO_ASSURANCE/WAFA.png",
    "https://parebriseexpress.ma/images/LOGO_ASSURANCE/LOGO_ASSURANCE/ALLIANZ.png",
    "https://parebriseexpress.ma/images/LOGO_ASSURANCE/LOGO_ASSURANCE/ATLANTA.png"
];

export default function TrustSection({ content }: TrustSectionProps) {
    return (
        <section className="bg-white py-8 px-4 overflow-hidden">
            <div className="w-full max-w-[800px] mx-auto">

                {/* Insurance Partners Header */}
                <p
                    className="text-center uppercase tracking-[1px] mb-5"
                    style={{ fontSize: '12px', fontWeight: 700, color: '#9CA3AF' }}
                >
                    {content.title}
                </p>

                {/* Marquee Slider */}
                <div className="relative w-full overflow-hidden mb-8" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                    <div
                        className="flex items-center gap-12 animate-scroll"
                        style={{
                            width: 'max-content',
                            animation: 'scroll 25s linear infinite', // Slower animation for larger logos
                        }}
                    >
                        {/* Duplicate list for seamless scrolling */}
                        {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, index) => (
                            <div key={index} className="flex-shrink-0 relative h-14 w-40 flex items-center justify-center">
                                <Image
                                    src={logo}
                                    alt={`Partner ${index}`}
                                    fill
                                    className="object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                                    sizes="96px"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
                    @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-scroll {
                        animation: scroll 20s linear infinite; 
                    }
                `}</style>

                {/* Trust Card */}
                <div
                    className="rounded-[24px] p-5"
                    style={{
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                >
                    {/* Row 1: Certifications */}
                    <div className="flex items-center justify-between">
                        {/* Salamatouna Label */}
                        <div className="flex items-center gap-2">
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: '#22C55E' }}
                            >
                                <ShieldCheck size={18} color="white" />
                            </div>
                            <div className="flex flex-col">
                                <span style={{ fontSize: '10px', fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
                                    LABEL
                                </span>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#22C55E', lineHeight: 1.2 }}>
                                    SALAMATOUNA
                                </span>
                            </div>
                        </div>

                        {/* Vertical Divider */}
                        <div style={{ width: '1px', height: '24px', backgroundColor: '#E5E7EB' }} />

                        {/* ISO Badge */}
                        <div
                            className="flex flex-col items-center px-2 py-0.5"
                            style={{
                                border: '1px solid #1D4ED8',
                                borderRadius: '6px'
                            }}
                        >
                            <span style={{ fontSize: '10px', fontWeight: 600, color: '#1D4ED8', lineHeight: 1.2 }}>
                                ISO
                            </span>
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#1D4ED8', lineHeight: 1.2 }}>
                                9001
                            </span>
                        </div>

                        {/* Avatar Pile */}
                        <div className="flex items-center">
                            <div
                                className="w-8 h-8 rounded-full"
                                style={{
                                    backgroundColor: '#E5E7EB',
                                    border: '2px solid #fff'
                                }}
                            />
                            <div
                                className="w-8 h-8 rounded-full"
                                style={{
                                    backgroundColor: '#D1D5DB',
                                    border: '2px solid #fff',
                                    marginLeft: '-10px'
                                }}
                            />
                            <div
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{
                                    backgroundColor: '#111827',
                                    border: '2px solid #fff',
                                    marginLeft: '-10px'
                                }}
                            >
                                <span style={{ fontSize: '10px', fontWeight: 600, color: '#FFFFFF' }}>
                                    +1k
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Separator */}
                    <hr style={{ border: 'none', borderTop: '1px solid #F3F4F6', margin: '16px 0' }} />

                    {/* Row 2: Ratings */}
                    <div className="flex items-center" style={{ gap: '16px' }}>
                        {/* Big Number */}
                        <span style={{ fontSize: '42px', fontWeight: 800, color: '#111827' }}>
                            {content.rating.toFixed(1)}
                        </span>

                        {/* Star Block */}
                        <div className="flex flex-col items-start">
                            {/* Stars */}
                            <div className="flex items-center gap-0.5">
                                {[...Array(Math.floor(content.rating))].map((_, i) => (
                                    <Star key={i} size={16} fill="#FBBF24" stroke="#FBBF24" />
                                ))}
                                {content.rating % 1 >= 0.5 && (
                                    <StarHalf size={16} fill="#FBBF24" stroke="#FBBF24" />
                                )}
                            </div>
                            {/* Subtext */}
                            <span style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                                {content.reviewText}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
