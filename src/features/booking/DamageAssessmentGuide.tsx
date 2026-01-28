'use client';

import { useState } from 'react';
import { CheckCircle2, Clock, Car, AlertCircle, ShieldCheck, Infinity, Truck, Shield, Handshake, Headphones, CalendarDays, Check } from 'lucide-react';
import Link from 'next/link';

type DamageType = 'repair' | 'replace' | null;

export default function DamageAssessmentGuide() {
    const [selectedType, setSelectedType] = useState<DamageType>('repair');

    return (
        <>
            <section className="min-h-screen pb-32" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="max-w-[380px] mx-auto px-4">

                    {/* Page Header */}
                    <div className="text-center pt-8 pb-6">
                        <h1 style={{ fontWeight: 800, fontSize: '24px', color: '#111827', marginBottom: '12px' }}>
                            Impact ou Fissure ?
                        </h1>
                        <p
                            style={{
                                fontWeight: 400,
                                fontSize: '15px',
                                color: '#6B7280',
                                lineHeight: 1.5,
                                maxWidth: '90%',
                                margin: '0 auto'
                            }}
                        >
                            Comparez votre dommage ci-dessous pour savoir si nous devons réparer ou remplacer votre pare-brise.
                        </p>
                    </div>

                    {/* Comparison Cards */}
                    <div className="flex gap-3">

                        {/* Card A: Réparation (The Recommended Choice) */}
                        <button
                            onClick={() => setSelectedType('repair')}
                            className="flex-1 overflow-hidden text-left transition-all"
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '16px',
                                border: selectedType === 'repair' ? '2px solid #FFD200' : '2px solid transparent',
                                boxShadow: selectedType === 'repair' ? '0 4px 15px rgba(255, 210, 0, 0.15)' : '0 2px 8px rgba(0,0,0,0.05)',
                                transform: selectedType === 'repair' ? 'scale(1.02)' : 'scale(1)'
                            }}
                        >
                            {/* Recommended Banner */}
                            <div
                                className="w-full text-center"
                                style={{ backgroundColor: '#FFD200' }}
                            >
                                <span
                                    className="uppercase"
                                    style={{ fontSize: '10px', fontWeight: 700, color: '#000000', letterSpacing: '0.5px' }}
                                >
                                    Recommandé
                                </span>
                            </div>

                            <div className="p-4 relative">
                                {/* Selection Checkmark */}
                                {selectedType === 'repair' && (
                                    <div
                                        className="absolute top-2 right-2 flex items-center justify-center"
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: '#FFD200',
                                            borderRadius: '50%'
                                        }}
                                    >
                                        <Check size={14} strokeWidth={3} style={{ color: '#111827' }} />
                                    </div>
                                )}

                                {/* Icon */}
                                <div
                                    className="flex items-center justify-center mx-auto mb-3"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '50%',
                                        backgroundColor: '#FEF9C3'
                                    }}
                                >
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#111827">
                                        <circle cx="12" cy="12" r="2.5" />
                                        <circle cx="7" cy="7" r="1.5" />
                                        <circle cx="17" cy="7" r="1.5" />
                                        <circle cx="7" cy="17" r="1.5" />
                                        <circle cx="17" cy="17" r="1.5" />
                                        <circle cx="12" cy="5" r="1.2" />
                                        <circle cx="12" cy="19" r="1.2" />
                                        <circle cx="5" cy="12" r="1.2" />
                                        <circle cx="19" cy="12" r="1.2" />
                                    </svg>
                                </div>

                                {/* Title & Subtitle */}
                                <h3 className="text-center" style={{ fontWeight: 700, fontSize: '18px', color: '#111827' }}>
                                    Réparation
                                </h3>
                                <p className="text-center" style={{ fontSize: '13px', fontWeight: 500, color: '#4B5563' }}>
                                    Priorité Sécurité
                                </p>

                                {/* Divider */}
                                <hr className="my-4" style={{ borderColor: '#F3F4F6' }} />

                                {/* Feature List - Green Theme */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start gap-2">
                                        <CheckCircle2 size={18} fill="#22C55E" stroke="white" className="flex-shrink-0 mt-0.5" />
                                        <span style={{ fontSize: '13px', color: '#374151' }}>Plus petit qu&apos;une pièce de 2€</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Clock size={18} fill="#22C55E" stroke="white" className="flex-shrink-0 mt-0.5" />
                                        <span style={{ fontSize: '13px', color: '#374151' }}>Fait en 30 min</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Car size={18} fill="#22C55E" stroke="white" className="flex-shrink-0 mt-0.5" />
                                        <span style={{ fontSize: '13px', color: '#374151' }}>Souvent 0€ avec assurance</span>
                                    </div>
                                </div>
                            </div>
                        </button>

                        {/* Card B: Remplacement (The Secondary Choice) */}
                        <button
                            onClick={() => setSelectedType('replace')}
                            className="flex-1 text-left transition-all"
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '16px',
                                border: selectedType === 'replace' ? '2px solid #FFD200' : '2px solid transparent',
                                boxShadow: selectedType === 'replace' ? '0 4px 15px rgba(255, 210, 0, 0.15)' : '0 2px 8px rgba(0,0,0,0.05)',
                                transform: selectedType === 'replace' ? 'scale(1.02)' : 'scale(1)'
                            }}
                        >
                            {/* Empty space to align with left card's banner */}
                            <div className="h-[32px]" />

                            <div className="p-4 relative">
                                {/* Selection Checkmark */}
                                {selectedType === 'replace' && (
                                    <div
                                        className="absolute top-2 right-2 flex items-center justify-center"
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: '#FFD200',
                                            borderRadius: '50%'
                                        }}
                                    >
                                        <Check size={14} strokeWidth={3} style={{ color: '#111827' }} />
                                    </div>
                                )}

                                {/* Icon */}
                                <div
                                    className="flex items-center justify-center mx-auto mb-3"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '50%',
                                        backgroundColor: '#F3F4F6'
                                    }}
                                >
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2" strokeLinecap="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <path d="M3 12 L10 5 L14 9 L21 2" />
                                        <path d="M3 18 L8 13 L12 17 L21 8" />
                                    </svg>
                                </div>

                                {/* Title & Subtitle */}
                                <h3 className="text-center" style={{ fontWeight: 700, fontSize: '18px', color: '#111827' }}>
                                    Remplacement
                                </h3>
                                <p className="text-center" style={{ fontSize: '13px', fontWeight: 500, color: '#6B7280' }}>
                                    Solution Finale
                                </p>

                                {/* Divider */}
                                <hr className="my-4" style={{ borderColor: '#F3F4F6' }} />

                                {/* Feature List - Grey Theme */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start gap-2">
                                        <AlertCircle size={18} style={{ color: '#4B5563' }} className="flex-shrink-0 mt-0.5" />
                                        <span style={{ fontSize: '13px', color: '#374151' }}>Fissure ou gros impact</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <ShieldCheck size={18} style={{ color: '#4B5563' }} className="flex-shrink-0 mt-0.5" />
                                        <span style={{ fontSize: '13px', color: '#374151' }}>Certifié CE</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <Infinity size={18} style={{ color: '#4B5563' }} className="flex-shrink-0 mt-0.5" />
                                        <span style={{ fontSize: '13px', color: '#374151' }}>Garantie à vie</span>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Helper Button */}
                    <button
                        className="w-full flex items-center justify-center gap-3 mt-6"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '12px',
                            padding: '12px 24px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}
                    >
                        <Headphones size={20} style={{ color: '#111827' }} />
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                            Dois-je réparer ou remplacer ?
                        </span>
                    </button>

                    {/* Trust Row */}
                    <div className="flex items-center justify-between mt-8 px-4">
                        <div className="flex flex-col items-center gap-1">
                            <Truck size={24} style={{ color: '#9CA3AF' }} />
                            <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Mobile</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Shield size={24} style={{ color: '#9CA3AF' }} />
                            <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Garantie</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <Handshake size={24} style={{ color: '#9CA3AF' }} />
                            <span style={{ fontSize: '10px', color: '#9CA3AF' }}>Assurance</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky CTA Button */}
            {selectedType && (
                <div
                    className="fixed bottom-0 left-0 right-0 bg-white z-50 px-4 py-4"
                    style={{ boxShadow: '0 -4px 20px rgba(0,0,0,0.05)' }}
                >
                    <div className="max-w-[380px] mx-auto">
                        <Link
                            href="/booking"
                            className="w-full flex items-center justify-center gap-2"
                            style={{
                                height: '56px',
                                backgroundColor: '#FFD200',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(255, 210, 0, 0.25)'
                            }}
                        >
                            <span style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>
                                Prendre Rendez-vous
                            </span>
                            <CalendarDays size={20} style={{ color: '#111827' }} strokeWidth={2} />
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
