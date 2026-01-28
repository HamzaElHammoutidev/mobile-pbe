'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Star, Users, Clock } from 'lucide-react';
import type { ServicesPageContent } from '@/lib/api/services';

interface ExcellenceSectionProps {
    content: ServicesPageContent['excellence'];
}

const DEFAULT_ITEMS = [
    {
        id: 1,
        title: 'Qualité Certifiée',
        description: "Nous utilisons uniquement du verre conforme aux normes des constructeurs d'origine (OEM) pour garantir votre sécurité.",
    },
    {
        id: 2,
        title: 'Techniciens Experts',
        description: "Nos techniciens sont formés en permanence aux dernières technologies de vitrage et de calibrage ADAS.",
    },
    {
        id: 3,
        title: "Rapidité d'Exécution",
        description: "Une intervention moyenne de 30 minutes pour un remplacement de pare-brise, pour que vous repreniez la route au plus vite.",
    },
];

const ICONS = [
    <Star key="star" size={20} className="text-[#FFD200]" fill="#FFD200" />,
    <Users key="users" size={20} className="text-gray-500" />,
    <Clock key="clock" size={20} className="text-gray-500" />,
];

export default function ExcellenceSection({ content }: ExcellenceSectionProps) {
    const items = content.length > 0 ? content : DEFAULT_ITEMS;
    const [openItemId, setOpenItemId] = useState<number>(items[0]?.id || 1);

    const toggleItem = (id: number) => {
        setOpenItemId(openItemId === id ? -1 : id);
    };

    return (
        <section className="bg-[#F9FAFB] pt-2 pb-16 px-6">
            <div className="w-full max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-6 bg-[#FFD200] rounded-full" />
                    <h2 className="text-[20px] font-extrabold text-[#111827] uppercase tracking-wide">
                        L'EXCELLENCE AVANT TOUT
                    </h2>
                </div>

                {/* Accordion List */}
                <div className="flex flex-col gap-4">
                    {items.map((item, idx) => {
                        const isOpen = openItemId === item.id;
                        const icon = ICONS[idx % ICONS.length];

                        return (
                            <div
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`
                                    bg-white rounded-[16px] overflow-hidden cursor-pointer transition-all duration-300
                                    ${isOpen ? 'border-l-4 border-[#FFD200] shadow-md' : 'border-l-4 border-transparent shadow-sm'}
                                `}
                            >
                                {/* Header Row */}
                                <div className="p-5 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {/* Icon Wrapper */}
                                        <div className={`
                                            w-8 h-8 rounded-full flex items-center justify-center
                                            ${isOpen ? 'bg-yellow-50' : 'bg-gray-50'}
                                        `}>
                                            {isOpen ? (
                                                <Star size={20} className="text-[#FFD200]" fill="#FFD200" />
                                            ) : (
                                                icon
                                            )}
                                        </div>

                                        <span className={`text-[16px] font-bold ${isOpen ? 'text-black' : 'text-gray-700'}`}>
                                            {item.title}
                                        </span>
                                    </div>

                                    {isOpen ? (
                                        <ChevronUp size={20} className="text-gray-400" />
                                    ) : (
                                        <ChevronDown size={20} className="text-gray-400" />
                                    )}
                                </div>

                                {/* Content Logic */}
                                <div
                                    className={`
                                        bg-white px-5 overflow-hidden transition-all duration-300 ease-in-out
                                        ${isOpen ? 'max-h-[200px] opacity-100 pb-5' : 'max-h-0 opacity-0'}
                                    `}
                                >
                                    <p className="text-[14px] text-gray-600 leading-relaxed pl-[48px]">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
