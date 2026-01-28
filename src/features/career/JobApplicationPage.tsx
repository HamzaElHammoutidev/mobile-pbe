'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Mail, Phone, Upload, Send, Loader2, CheckCircle } from 'lucide-react';
import { ROUTES } from '@/config/routes';

interface ApplicationFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cv: File | null;
    coverLetter: File | null;
}

export default function JobApplicationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const jobId = searchParams.get('jobId') || '';
    
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState<ApplicationFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cv: null,
        coverLetter: null,
    });
    
    const sentinelRef = useRef<HTMLDivElement>(null);
    const cvInputRef = useRef<HTMLInputElement>(null);
    const coverLetterInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Redirect after showing success
        setTimeout(() => {
            router.push(ROUTES.CAREERS);
        }, 2000);
    };

    const handleFileUpload = (type: 'cv' | 'coverLetter') => {
        const inputRef = type === 'cv' ? cvInputRef : coverLetterInputRef;
        inputRef.current?.click();
    };

    const handleFileChange = (type: 'cv' | 'coverLetter', file: File | null) => {
        setFormData(prev => ({ ...prev, [type]: file }));
    };

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

    // Submit Bar Component
    const SubmitBar = () => (
        <div
            style={{
                backgroundColor: '#FFFFFF',
                padding: '16px 24px 24px',
                boxShadow: isFooterVisible ? 'none' : '0 -4px 20px rgba(0,0,0,0.05)'
            }}
        >
            <button
                type="submit"
                form="application-form"
                disabled={isSubmitting || isSubmitted}
                className="w-full flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                    height: '56px',
                    backgroundColor: isSubmitted ? '#10B981' : '#FFD200',
                    borderRadius: '16px',
                    boxShadow: '0 4px 15px rgba(255, 210, 0, 0.3)'
                }}
            >
                {isSubmitting ? (
                    <>
                        <Loader2 size={18} className="animate-spin" style={{ color: '#000000' }} />
                        <span className="uppercase" style={{ fontWeight: 700, fontSize: '14px', color: '#000000' }}>
                            Envoi en cours...
                        </span>
                    </>
                ) : isSubmitted ? (
                    <>
                        <CheckCircle size={18} style={{ color: '#FFFFFF' }} />
                        <span className="uppercase" style={{ fontWeight: 700, fontSize: '14px', color: '#FFFFFF' }}>
                            Candidature envoyée !
                        </span>
                    </>
                ) : (
                    <>
                        <span className="uppercase" style={{ fontWeight: 700, fontSize: '14px', color: '#000000' }}>
                            Envoyer Ma Candidature
                        </span>
                        <Send size={18} style={{ color: '#000000' }} />
                    </>
                )}
            </button>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Context Header */}
            <div
                style={{
                    backgroundColor: '#FFFFFF',
                    padding: '24px'
                }}
            >
                <div className="flex items-center gap-4">
                    {/* Icon Box */}
                    <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#FFFBEB',
                            borderRadius: '12px'
                        }}
                    >
                        <User size={24} style={{ color: '#FACC15' }} />
                    </div>

                    {/* Text Stack */}
                    <div>
                        <p
                            className="uppercase"
                            style={{
                                fontSize: '10px',
                                fontWeight: 700,
                                color: '#9CA3AF',
                                marginBottom: '2px'
                            }}
                        >
                            Poste Visé
                        </p>
                        <h1 style={{ fontWeight: 700, fontSize: '20px', color: '#111827', marginBottom: '2px' }}>
                            Technicien Vitrage
                        </h1>
                        <p style={{ fontSize: '13px', color: '#6B7280' }}>
                            Casablanca • CDI
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Section */}
            <form
                id="application-form"
                onSubmit={handleSubmit}
                style={{
                    backgroundColor: '#F9FAFB',
                    padding: '24px',
                    borderTopLeftRadius: '24px',
                    borderTopRightRadius: '24px',
                    marginTop: '-8px',
                    paddingBottom: isFooterVisible ? '24px' : '140px'
                }}
            >
                {/* Section 1: Personal Information */}
                <div className="mb-8">
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className="flex items-center justify-center"
                            style={{
                                width: '24px',
                                height: '24px',
                                backgroundColor: '#111827',
                                borderRadius: '50%'
                            }}
                        >
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>1</span>
                        </div>
                        <h2
                            className="uppercase"
                            style={{
                                fontSize: '12px',
                                fontWeight: 700,
                                color: '#111827',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Informations Personnelles
                        </h2>
                    </div>

                    {/* Name Row */}
                    <div className="flex gap-3 mb-4">
                        <div className="flex-1">
                            <label
                                style={{
                                    display: 'block',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: '#374151',
                                    marginBottom: '8px'
                                }}
                            >
                                Prénom
                            </label>
                            <input
                                type="text"
                                placeholder="Youssef"
                                style={{
                                    width: '100%',
                                    height: '52px',
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    fontSize: '15px',
                                    color: '#111827'
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <label
                                style={{
                                    display: 'block',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: '#374151',
                                    marginBottom: '8px'
                                }}
                            >
                                Nom
                            </label>
                            <input
                                type="text"
                                placeholder="Alami"
                                style={{
                                    width: '100%',
                                    height: '52px',
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    fontSize: '15px',
                                    color: '#111827'
                                }}
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label
                            style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#374151',
                                marginBottom: '8px'
                            }}
                        >
                            Adresse Email
                        </label>
                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute"
                                style={{
                                    left: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#9CA3AF'
                                }}
                            />
                            <input
                                type="email"
                                placeholder="youssef.alami@email.com"
                                style={{
                                    width: '100%',
                                    height: '52px',
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px',
                                    padding: '16px 16px 16px 48px',
                                    fontSize: '15px',
                                    color: '#111827'
                                }}
                            />
                        </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#374151',
                                marginBottom: '8px'
                            }}
                        >
                            Téléphone
                        </label>
                        <div className="relative">
                            <Phone
                                size={18}
                                className="absolute"
                                style={{
                                    left: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: '#9CA3AF'
                                }}
                            />
                            <input
                                type="tel"
                                placeholder="+212 6 00 00 00 00"
                                style={{
                                    width: '100%',
                                    height: '52px',
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '12px',
                                    padding: '16px 16px 16px 48px',
                                    fontSize: '15px',
                                    color: '#111827'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Section 2: Documents */}
                <div>
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <div
                            className="flex items-center justify-center"
                            style={{
                                width: '24px',
                                height: '24px',
                                backgroundColor: '#111827',
                                borderRadius: '50%'
                            }}
                        >
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF' }}>2</span>
                        </div>
                        <h2
                            className="uppercase"
                            style={{
                                fontSize: '12px',
                                fontWeight: 700,
                                color: '#111827',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Documents
                        </h2>
                    </div>

                    {/* CV Upload */}
                    <div className="mb-4">
                        <label
                            style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#374151',
                                marginBottom: '8px'
                            }}
                        >
                            CV / Resume
                        </label>
                        <div
                            className="flex flex-col items-center justify-center cursor-pointer"
                            style={{
                                backgroundColor: '#FFFFFF',
                                border: '2px dashed #D1D5DB',
                                borderRadius: '16px',
                                padding: '32px 16px'
                            }}
                        >
                            <div
                                className="flex items-center justify-center mb-3"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#F3F4F6',
                                    borderRadius: '50%'
                                }}
                            >
                                <Upload size={20} style={{ color: '#6B7280' }} />
                            </div>
                            <p style={{ fontWeight: 700, fontSize: '14px', color: '#111827', marginBottom: '4px' }}>
                                Appuyez pour importer votre CV
                            </p>
                            <p style={{ fontSize: '12px', color: '#9CA3AF' }}>
                                PDF, DOCX jusqu&apos;à 5MB
                            </p>
                        </div>
                    </div>

                    {/* Cover Letter Upload (Optional) */}
                    <div>
                        <label
                            style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: 600,
                                color: '#374151',
                                marginBottom: '8px'
                            }}
                        >
                            Lettre de motivation <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(Optionnel)</span>
                        </label>
                        <div
                            className="flex flex-col items-center justify-center cursor-pointer"
                            style={{
                                backgroundColor: '#FFFFFF',
                                border: '2px dashed #D1D5DB',
                                borderRadius: '16px',
                                padding: '24px 16px'
                            }}
                        >
                            <div
                                className="flex items-center justify-center mb-2"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: '#F3F4F6',
                                    borderRadius: '50%'
                                }}
                            >
                                <Upload size={16} style={{ color: '#6B7280' }} />
                            </div>
                            <p style={{ fontWeight: 600, fontSize: '13px', color: '#6B7280' }}>
                                Ajouter un fichier
                            </p>
                        </div>
                    </div>
                </div>
            </form>

            {/* Sentinel element to detect when we reach the bottom */}
            <div ref={sentinelRef} style={{ height: '1px' }} />

            {/* Inline Submit Bar (when footer visible) */}
            {isFooterVisible && <SubmitBar />}

            {/* Fixed Submit Bar (when scrolling) */}
            {!isFooterVisible && (
                <div className="fixed bottom-0 left-0 right-0 z-50">
                    <SubmitBar />
                </div>
            )}
        </div>
    );
}
