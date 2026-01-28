'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { MapPin, Clock, FileText, ClipboardCheck, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import type { JobDetailContent } from '@/lib/api/careers';

interface JobDetailPageProps {
    job: JobDetailContent | any;
}

function formatTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
}

export default function JobDetailPage({ job }: JobDetailPageProps) {
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, []);

    const responsibilities = (job as any).responsibilities || [
        "Diagnostic des dommages et choix de la solution technique appropriée (réparation ou remplacement).",
        "Réalisation d'interventions en atelier mobile ou en centre technique.",
        "Calibrage des systèmes d'aide à la conduite (ADAS) après remplacement de pare-brise.",
        "Entretien des outils et gestion du stock de l'unité mobile."
    ];

    const qualifications = (job as any).qualifications || [
        "Expérience de 2 ans minimum en vitrage automobile ou carrosserie.",
        "Permis de conduire B valide.",
        "Formation technique (CAP/BEP mécanique ou carrosserie) appréciée.",
        "Sens du détail, rigueur et excellent relationnel client."
    ];

    const postedAt = (job as any).publishedAt ? formatTimeAgo((job as any).publishedAt) : 'Récemment';

    // Application Bar Component
    const ApplicationBar = () => (
        <div
            style={{
                backgroundColor: '#FFFFFF',
                padding: '16px 24px 24px',
                boxShadow: isFooterVisible ? 'none' : '0 -4px 20px rgba(0,0,0,0.05)'
            }}
        >
            <Link
                href={ROUTES.JOB_APPLY(String(job.id))}
                className="w-full relative flex items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{
                    height: '56px',
                    backgroundColor: '#FFD200',
                    borderRadius: '16px',
                    boxShadow: '0 8px 20px rgba(255, 210, 0, 0.25)'
                }}
            >
                <span
                    className="uppercase"
                    style={{ fontWeight: 800, fontSize: '16px', color: '#000000' }}
                >
                    Postuler Maintenant
                </span>

                {/* Arrow Icon Circle */}
                <div
                    className="absolute flex items-center justify-center"
                    style={{
                        right: '12px',
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        borderRadius: '50%'
                    }}
                >
                    <ArrowRight size={18} style={{ color: '#000000' }} />
                </div>
            </Link>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Job Header (White Area) */}
            <div
                style={{
                    backgroundColor: '#FFFFFF',
                    background: 'radial-gradient(circle at top right, rgba(255, 210, 0, 0.1), transparent 50%), #FFFFFF',
                    padding: '32px 24px'
                }}
            >
                {/* Tags Row */}
                <div className="flex items-center gap-2 mb-4">
                    <span
                        className="uppercase"
                        style={{
                            backgroundColor: '#FEF9C3',
                            color: '#854D0E',
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '4px 8px',
                            borderRadius: '6px'
                        }}
                    >
                        {job.contractType}
                    </span>
                    {job.workType && (
                        <span
                            className="uppercase"
                            style={{
                                backgroundColor: '#F3F4F6',
                                color: '#4B5563',
                                fontSize: '11px',
                                fontWeight: 700,
                                padding: '4px 8px',
                                borderRadius: '6px'
                            }}
                        >
                            {job.workType}
                        </span>
                    )}
                </div>

                {/* Job Title */}
                <h1
                    style={{
                        fontWeight: 800,
                        fontSize: '28px',
                        color: '#111827',
                        marginBottom: '12px'
                    }}
                >
                    {job.title}
                </h1>

                {/* Meta Data */}
                <div className="flex items-center gap-4" style={{ fontSize: '14px', fontWeight: 500, color: '#4B5563' }}>
                    <div className="flex items-center gap-2">
                        <MapPin size={16} style={{ color: '#FACC15' }} />
                        <span>{job.location}, MA</span>
                    </div>
                    <span style={{ color: '#D1D5DB' }}>•</span>
                    <div className="flex items-center gap-2">
                        <Clock size={16} style={{ color: '#FACC15' }} />
                        <span>{postedAt}</span>
                    </div>
                </div>
            </div>

            {/* Description Content (Grey Area) */}
            <div
                style={{
                    backgroundColor: '#F9FAFB',
                    borderTopLeftRadius: '32px',
                    borderTopRightRadius: '32px',
                    padding: '32px 24px',
                    marginTop: '-16px',
                    paddingBottom: isFooterVisible ? '32px' : '140px'
                }}
            >
                {/* Description du Poste Section */}
                <div className="flex items-center gap-3 mb-4">
                    <FileText size={20} style={{ color: '#FACC15' }} />
                    <h2 style={{ fontWeight: 800, fontSize: '18px', color: '#111827' }}>
                        Description du Poste
                    </h2>
                </div>

                {/* Body Text */}
                <p
                    style={{
                        fontSize: '15px',
                        fontWeight: 400,
                        color: '#4B5563',
                        lineHeight: 1.6,
                        marginBottom: '24px'
                    }}
                >
                    {job.description || `En tant que ${job.title} chez Pare-Brise Express, vous serez responsable de la réparation et du remplacement de vitrages automobiles sur tous types de véhicules, garantissant la sécurité et la satisfaction de nos clients.`}
                </p>

                {/* Bullet List */}
                <ul className="flex flex-col gap-4">
                    {responsibilities.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-6">
                            <div
                                className="flex-shrink-0"
                                style={{
                                    width: '6px',
                                    height: '6px',
                                    backgroundColor: '#FACC15',
                                    borderRadius: '50%',
                                    marginTop: '8px'
                                }}
                            />
                            <span style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6 }}>
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* Divider Line */}
                <hr
                    style={{
                        border: 'none',
                        height: '1px',
                        backgroundColor: '#E5E7EB',
                        margin: '32px 0'
                    }}
                />

                {/* Qualifications Requises Section */}
                <div className="flex items-center gap-3 mb-4">
                    <ClipboardCheck size={20} style={{ color: '#FACC15' }} />
                    <h2 style={{ fontWeight: 800, fontSize: '18px', color: '#111827' }}>
                        Qualifications Requises
                    </h2>
                </div>

                {/* Qualifications List */}
                <ul className="flex flex-col gap-4">
                    {qualifications.map((item: string, index: number) => (
                        <li key={index} className="flex items-start gap-6">
                            <div
                                className="flex-shrink-0"
                                style={{
                                    width: '6px',
                                    height: '6px',
                                    backgroundColor: '#FACC15',
                                    borderRadius: '50%',
                                    marginTop: '8px'
                                }}
                            />
                            <span style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6 }}>
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Sentinel element to detect when we reach the bottom */}
            <div ref={sentinelRef} style={{ height: '1px' }} />

            {/* Inline Application Bar (when footer visible) */}
            {isFooterVisible && <ApplicationBar />}

            {/* Fixed Application Bar (when scrolling) */}
            {!isFooterVisible && (
                <div
                    className="fixed bottom-0 left-0 right-0 z-50"
                >
                    <ApplicationBar />
                </div>
            )}
        </div>
    );
}
