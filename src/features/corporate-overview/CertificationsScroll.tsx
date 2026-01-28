'use client';

import React from 'react';
import { ShieldCheck, Award, CheckCircle } from 'lucide-react';

const CertificationsScroll = () => {
    const certifications = [
        { name: 'ISO 9001', icon: <span className="font-extrabold text-2xl tracking-tighter">ISO<span className="text-gray-300 font-light">9001</span></span> },
        { name: 'CERTIFIED', icon: <ShieldCheck className="w-9 h-9 text-gray-700" /> },
        { name: 'SGS', icon: <span className="font-black text-[28px] tracking-widest text-gray-800">SGS</span> },
        { name: 'AFNOR', icon: <Award className="w-9 h-9 text-gray-700" /> },
        { name: 'QUALITÉ', icon: <CheckCircle className="w-9 h-9 text-gray-700" /> },
    ];

    return (
        <section className="py-12 bg-[#FAFAFA]">
            <div className="px-5 mb-8">
                <h2 className="text-[22px] font-extrabold text-[#111827]">L'Excellence avant tout</h2>
            </div>

            <div className="flex gap-6 overflow-x-auto px-5 pb-8 no-scrollbar touch-pan-x">
                {certifications.map((cert, index) => (
                    <div
                        key={index}
                        className="shrink-0 w-[140px] h-[140px] bg-white rounded-[26px] flex flex-col items-center justify-center shadow-[0_10px_24px_rgba(0,0,0,0.04)] border border-white p-4 transition-all hover:translate-y-[-4px] active:scale-95"
                    >
                        <div className="flex-1 flex items-center justify-center text-gray-800">
                            {cert.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">
                            {cert.name === cert.name.toUpperCase() ? cert.name : ''}
                        </span>
                    </div>
                ))}
                {/* Visual padding for the end of scroll */}
                <div className="shrink-0 w-2" />
            </div>

            <style jsx global>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default CertificationsScroll;
