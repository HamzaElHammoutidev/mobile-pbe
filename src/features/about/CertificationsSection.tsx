'use client';

import { Award, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import type { AboutPageContent } from '@/lib/api/about';

interface CertificationsSectionProps {
    content: AboutPageContent['certifications'];
}

export default function CertificationsSection({ content }: CertificationsSectionProps) {
    return (
        <section className="bg-[#F9FAFB] py-10 px-4">
            <div className="max-w-[380px] mx-auto">

                {/* Section Header */}
                <div className="mb-8">
                    <h2
                        style={{
                            fontWeight: 800,
                            fontSize: '26px',
                            color: '#0F172A',
                            marginBottom: '12px'
                        }}
                    >
                        {content.title}
                    </h2>
                    <p
                        style={{
                            fontWeight: 400,
                            fontSize: '15px',
                            lineHeight: 1.5,
                            color: '#6B7280',
                            maxWidth: '90%'
                        }}
                    >
                        {content.subtitle}
                    </p>
                </div>

                {/* Certification Cards Grid */}
                <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                    {content.items.map((cert, index) => (
                        <div
                            key={cert.id}
                            className="bg-white p-6"
                            style={{
                                border: '1px solid #E5E7EB',
                                borderRadius: '16px'
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="flex items-center justify-center"
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    backgroundColor: '#FEF9C3'
                                }}
                            >
                                {cert.iconUrl ? (
                                    <Image
                                        src={cert.iconUrl}
                                        alt={cert.name}
                                        width={24}
                                        height={24}
                                    />
                                ) : index === 0 ? (
                                    <Award size={24} style={{ color: '#B45309' }} fill="#B45309" />
                                ) : (
                                    <ShieldCheck size={24} style={{ color: '#B45309' }} fill="#B45309" />
                                )}
                            </div>

                            {/* Title */}
                            <h3
                                style={{
                                    fontWeight: 700,
                                    fontSize: '16px',
                                    color: '#111827',
                                    marginTop: '16px',
                                    marginBottom: '4px'
                                }}
                            >
                                {cert.name}
                            </h3>

                            {/* Description */}
                            <p
                                style={{
                                    fontWeight: 400,
                                    fontSize: '13px',
                                    color: '#4B5563',
                                    lineHeight: 1.4
                                }}
                            >
                                {cert.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
