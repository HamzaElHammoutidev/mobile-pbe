'use client';

import { useEffect, useState, useRef } from 'react';
import { CalendarDays } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';

export default function StickyActionBar() {
    const [isSticky, setIsSticky] = useState(true);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const globalSettings = useGlobalSettings();

    const { badgeText, title, ctaText } = globalSettings.stickyBar;

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            { threshold: 0, rootMargin: '0px 0px 100px 0px' }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div ref={sentinelRef} className="h-px w-full" />

            <div
                className={`${isSticky ? 'fixed bottom-0 left-0 right-0' : 'relative'} bg-white px-6 py-4 flex justify-between items-center z-50`}
                style={{
                    borderTop: '1px solid #F3F4F6',
                    boxShadow: isSticky ? '0px -4px 20px rgba(0, 0, 0, 0.05)' : 'none'
                }}
            >
                {/* Left: Text Group */}
                <div className="flex flex-col gap-1">
                    <span
                        className="uppercase flex items-center gap-1"
                        style={{
                            color: '#E1554E',
                            fontWeight: 700,
                            fontSize: '11px',
                            letterSpacing: '0.5px'
                        }}
                    >
                        <span style={{ fontSize: '8px' }}>●</span> {badgeText}
                    </span>
                    <h3 style={{ color: '#111827', fontWeight: 700, fontSize: '20px', lineHeight: 1.2 }}>
                        {title}
                    </h3>
                </div>

                {/* Right: CTA Button - Using shared Button component */}
                <Button href="/booking" variant="primary" size="lg">
                    {ctaText}
                    <CalendarDays size={20} strokeWidth={2.5} />
                </Button>
            </div>
        </>
    );
}
