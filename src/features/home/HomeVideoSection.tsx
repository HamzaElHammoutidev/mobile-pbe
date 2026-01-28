'use client';

import { Volume2, VolumeX } from 'lucide-react';
import { useState, useRef } from 'react';

export default function HomeVideoSection() {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <section className="py-8 w-full" style={{ backgroundColor: '#F9FAFB' }}>
            <div className="flex flex-col items-center w-full">
                {/* Header */}
                <div className="text-center mb-6 pt-2 px-4">
                    <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#111827', textTransform: 'uppercase' }}>
                        Parcours{" "}
                        <span className="relative inline-block mt-1">
                            <span
                                className="absolute inset-x-[1px] inset-y-0 bg-[#FFD200]"
                                style={{
                                    zIndex: 0,
                                    transform: 'skewX(-10deg)'
                                }}
                            />
                            <span className="relative z-10 px-1">Client</span>
                        </span>
                    </h2>
                </div>

                <div className="w-full px-4">
                    <div
                        className="w-full relative overflow-hidden rounded-3xl shadow-lg bg-black"
                        style={{
                            transform: 'translateZ(0)',
                        }}
                    >
                        <video
                            ref={videoRef}
                            src="https://parebriseexpress.ma//storage/theme-videos/March2025/jTRRoaPa6EOwCksPLKLh.mp4"
                            autoPlay
                            muted={isMuted}
                            loop
                            playsInline
                            className="w-full h-auto block" // h-auto ensures intrinsic aspect ratio is respected (no cropping)
                        />

                        {/* Controls */}
                        <button
                            onClick={toggleMute}
                            className="absolute bottom-4 right-4 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white transition-all active:scale-95 hover:bg-black/50"
                            style={{ zIndex: 10 }}
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
