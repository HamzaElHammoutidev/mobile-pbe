'use client';

import { Navigation } from 'lucide-react';
import Button from '@/components/ui/Button';
import type { AboutPageContent } from '@/lib/api/about';

interface TeamCultureSectionProps {
    content: AboutPageContent['teamCulture'];
}

const DEFAULT_IMAGES = [
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
];

export default function TeamCultureSection({ content }: TeamCultureSectionProps) {
    const images = content.imageUrls.length > 0 ? content.imageUrls : DEFAULT_IMAGES;

    return (
        <section className="bg-white py-10 px-4">
            <div className="max-w-[380px] mx-auto">

                {/* Locator Action Button - Using shared Button component */}
                <Button href="/centres" variant="outline" size="lg" className="w-full">
                    <Navigation size={18} fill="#000000" />
                    {content.findCenterButtonText}
                </Button>

                {/* Section Heading */}
                <h2
                    style={{
                        fontWeight: 800,
                        fontSize: '24px',
                        color: '#111827',
                        marginTop: '32px',
                        marginBottom: '16px'
                    }}
                >
                    {content.title}
                </h2>

                {/* Bento Gallery Grid */}
                <div className="flex flex-col" style={{ gap: '12px' }}>

                    {/* Card A: The Team (Large) */}
                    <div
                        className="relative overflow-hidden"
                        style={{
                            aspectRatio: '4/3',
                            borderRadius: '20px'
                        }}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url(${images[0] || DEFAULT_IMAGES[0]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        />
                        {/* Gradient Overlay */}
                        <div
                            className="absolute inset-0"
                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)' }}
                        />
                        {/* Caption */}
                        <span
                            className="absolute bottom-4 left-4"
                            style={{ fontWeight: 500, fontSize: '13px', color: '#FFFFFF' }}
                        >
                            {content.description}
                        </span>
                    </div>

                    {/* Row 2: Two Square Cards */}
                    <div className="grid grid-cols-2" style={{ gap: '12px' }}>

                        {/* Card B: The Craft */}
                        <div
                            className="relative overflow-hidden"
                            style={{
                                aspectRatio: '1/1',
                                borderRadius: '20px'
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `url(${images[1] || DEFAULT_IMAGES[1]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />
                        </div>

                        {/* Card C: The Office */}
                        <div
                            className="relative overflow-hidden"
                            style={{
                                aspectRatio: '1/1',
                                borderRadius: '20px'
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `url(${images[2] || DEFAULT_IMAGES[2]})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
