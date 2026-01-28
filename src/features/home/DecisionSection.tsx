'use client';

import { CheckCircle2, AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import type { HomepageContent } from '@/lib/api/homepage';

interface DecisionSectionProps {
    content: HomepageContent['decision'];
}

export default function DecisionSection({ content }: DecisionSectionProps) {
    return (
        <section className="bg-white py-8 px-4">
            <div className="max-w-[380px] mx-auto">

                {/* Separator Line */}
                <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', marginBottom: '32px' }} />

                {/* Section Header */}
                <div className="flex items-center justify-between mb-4 px-1">
                    <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#111827' }}>
                        {content.title}
                    </h2>
                    <Link
                        href="/guide"
                        className="flex items-center gap-1"
                        style={{ fontSize: '14px', fontWeight: 600, color: '#EAB308' }}
                    >
                        Guide
                        <ExternalLink size={14} />
                    </Link>
                </div>

                {/* Comparison Cards Grid */}
                <div className="grid grid-cols-2" style={{ gap: '16px' }}>

                    {/* Card A: Réparation (Recommended) - Clickable */}
                    <Link
                        href="/services/reparation"
                        className="flex flex-col p-5 rounded-[20px] transition-transform hover:scale-[1.02] cursor-pointer"
                        style={{
                            border: '2px solid #FFD200',
                            background: 'linear-gradient(135deg, #FFFCF0 0%, #FFFFFF 100%)',
                            boxShadow: '0 4px 12px rgba(255, 210, 0, 0.15)'
                        }}
                    >
                        {/* Icon Group */}
                        <div className="flex items-center gap-2 mb-3">
                            {/* Price Coin */}
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)'
                                }}
                            >
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>
                                    {content.repairCard.price || '5DH'}
                                </span>
                            </div>
                            {/* Impact dots */}
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#9CA3AF">
                                <circle cx="6" cy="6" r="2" />
                                <circle cx="12" cy="6" r="2" />
                                <circle cx="18" cy="6" r="2" />
                                <circle cx="6" cy="12" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="18" cy="12" r="2" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '12px' }}>
                            {content.repairCard.title}
                        </h3>

                        {/* Subtitle */}
                        <span
                            className="uppercase"
                            style={{ fontSize: '12px', fontWeight: 700, color: '#EAB308', marginBottom: '24px' }}
                        >
                            {content.repairCard.badge}
                        </span>

                        {/* Feature List */}
                        <div className="flex flex-col gap-2 mt-auto">
                            {content.repairCard.features.slice(0, 2).map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    <CheckCircle2 size={18} fill="#22C55E" stroke="white" />
                                    <span style={{ fontSize: '13px', color: '#374151' }}>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </Link>

                    {/* Card B: Remplacement (Secondary) - Clickable */}
                    <Link
                        href="/services/remplacement"
                        className="flex flex-col p-5 rounded-[20px] transition-transform hover:scale-[1.02] cursor-pointer"
                        style={{
                            border: '1px solid #E5E7EB',
                            background: '#F9FAFB'
                        }}
                    >
                        {/* Icon */}
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                            style={{ backgroundColor: '#E5E7EB' }}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                                <path d="M8 4l8 0M6 8l12 0" strokeDasharray="2 2" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginTop: '12px' }}>
                            {content.replacementCard.title}
                        </h3>

                        {/* Subtitle */}
                        <span
                            className="uppercase"
                            style={{ fontSize: '12px', fontWeight: 700, color: '#9CA3AF', marginBottom: '24px' }}
                        >
                            {content.replacementCard.badge}
                        </span>

                        {/* Feature List */}
                        <div className="flex flex-col gap-2 mt-auto">
                            {content.replacementCard.features.slice(0, 2).map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                    {idx === 0 ? (
                                        <AlertTriangle size={18} fill="#F97316" stroke="white" />
                                    ) : (
                                        <ShieldCheck size={18} fill="#111827" stroke="white" />
                                    )}
                                    <span style={{ fontSize: '13px', color: '#374151' }}>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </Link>

                </div>
            </div>
        </section>
    );
}
