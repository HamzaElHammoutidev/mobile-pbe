'use client';

import { Truck, Shield, Handshake, Check } from 'lucide-react';
import type { ServicesPageContent } from '@/lib/api/services';

interface StatsSectionProps {
    content: ServicesPageContent['stats'];
}

export default function StatsSection({ content }: StatsSectionProps) {
    // Extract stats from content with fallbacks
    const stat1 = content[0] || { value: '25+', label: 'Unités Mobiles', description: '' };
    const stat2 = content[1] || { value: '20+', label: 'Années d\'Expérience', description: '' };
    const stat3 = content[2] || { value: '100%', label: 'Agréé Assurances', description: 'Gestion administrative incluse' };

    return (
        <section className="bg-[#F9FAFB] px-6 py-6 font-sans">
            <div className="max-w-7xl mx-auto space-y-4">

                {/* Top Row: Two Columns */}
                <div className="grid grid-cols-2 gap-4">

                    {/* Card A: Mobile Units */}
                    <div
                        className="bg-white rounded-[20px] p-5 relative shadow-[0_2px_10px_rgba(0,0,0,0.03)] h-[140px] flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-[32px] font-extrabold text-black leading-none">
                                {stat1.value}
                            </span>
                            <Truck className="text-gray-200" size={24} strokeWidth={2} />
                        </div>

                        <div>
                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-3">
                                {stat1.label}
                            </p>
                            {/* Yellow Accent Bar */}
                            <div className="w-6 h-1 bg-[#FFD200] rounded-full" />
                        </div>
                    </div>

                    {/* Card B: Experience */}
                    <div
                        className="bg-white rounded-[20px] p-5 relative shadow-[0_2px_10px_rgba(0,0,0,0.03)] h-[140px] flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-start">
                                <span className="text-[32px] font-extrabold text-black leading-none">
                                    {stat2.value.replace('+', '')}
                                </span>
                                <span className="text-[20px] font-bold text-[#FFD200] ml-0.5 mt-1">
                                    +
                                </span>
                            </div>
                            <Shield className="text-gray-200" size={24} strokeWidth={2} />
                        </div>

                        <div>
                            <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wide mb-3 leading-tight">
                                {stat2.label.replace(' ', ' <br /> ')}
                            </p>
                            {/* Black Accent Bar */}
                            <div className="w-6 h-1 bg-black rounded-full" />
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Feature Card (Full Width) */}
                <div
                    className="w-full bg-[#FFD200] rounded-[20px] p-6 relative overflow-hidden flex items-center justify-between shadow-sm"
                    style={{ minHeight: '130px' }}
                >
                    {/* Content Stack */}
                    <div className="relative z-10 flex flex-col justify-center h-full">
                        <span className="text-[42px] font-extrabold text-black leading-none mb-1">
                            {stat3.value}
                        </span>
                        <h3 className="text-[14px] font-bold text-black uppercase tracking-wide mb-0.5">
                            {stat3.label}
                        </h3>
                        <p className="text-[13px] font-normal text-gray-800">
                            {stat3.description}
                        </p>
                    </div>

                    {/* Visual Graphic (Right Side) */}
                    <div className="absolute right-[-10px] bottom-[-10px] opacity-10 font-black">
                        {/* Abstract Feature Graphic or Large Icon */}
                        <Handshake size={120} strokeWidth={1.5} className="text-black transform -rotate-12" />
                    </div>

                    {/* Floating Checkmark Badge */}
                    <div className="absolute right-6 top-6 w-8 h-8 bg-black/5 rounded-full flex items-center justify-center">
                        <Check size={16} className="text-black" strokeWidth={3} />
                    </div>
                </div>

            </div>
        </section>
    );
}
