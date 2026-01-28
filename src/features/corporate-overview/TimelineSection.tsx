'use client';

import React from 'react';
import { History } from 'lucide-react';

const TimelineSection = () => {
    return (
        <section className="px-5 py-12 bg-white overflow-hidden">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-[22px] font-extrabold text-[#111827]">Expertise et Présence</h2>
                <div className="p-2 bg-gray-50 rounded-xl">
                    <History className="w-5 h-5 text-gray-400" />
                </div>
            </div>

            <div className="relative pl-8">
                {/* Vertical Line */}
                <div className="absolute left-[3.5px] top-2 bottom-0 w-[1.5px] bg-gradient-to-b from-gray-200 via-gray-200 to-transparent" />

                {/* Timeline Items */}
                <div className="space-y-12">
                    {/* Item 1: 2000 */}
                    <div className="relative">
                        <div className="absolute -left-[32px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white shadow-sm" />
                        <div className="space-y-2">
                            <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] block">
                                2000 – CRÉATION
                            </span>
                            <h3 className="text-lg font-extrabold text-[#111827]">Vision Industrielle</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-[90%]">
                                Lancement du premier centre spécialisé aux normes européennes à Casablanca.
                            </p>
                        </div>
                    </div>

                    {/* Item 2: 2010 */}
                    <div className="relative">
                        <div className="absolute -left-[32px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-400 border-2 border-white shadow-sm" />
                        <div className="space-y-2">
                            <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] block">
                                2010 – EXPANSION
                            </span>
                            <h3 className="text-lg font-extrabold text-[#111827]">Maillage National</h3>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-[90%]">
                                Déploiement stratégique de 15 nouveaux centres et d'une flotte mobile.
                            </p>
                        </div>
                    </div>

                    {/* Item 3: TODAY */}
                    <div className="relative">
                        <div className="absolute -left-[34px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#FFD200] border-2 border-white shadow-[0_0_0_4px_rgba(255,210,0,0.1)]" />
                        <div className="bg-white rounded-[22px] p-6 shadow-[0_14px_30px_rgba(0,0,0,0.06)] border border-gray-50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD200]/5 -mr-8 -mt-8 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <span className="text-[#FFD200] text-[10px] font-black uppercase tracking-[0.2em] block mb-2 relative z-10">
                                AUJOURD'HUI
                            </span>
                            <h3 className="text-xl font-extrabold text-[#111827] mb-2 relative z-10">Leader du Marché</h3>
                            <p className="text-gray-500 text-sm leading-relaxed relative z-10">
                                Certification ISO 9001 et reconnaissance comme partenaire privilégié des assureurs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
