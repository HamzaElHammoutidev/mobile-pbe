'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Award, Shield, ShieldCheck, User, Check, Zap, PiggyBank, ArrowRight, Leaf } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import type { EngagementPageContent } from '@/lib/api/engagement';

interface EngagementPageProps {
    content: EngagementPageContent;
}

const DEFAULT_PROMISES = [
    { id: 1, title: "Qualité du vitrage", description: "Nous nous engageons à offrir des prestations de haute qualité guidées par la quête de l’excellence.", imageUrl: "https://parebriseexpress.ma/images/Vitrage.jpg" },
    { id: 2, title: "Respect des normes de sécurité", description: "Nous respectons des normes strictes pour chaque intervention, avec un souci constant de sécurité et de durabilité.", imageUrl: "https://parebriseexpress.ma/images/respect-normes.jpeg" },
    { id: 3, title: "Rapidité d'exécution", description: "Toutes nos réparations sont réalisées dans les plus brefs délais pour vous remettre sur la route rapidement.", imageUrl: "https://parebriseexpress.ma/storage/WhatsApp%20Image%202024-11-15%20at%2016.49.58.jpeg" },
    { id: 4, title: "Des procédures simplifiées", description: "Nous optimisons chaque étape pour vous faire gagner du temps avec une gestion administrative complète.", imageUrl: "https://parebriseexpress.ma/images/procedure-simpl.jpeg" },
    { id: 5, title: "Qualité du service", description: "Une équipe d'experts à votre écoute pour une expérience client irréprochable.", imageUrl: "https://parebriseexpress.ma/images/qulite.jpg" }
];

const DEFAULT_BENEFITS = [
    { id: 1, title: "Gestion administrative complète", description: "Nous traitons directement avec votre assurance. Zéro papier, zéro tracas pour vous." },
    { id: 2, title: "Intervention en 1h chrono", description: "Service ultra-rapide pour vous remettre sur la route en toute sécurité le plus vite possible." },
    { id: 3, title: "Franchise offerte", description: "Nous offrons la franchise selon les conditions spécifiques de votre contrat d'assurance." }
];

const PROMISE_ICONS = [ShieldCheck, Shield, Zap, Check, User];
const BENEFIT_ICONS = [Check, Zap, PiggyBank];

// Display order for expertise grid: Qualité vitrage, Rapidité, Respect normes, Procédures, Qualité service
const EXPERTISE_ORDER = [0, 2, 1, 3, 4];

export default function EngagementPage({ content }: EngagementPageProps) {
    const rawPromises = (content.promises?.items ?? content.promises ?? []) as typeof DEFAULT_PROMISES;
    const promises = rawPromises.length > 0 ? rawPromises : DEFAULT_PROMISES;
    const ordered = EXPERTISE_ORDER.map((i) => promises[i]).filter(Boolean);
    const benefitsList = content.benefits?.items ?? [];
    const benefits = benefitsList.length > 0 ? benefitsList : DEFAULT_BENEFITS;

    return (
        <div>
            {/* Cinematic Hero Header */}
            <div
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: '4/3' }}
            >
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&q=80&w=800)',
                    }}
                />

                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))'
                    }}
                />

                {/* Content */}
                <div
                    className="absolute inset-0 flex flex-col justify-end items-center text-center"
                    style={{ padding: '40px 24px' }}
                >
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 mb-4"
                        style={{
                            backgroundColor: '#FFD200',
                            borderRadius: '999px',
                            padding: '6px 12px'
                        }}
                    >
                        <Award size={14} fill="#000000" style={{ color: '#000000' }} />
                        <span
                            className="uppercase"
                            style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                color: '#000000',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Confiance & Qualité
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 style={{ lineHeight: 1.1, marginBottom: '12px' }}>
                        <span
                            className="block"
                            style={{ fontWeight: 800, fontSize: '32px', color: '#FFFFFF' }}
                        >
                            L'engagement qui fait
                        </span>
                        <span
                            className="block"
                            style={{ fontWeight: 800, fontSize: '32px', color: '#FFD200' }}
                        >
                            la différence!
                        </span>
                    </h1>

                    {/* Description */}
                    <p
                        style={{
                            fontWeight: 400,
                            fontSize: '14px',
                            color: '#FFFFFF',
                            maxWidth: '320px'
                        }}
                    >
                        Pare-Brise Express s&apos;engage à vous offrir le meilleur service de vitrage automobile au Maroc.
                    </p>
                </div>
            </div>

            {/* "Notre Expertise en Images" — 2×2 + full-width; mobile: single column stacked */}
            <section
                data-section="notre-expertise"
                aria-label="Notre Expertise en Images"
                className="w-full"
                style={{
                    backgroundColor: '#FFFCF5',
                    padding: '24px 16px'
                }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <div
                        style={{
                            width: '4px',
                            height: '24px',
                            backgroundColor: '#FFD200',
                            borderRadius: '2px'
                        }}
                    />
                    <h2 style={{ fontWeight: 800, fontSize: '24px', color: '#111827', letterSpacing: '-0.5px' }}>
                        Notre Expertise en Images
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 w-full">
                    {ordered.slice(0, 4).map((promise, idx) => (
                        <div
                            key={(promise as { id?: number }).id ?? idx}
                            className="relative overflow-hidden group w-full min-h-[220px] aspect-[4/3] sm:min-h-0 sm:aspect-square rounded-2xl lg:rounded-3xl bg-gray-200"
                        >
                            {promise.imageUrl && (
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${promise.imageUrl})` }}
                                />
                            )}
                            {/* Gradient for better text legibility if needed, though design shows clean image. keeping faint one */}
                            <div
                                className="absolute inset-0"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent 30%)' }}
                            />

                            {/* Floating Label */}
                            <div
                                className="absolute bottom-6 left-6 right-auto inline-flex items-center px-4 py-2"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                    backdropFilter: 'blur(4px)',
                                    borderRadius: '4px',
                                    maxWidth: '85%'
                                }}
                            >
                                <h3 className="text-gray-900 font-bold text-base sm:text-lg leading-tight">
                                    {promise.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {ordered[4] && (
                    <div className="mt-4 lg:mt-6 relative overflow-hidden group w-full rounded-2xl lg:rounded-3xl bg-gray-200 min-h-[200px] h-56 sm:min-h-0 sm:h-64 lg:h-72">
                        {ordered[4].imageUrl && (
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage: `url(${ordered[4].imageUrl})`,
                                    backgroundPosition: 'center 40%'
                                }}
                            />
                        )}
                        <div
                            className="absolute inset-0"
                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent 30%)' }}
                        />
                        {/* Floating Label */}
                        <div
                            className="absolute bottom-6 left-6 right-auto inline-flex items-center px-4 py-2"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                backdropFilter: 'blur(4px)',
                                borderRadius: '4px',
                                maxWidth: '85%'
                            }}
                        >
                            <h3 className="text-gray-900 font-bold text-lg sm:text-xl leading-tight">
                                {ordered[4].title}
                            </h3>
                        </div>
                    </div>
                )}
            </section>



            {/* Certifications Section */}
            <div
                className="text-center"
                style={{
                    backgroundColor: '#FFFFFF',
                    padding: '40px 24px'
                }}
            >
                {/* Section Label */}
                <p
                    className="uppercase"
                    style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        color: '#9CA3AF',
                        marginBottom: '24px'
                    }}
                >
                    CERTIFICATION
                </p>

                <p style={{
                    fontSize: '14px',
                    color: '#4B5563',
                    marginBottom: '32px',
                    maxWidth: '800px',
                    margin: '0 auto 32px auto',
                    lineHeight: '1.6'
                }}>
                    Nous nous engageons à offrir des prestations de haute qualité guidées par la quête de l’excellence.
                    Certifiée <strong>ISO 9001 par IMANOR</strong>, nous appliquons des standards internationaux rigoureux pour garantir précision, fiabilité et amélioration continue dans chacune de nos interventions.
                    <br /><br />
                    De plus, nous sommes fiers d’être le premier réparateur de vitrage automobile au Maroc à obtenir le label <strong>SALAMATOUNA</strong>, une reconnaissance de notre engagement pour la sécurité, la conformité et la performance des vitrages.
                </p>

                {/* Badges Row */}
                <div className="flex items-start justify-center gap-10">
                    {/* Badge B: Imanor */}
                    <div className="flex flex-col items-center">
                        <div
                            className="flex items-center justify-center overflow-hidden"
                            style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: '#FFFFFF',
                                border: '2px solid #1F2937',
                                borderRadius: '50%'
                            }}
                        >
                            <Image
                                src="https://parebriseexpress.ma/images/assets/imanor-orig.png"
                                alt="Certification IMANOR"
                                width={64}
                                height={64}
                                className="object-cover"
                            />
                        </div>
                        <span
                            className="uppercase mt-2"
                            style={{ fontSize: '10px', fontWeight: 700, color: '#6B7280' }}
                        >
                            Imanor
                        </span>
                    </div>
                </div>
            </div>

            {/* Process Timeline Section */}
            <div
                style={{
                    backgroundColor: '#FFFFFF',
                    padding: '24px',
                    paddingTop: '32px'
                }}
            >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-8">
                    <div
                        style={{
                            width: '4px',
                            height: '24px',
                            backgroundColor: '#FFD200',
                            borderRadius: '2px'
                        }}
                    />
                    <h2 style={{ fontWeight: 800, fontSize: '20px', color: '#111827' }}>
                        DES PROCÉDURES SIMPLIFIÉES
                    </h2>
                    <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px', lineHeight: 1.5 }}>
                        Chez Pare-Brise Express, nous optimisons chaque étape pour vous faire gagner du temps. Toutes nos réparations sont réalisées dans les plus brefs délais et bénéficient d&apos;une garantie à vie.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative pl-4">
                    {/* Connector Line */}
                    <div
                        className="absolute"
                        style={{
                            left: '15px',
                            top: '32px',
                            bottom: '32px',
                            width: '1px',
                            backgroundColor: '#E5E7EB'
                        }}
                    />

                    {/* Step 1 */}
                    <div className="flex items-start gap-4 pb-8">
                        <div
                            className="flex items-center justify-center flex-shrink-0 relative z-10"
                            style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#FFD200',
                                borderRadius: '50%'
                            }}
                        >
                            <span style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>1</span>
                        </div>
                        <div className="flex-1 pt-1">
                            <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#111827', marginBottom: '4px' }}>
                                Déclarez le bris
                            </h3>
                            <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.5 }}>
                                Contactez-nous simplement via l&apos;application mobile ou par téléphone.
                            </p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex items-start gap-4 pb-8">
                        <div
                            className="flex items-center justify-center flex-shrink-0 relative z-10"
                            style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#FFD200',
                                borderRadius: '50%'
                            }}
                        >
                            <span style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>2</span>
                        </div>
                        <div className="flex-1 pt-1">
                            <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#111827', marginBottom: '4px' }}>
                                Gestion Dossier
                            </h3>
                            <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.5 }}>
                                Nous gérons tout avec votre assureur pour obtenir l&apos;accord de prise en charge.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex items-start gap-4">
                        <div
                            className="flex items-center justify-center flex-shrink-0 relative z-10"
                            style={{
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#FFD200',
                                borderRadius: '50%'
                            }}
                        >
                            <span style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>3</span>
                        </div>
                        <div className="flex-1 pt-1">
                            <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#111827', marginBottom: '4px' }}>
                                Réparation immédiate
                            </h3>
                            <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.5 }}>
                                En atelier ou à domicile, nos experts interviennent pour réparer les dégâts.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Service Promo Card */}
            <div style={{ padding: '24px', backgroundColor: '#FFFFFF' }}>
                <div
                    className="relative overflow-hidden"
                    style={{
                        aspectRatio: '4/5',
                        borderRadius: '24px'
                    }}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800)'
                        }}
                    />

                    {/* Gradient Overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(to top, #1a1a1a 0%, #29291f 40%, transparent 100%)'
                        }}
                    />

                    {/* Top Badge */}
                    <div
                        className="absolute uppercase"
                        style={{
                            top: '16px',
                            right: '16px',
                            backgroundColor: '#FFD200',
                            borderRadius: '999px',
                            padding: '6px 12px',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#000000',
                            letterSpacing: '0.5px'
                        }}
                    >
                        Service Gratuit
                    </div>

                    {/* Content Stack */}
                    <div
                        className="absolute inset-0 flex flex-col justify-end"
                        style={{ padding: '24px' }}
                    >
                        {/* Label Group */}
                        <div className="flex items-center gap-3">
                            <div
                                className="flex items-center justify-center"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: 'rgba(77, 75, 48, 0.8)',
                                    borderRadius: '8px'
                                }}
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#FFD200" strokeWidth="2">
                                    <rect x="1" y="3" width="15" height="13" rx="2" />
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                    <circle cx="5.5" cy="18.5" r="2.5" fill="#FFD200" stroke="#FFD200" />
                                    <circle cx="18.5" cy="18.5" r="2.5" fill="#FFD200" stroke="#FFD200" />
                                </svg>
                            </div>
                            <span
                                className="uppercase"
                                style={{
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    color: '#FFD200',
                                    letterSpacing: '1px'
                                }}
                            >
                                Atelier Mobile
                            </span>
                        </div>

                        {/* Headline */}
                        <h2
                            style={{
                                fontWeight: 700,
                                fontSize: '28px',
                                color: '#FFFFFF',
                                marginTop: '16px'
                            }}
                        >
                            On vient chez vous !
                        </h2>

                        {/* Description */}
                        <div className="flex flex-col gap-4 mb-6">
                            <div>
                                <h3 style={{ color: '#FFD200', fontSize: '14px', fontWeight: 700, marginBottom: '2px' }}>Service entièrement gratuit</h3>
                                <p style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: 1.4 }}>
                                    Que ce soit pour une réparation ou un remplacement, notre intervention à domicile ou sur votre lieu de travail est totalement gratuite.
                                </p>
                            </div>
                            <div>
                                <h3 style={{ color: '#FFD200', fontSize: '14px', fontWeight: 700, marginBottom: '2px' }}>Rapide et pratique</h3>
                                <p style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: 1.4 }}>
                                    Un bris de glace? Prenez rendez-vous dès maintenant et sélectionnez le créneau qui vous convient le mieux!
                                </p>
                            </div>
                            <div>
                                <h3 style={{ color: '#FFD200', fontSize: '14px', fontWeight: 700, marginBottom: '2px' }}>Adapté à tous les vitrages</h3>
                                <p style={{ fontSize: '13px', color: '#D1D5DB', lineHeight: 1.4 }}>
                                    Nos experts interviennent sur tous types de vitrages, à l&apos;exception des optiques de phares et des toits panoramiques.
                                </p>
                            </div>
                        </div>

                        {/* Action Button */}
                        <Link
                            href={`${ROUTES.BOOKING}?type=mobile`}
                            className="w-full flex items-center justify-center gap-2 transition-all hover:bg-opacity-80 active:scale-[0.98]"
                            style={{
                                height: '56px',
                                backgroundColor: 'rgba(53, 53, 43, 0.6)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '16px'
                            }}
                        >
                            <span style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF' }}>
                                Réserver un Atelier Mobile
                            </span>
                            <ArrowRight size={20} style={{ color: '#FFFFFF' }} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
