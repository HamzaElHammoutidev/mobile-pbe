'use client';

import React from 'react';

const DEFAULT_VIDEO = 'https://parebriseexpress.ma//storage/theme-videos/March2025/wRZK8aB8oLsXQUO0nwC9.mp4';

const NetworkHero = () => {
    return (
        <section className="px-5 py-8">
            <div className="relative h-[320px] w-full bg-slate-300 rounded-[28px] overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src={DEFAULT_VIDEO} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                {/* Content (Bottom Aligned) */}
                <div className="absolute bottom-5 left-5">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-4 h-4 rounded-full bg-[#FFD200] flex items-center justify-center shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-black/80" />
                        </span>
                        <p className="text-[#FFD200] text-[9px] font-bold uppercase tracking-[0.16em]">
                            COUVERTURE NATIONALE
                        </p>
                    </div>
                    <h2 className="text-white text-[28px] font-extrabold tracking-tight leading-tight">
                        Notre Réseau
                    </h2>
                </div>

                {/* Floating Badge (Bottom Right) */}
                <div className="absolute bottom-5 right-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-4 py-3 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                    <span className="text-white text-3xl font-black leading-none mb-0.5">28</span>
                    <span className="text-white/90 text-[10px] font-bold uppercase tracking-[0.2em]">CENTRES</span>
                </div>
            </div>
        </section>
    );
};

export default NetworkHero;
