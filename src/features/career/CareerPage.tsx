'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Award, ArrowDown, ArrowUpRight, ArrowRight, GraduationCap, TrendingUp, Wrench, MapPin, Rocket } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import type { CareersPageContent } from '@/lib/api/careers';

interface CareerPageProps {
    jobs: CareersPageContent['jobs'];
    benefits: CareersPageContent['benefits'];
}

const DEFAULT_JOBS = [
    { id: 1, title: 'Technician Vitrage', location: 'Casablanca', category: 'CDI', isNew: true, isUrgent: false },
    { id: 2, title: 'Customer Service', location: 'Rabat', category: 'CDD', isNew: false, isUrgent: true },
    { id: 3, title: 'Mobile Workshop Lead', location: 'Tangier', category: 'CDI', isNew: false, isUrgent: false },
];

const DEFAULT_BENEFITS = [
    { id: 1, title: "PBE Academy", description: "Formation continue et certification technique reconnue." },
    { id: 2, title: "Stabilité & Carrière", description: "CDI, avantages sociaux et opportunités d'évolution rapides." },
    { id: 3, title: "Outils High-Tech", description: "Travaillez avec des équipements de pointe et ateliers mobiles." },
];

const BENEFIT_ICONS = [GraduationCap, TrendingUp, Wrench];

export default function CareerPage({ jobs, benefits }: CareerPageProps) {
    const jobListings = jobs.length > 0 ? jobs : DEFAULT_JOBS;
    const benefitItems = benefits.length > 0 ? benefits : DEFAULT_BENEFITS;

    const jobListingsRef = useRef<HTMLDivElement>(null);

    const scrollToJobListings = () => {
        jobListingsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div
            style={{
                backgroundColor: '#FFFFFF',
                background: 'radial-gradient(circle at top right, rgba(255, 210, 0, 0.15), transparent 40%), #FFFFFF'
            }}
        >
            {/* Header Group */}
            <div style={{ padding: '32px 24px 0' }}>
                {/* Recruitment Badge */}
                <div
                    className="inline-flex items-center gap-2 mb-4"
                    style={{
                        backgroundColor: '#FFFBEB',
                        border: '1px solid #FEF3C7',
                        borderRadius: '999px',
                        padding: '6px 12px'
                    }}
                >
                    <div
                        style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: '#FACC15',
                            borderRadius: '50%'
                        }}
                    />
                    <span
                        className="uppercase"
                        style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#000000',
                            letterSpacing: '0.5px'
                        }}
                    >
                        Recrutement 2025
                    </span>
                </div>

                {/* Main Headline */}
                <h1
                    style={{
                        fontWeight: 800,
                        fontSize: '36px',
                        lineHeight: 1.1,
                        color: '#0F172A',
                        marginBottom: '16px'
                    }}
                >
                    Devenez un Expert du Vitrage.
                </h1>

                {/* Subtitle */}
                <p
                    style={{
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: 1.5,
                        color: '#4B5563',
                        marginBottom: '32px'
                    }}
                >
                    Rejoignez le leader marocain de la réparation de pare-brise et construisez votre carrière.
                </p>
            </div>

            {/* Hero Visual */}
            <div style={{ padding: '0 24px 24px' }}>
                <div
                    className="relative overflow-hidden"
                    style={{
                        aspectRatio: '4/3',
                        borderRadius: '24px'
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&q=80&w=800"
                        alt="Expert au travail"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay Badge */}
                    <div
                        className="absolute flex items-center gap-2"
                        style={{
                            bottom: '16px',
                            left: '16px',
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            backdropFilter: 'blur(4px)',
                            borderRadius: '999px',
                            padding: '8px 16px'
                        }}
                    >
                        <Award size={16} fill="#FFFFFF" style={{ color: '#FFFFFF' }} />
                        <span style={{ fontWeight: 600, fontSize: '12px', color: '#FFFFFF' }}>
                            Certifié Excellence
                        </span>
                    </div>
                </div>
            </div>

            {/* Primary CTA */}
            <div style={{ padding: '0 24px 32px' }}>
                <button
                    onClick={scrollToJobListings}
                    className="w-full flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                        height: '56px',
                        backgroundColor: '#FFD200',
                        borderRadius: '16px',
                        boxShadow: '0 4px 15px rgba(255, 210, 0, 0.3)'
                    }}
                >
                    <span style={{ fontWeight: 700, fontSize: '16px', color: '#000000' }}>
                        Voir les offres
                    </span>
                    <ArrowDown size={20} style={{ color: '#000000' }} />
                </button>
            </div>

            {/* Benefits Section */}
            <div style={{ backgroundColor: '#FFFFFF', padding: '32px 24px 24px' }}>
                {/* Section Header */}
                <h2
                    style={{
                        fontWeight: 800,
                        fontSize: '24px',
                        color: '#111827',
                        marginBottom: '8px'
                    }}
                >
                    Pourquoi nous rejoindre ?
                </h2>
                <p
                    style={{
                        fontWeight: 400,
                        fontSize: '15px',
                        color: '#6B7280',
                        marginBottom: '24px'
                    }}
                >
                    Les avantages de travailler chez PBE.
                </p>

                {/* Benefit Cards */}
                <div className="flex flex-col gap-4">
                    {benefitItems.map((benefit, index) => {
                        const IconComponent = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
                        return (
                            <div
                                key={benefit.id}
                                className="flex items-start gap-4"
                                style={{
                                    backgroundColor: '#F9FAFB',
                                    borderRadius: '20px',
                                    padding: '24px'
                                }}
                            >
                                {/* Icon Container */}
                                <div
                                    className="flex items-center justify-center flex-shrink-0"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '12px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                    }}
                                >
                                    <IconComponent size={24} style={{ color: '#FACC15' }} />
                                </div>

                                {/* Text */}
                                <div className="flex-1">
                                    <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#111827', marginBottom: '4px' }}>
                                        {benefit.title}
                                    </h3>
                                    <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.5 }}>
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Job Listings Section */}
            <div ref={jobListingsRef} style={{ backgroundColor: '#FDFDFD', padding: '32px 24px' }}>
                {/* Section Header */}
                <h2
                    style={{
                        fontWeight: 800,
                        fontSize: '24px',
                        color: '#111827',
                        marginBottom: '20px'
                    }}
                >
                    Open Positions
                </h2>

                {/* Job Cards */}
                <div className="flex flex-col gap-3">
                    {jobListings.map((job) => {
                        const badge = job.isNew ? 'new' : job.isUrgent ? 'urgent' : null;
                        return (
                            <Link
                                key={job.id}
                                href={ROUTES.JOB_DETAIL(String(job.id))}
                                className="flex items-start justify-between transition-all hover:shadow-md hover:border-yellow-200"
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '20px',
                                    padding: '20px',
                                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                                }}
                            >
                                <div>
                                    {badge && (
                                        <span
                                            className="inline-block uppercase mb-2"
                                            style={{
                                                backgroundColor: badge === 'new' ? '#FEF9C3' : '#F3F4F6',
                                                color: badge === 'new' ? '#854D0E' : '#374151',
                                                fontSize: '10px',
                                                fontWeight: 700,
                                                padding: '4px 8px',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            {badge === 'new' ? 'New' : 'Urgent'}
                                        </span>
                                    )}
                                    <h3 style={{ fontWeight: 800, fontSize: '18px', color: '#111827', marginBottom: '4px' }}>
                                        {job.title}
                                    </h3>
                                    <div className="flex items-center gap-1" style={{ fontSize: '13px', fontWeight: 500, color: '#6B7280' }}>
                                        <MapPin size={14} style={{ color: '#9CA3AF' }} />
                                        <span>{job.location}</span>
                                        <span>•</span>
                                        <span>{job.category}</span>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center justify-center flex-shrink-0"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: '#F9FAFB',
                                        borderRadius: '50%'
                                    }}
                                >
                                    <ArrowUpRight size={18} style={{ color: '#000000' }} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Spontaneous Application CTA */}
            <div style={{ padding: '0 24px 32px', backgroundColor: '#FDFDFD' }}>
                <div
                    style={{
                        background: 'linear-gradient(135deg, #2A2A20 0%, #111111 100%)',
                        borderRadius: '24px',
                        padding: '24px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                    }}
                >
                    {/* Icon Box */}
                    <div
                        className="flex items-center justify-center mb-4"
                        style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: '14px'
                        }}
                    >
                        <Rocket size={24} style={{ color: '#FFD200' }} />
                    </div>

                    {/* Headline */}
                    <h3
                        style={{
                            fontWeight: 800,
                            fontSize: '22px',
                            color: '#FFFFFF',
                            marginBottom: '8px'
                        }}
                    >
                        Fast Track Application
                    </h3>

                    {/* Description */}
                    <p
                        style={{
                            fontWeight: 400,
                            fontSize: '15px',
                            lineHeight: 1.5,
                            color: '#9CA3AF',
                            marginBottom: '24px'
                        }}
                    >
                        Don&apos;t see the right role? Send us your CV in 30 seconds and we&apos;ll find a match.
                    </p>

                    {/* Apply Button */}
                    <Link
                        href={ROUTES.JOB_APPLY()}
                        className="w-full flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                            height: '56px',
                            backgroundColor: '#FFD200',
                            borderRadius: '16px'
                        }}
                    >
                        <span style={{ fontWeight: 700, fontSize: '16px', color: '#000000' }}>
                            Apply Now
                        </span>
                        <ArrowRight size={20} style={{ color: '#000000' }} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
