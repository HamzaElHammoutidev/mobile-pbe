'use client';

import { Building2, MapPin, Mail, Server, Lock, ChevronRight, Phone } from 'lucide-react';
import Link from 'next/link';
import { ROUTES, PHONE_NUMBERS } from '@/config/routes';
import type { LegalPageContent } from '@/lib/api/legal';

interface LegalMentionsPageProps {
    content: LegalPageContent | any;
}

const DEFAULT_IDENTIFIERS = [
    { labelText: 'I.C.E', identifierValue: '001548796000088' },
    { labelText: 'R.C', identifierValue: '345678' },
    { labelText: 'IDENTIFIANT FISCAL', identifierValue: '15234567' },
    { labelText: 'TAXE PRO', identifierValue: '35791246' }
];

const DEFAULT_HOSTING = {
    providerName: 'Amazon Web Services (AWS)',
    legalEntity: 'Amazon.com Legal Department',
    streetAddr: '410 Terry Avenue North',
    cityStateZip: 'Seattle, WA 98109-5210, USA'
};

export default function LegalMentionsPage({ content }: LegalMentionsPageProps) {
    const companyIdentifiers = content.identifiers.length > 0
        ? content.identifiers.map((i: any) => ({ labelText: i.label, identifierValue: i.value }))
        : DEFAULT_IDENTIFIERS;

    const hostingDetails = content.hosting.providerName 
        ? content.hosting 
        : DEFAULT_HOSTING;

    return (
        <div className="bg-white">

            {/* Page Content */}
            <div style={{ backgroundColor: '#F9FAFB', minHeight: 'calc(100vh - 56px)' }}>


                {/* Section Header */}
                <div className="px-6 pt-10 pb-6">
                    <div style={{ marginBottom: '24px' }}>
                        <h1 style={{
                            fontFamily: 'inherit',
                            lineHeight: 1.2
                        }}>
                            <span
                                className="block"
                                style={{
                                    fontSize: '28px',
                                    fontWeight: 800,
                                    color: '#000000'
                                }}
                            >
                                INFORMATIONS
                            </span>
                            <span
                                className="inline-block"
                                style={{
                                    fontSize: '28px',
                                    fontWeight: 800,
                                    color: '#000000',
                                    backgroundColor: '#FFD200',
                                    paddingLeft: '4px',
                                    paddingRight: '4px',
                                    marginLeft: '-4px' // Optical alignment
                                }}
                            >
                                LÉGALES & CONFORMITÉ
                            </span>
                        </h1>
                        <p style={{
                            fontSize: '15px',
                            color: '#6B7280',
                            lineHeight: 1.5,
                            marginTop: '12px',
                            fontWeight: 400
                        }}>
                            Transparence totale sur notre identité et vos droits.
                        </p>
                    </div>
                </div>

                {/* Legal Entity Card */}
                <div className="px-6 pb-6">
                    <div
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '24px',
                            padding: '24px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                            borderLeft: '6px solid #FFD200',
                            position: 'relative'
                        }}
                    >
                        {/* Header Row */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            {/* Icon Box */}
                            <div
                                className="flex items-center justify-center flex-shrink-0"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#FFFBEB',
                                    borderRadius: '8px'
                                }}
                            >
                                <Building2 size={24} style={{ color: '#B45309' }} strokeWidth={2} />
                            </div>

                            <div className="flex-1">
                                {/* Label */}
                                <p style={{
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    color: '#000000',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    marginBottom: '16px'
                                }}>
                                    ÉDITEUR DU SITE
                                </p>

                                {/* Company Identity */}
                                <div>
                                    <h2 style={{
                                        fontSize: '18px',
                                        fontWeight: 800,
                                        color: '#000000',
                                        lineHeight: '1.2',
                                        marginBottom: '6px',
                                        textTransform: 'uppercase'
                                    }}>
                                        {content.companyInfo.name}
                                    </h2>

                                    <p style={{
                                        fontSize: '13px',
                                        color: '#6B7280', // Grey
                                        fontWeight: 400
                                    }}>
                                        {content.companyInfo.legalForm}
                                    </p>
                                    <p style={{
                                        fontSize: '13px',
                                        color: '#6B7280',
                                        fontWeight: 400
                                    }}>
                                        Capital social : <span style={{ fontWeight: 700, color: '#000000' }}>{content.companyInfo.capital}</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{
                            height: '1px',
                            backgroundColor: '#F3F4F6',
                            marginBottom: '24px'
                        }} />

                        {/* Details List */}
                        <div className="space-y-5">
                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div style={{ marginTop: '2px' }}>
                                    <MapPin size={20} style={{ color: '#9CA3AF' }} />
                                </div>
                                <div>
                                    <p style={{
                                        fontSize: '11px',
                                        color: '#9CA3AF',
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        letterSpacing: '0.5px',
                                        marginBottom: '2px'
                                    }}>
                                        SIÈGE SOCIAL
                                    </p>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#374151',
                                        lineHeight: 1.5
                                    }}>
                                        {content.companyInfo.address}
                                    </p>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="flex items-start gap-4">
                                <div style={{ marginTop: '2px' }}>
                                    <Mail size={20} style={{ color: '#9CA3AF' }} />
                                </div>
                                <div>
                                    <p style={{
                                        fontSize: '11px',
                                        color: '#9CA3AF',
                                        textTransform: 'uppercase',
                                        fontWeight: 600,
                                        letterSpacing: '0.5px',
                                        marginBottom: '2px'
                                    }}>
                                        CONTACT
                                    </p>
                                    <a
                                        href={`mailto:${content.companyInfo.email}`}
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 700,
                                            color: '#000000',
                                            textDecoration: 'none',
                                            borderBottom: '3px solid #FFD200',
                                            paddingBottom: '0px'
                                        }}
                                    >
                                        {content.companyInfo.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Identifiants Légaux Section */}
                <div className="px-6 pb-6">
                    {/* Section Separator */}
                    <div className="flex items-center gap-4 mb-6 mt-4">
                        <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
                        <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#9CA3AF',
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase'
                        }}>
                            IDENTIFIANTS LÉGAUX
                        </span>
                        <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
                    </div>

                    {/* Identifiers Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {companyIdentifiers.map((identifier: any, idx: number) => (
                            <div
                                key={idx}
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '16px',
                                    padding: '16px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                                }}
                            >
                                <p style={{
                                    fontSize: '10px',
                                    fontWeight: 700,
                                    color: '#9CA3AF',
                                    letterSpacing: '0.5px',
                                    marginBottom: '8px',
                                    textTransform: 'uppercase'
                                }}>
                                    {identifier.labelText}
                                </p>
                                <div style={{
                                    backgroundColor: '#F9FAFB',
                                    borderRadius: '8px',
                                    padding: '8px 0',
                                    textAlign: 'center'
                                }}>
                                    <p style={{
                                        fontSize: '13px',
                                        fontWeight: 700,
                                        color: '#000000',
                                        fontFamily: 'monospace'
                                    }}>
                                        {identifier.identifierValue}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Hébergement Card */}
                    <div style={{ marginTop: '24px' }}>
                        <div
                            style={{
                                backgroundColor: '#FFFFFF',
                                borderRadius: '24px',
                                padding: '24px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                            }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center">
                                    <div
                                        className="flex items-center justify-center"
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            backgroundColor: '#F3F4F6',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        <Server size={20} style={{ color: '#374151' }} strokeWidth={2} />
                                    </div>
                                    <span style={{
                                        fontSize: '14px',
                                        fontWeight: 800,
                                        color: '#000000',
                                        marginLeft: '12px',
                                        textTransform: 'uppercase'
                                    }}>
                                        HÉBERGEMENT
                                    </span>
                                </div>
                                {/* Status Indicator */}
                                <div style={{
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: '#10B981',
                                    borderRadius: '50%'
                                }} />
                            </div>

                            {/* Details */}
                            <div>
                                <p style={{
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    color: '#000000',
                                    marginTop: '16px',
                                    marginBottom: '4px'
                                }}>
                                    {hostingDetails.providerName}
                                </p>
                                <p style={{
                                    fontSize: '12px',
                                    color: '#6B7280',
                                    lineHeight: 1.5
                                }}>
                                    {hostingDetails.legalEntity}<br />
                                    {hostingDetails.streetAddr}<br />
                                    {hostingDetails.cityStateZip}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Données Personnelles Card */}
                <div className="px-6 pb-8">
                    <div
                        style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #F3F4F6',
                            borderRadius: '20px',
                            padding: '24px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                        }}
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="flex items-center justify-center"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    backgroundColor: '#FEF3C7',
                                    borderRadius: '10px'
                                }}
                            >
                                <Lock size={18} style={{ color: '#B45309' }} strokeWidth={2} />
                            </div>
                            <span
                                className="uppercase"
                                style={{
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    color: '#111827',
                                    letterSpacing: '0.5px'
                                }}
                            >
                                Données Personnelles
                            </span>
                        </div>

                        {/* CNDP Authorization */}
                        <div
                            className="mb-4 pl-12"
                            style={{
                                borderBottom: '1px solid #F3F4F6',
                                paddingBottom: '16px'
                            }}
                        >
                            <p
                                className="uppercase"
                                style={{
                                    fontSize: '10px',
                                    fontWeight: 600,
                                    color: '#EAB308',
                                    letterSpacing: '0.5px',
                                    marginBottom: '4px'
                                }}
                            >
                                Autorisation CNDP
                            </p>
                            <p
                                style={{
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    color: '#111827',
                                    fontFamily: 'monospace'
                                }}
                            >
                                {content.dataProtection.cndpAuthorization}
                            </p>
                        </div>

                        {/* Legal Text */}
                        <div className="pl-12">
                            <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, marginBottom: '16px' }}>
                                {content.dataProtection.text}
                            </p>

                            {/* Privacy Policy Link */}
                            <Link
                                href={ROUTES.PRIVACY_POLICY}
                                className="inline-flex items-center gap-2"
                                style={{ textDecoration: 'none' }}
                            >
                                <span
                                    style={{
                                        fontSize: '13px',
                                        fontWeight: 600,
                                        color: '#111827'
                                    }}
                                >
                                    Consulter notre politique de confidentialité
                                </span>
                                <ChevronRight size={16} style={{ color: '#EAB308' }} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Last Updated */}
                <div className="text-center pb-8">
                    <p style={{ fontSize: '12px', color: '#D1D5DB' }}>
                        Dernière mise à jour : {content.lastUpdated}
                    </p>
                </div>
            </div>
        </div>
    );
}
