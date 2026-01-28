'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Mail, Car, Navigation, User, Loader2, CheckCircle } from 'lucide-react';
import { ROUTES, PHONE_NUMBERS } from '@/config/routes';
import { openPhoneDialer, openWhatsApp, openDirections } from '@/hooks/useExternalNavigation';
import type { ContactPageContent } from '@/lib/api/contact';
import { submitContactForm } from '@/lib/api/contact';

interface ContactFormData {
    fullName: string;
    phoneNumber: string;
    vehicleModel: string;
    message: string;
}

interface ContactPageProps {
    content: ContactPageContent | any;
}

export default function ContactPage({ content }: ContactPageProps) {
    const nearestCenter = content.centres[0] || {
        latitude: 33.5731,
        longitude: -7.5898,
        name: 'Pare-Brise Express Casablanca',
    };
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState<ContactFormData>({
        fullName: '',
        phoneNumber: '',
        vehicleModel: '',
        message: '',
    });

    const handleCallSupport = () => {
        openPhoneDialer(content.contactInfo.phone || PHONE_NUMBERS.MAIN);
    };

    const handleWhatsApp = () => {
        const whatsappNumber = content.contactInfo.whatsapp || '212600000000';
        openWhatsApp(whatsappNumber, content.page.whatsappMessage || 'Bonjour, j\'ai besoin d\'aide pour mon pare-brise.');
    };

    const handleGetDirections = () => {
        openDirections({
            latitude: nearestCenter.latitude,
            longitude: nearestCenter.longitude,
            label: nearestCenter.name,
        });
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await submitContactForm({
                name: formData.fullName,
                email: '',
                phone: formData.phoneNumber,
                subject: `Demande concernant: ${formData.vehicleModel}`,
                message: formData.message,
            });
            
            setIsSubmitted(true);
            
            // Reset form after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({ fullName: '', phoneNumber: '', vehicleModel: '', message: '' });
            }, 3000);
        } catch (error) {
            console.error('Failed to submit form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '24px' }}>
            {/* Hero Headline */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '26px', color: '#111827', lineHeight: 1.3 }}>
                    <span style={{ fontWeight: 500 }}>{content.page.title?.split('\n')[0] || 'Comment pouvons-nous'}</span>
                    <br />
                    <span style={{ fontWeight: 800 }}>{content.page.title?.split('\n')[1] || 'vous aider ?'}</span>
                </h1>
            </div>

            {/* Quick Actions Grid */}
            <div className="mb-6">
                {/* Row 1: Two Square Cards */}
                <div className="flex gap-3 mb-3">
                    {/* Call Support */}
                    <button
                        onClick={handleCallSupport}
                        className="flex-1 flex flex-col text-left transition-all hover:shadow-md active:scale-[0.98]"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '20px',
                            padding: '16px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}
                    >
                        <div
                            className="flex items-center justify-center mb-3"
                            style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#FFD200',
                                borderRadius: '50%'
                            }}
                        >
                            <Phone size={20} style={{ color: '#000000' }} />
                        </div>
                        <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '2px' }}>Urgent?</p>
                        <p style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Call Support</p>
                    </button>

                    {/* WhatsApp */}
                    <button
                        onClick={handleWhatsApp}
                        className="flex-1 flex flex-col text-left transition-all hover:shadow-md active:scale-[0.98]"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '20px',
                            padding: '16px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                        }}
                    >
                        <div
                            className="flex items-center justify-center mb-3"
                            style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#FFD200',
                                borderRadius: '50%'
                            }}
                        >
                            <MessageCircle size={20} style={{ color: '#000000' }} />
                        </div>
                        <p style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '2px' }}>Chat now</p>
                        <p style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>WhatsApp</p>
                    </button>
                </div>

                {/* Row 2: Email Quote */}
                <div
                    className="flex items-center gap-4 mb-3"
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '20px',
                        padding: '16px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                >
                    <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#F3F4F6',
                            borderRadius: '50%'
                        }}
                    >
                        <Mail size={20} style={{ color: '#374151' }} />
                    </div>
                    <div>
                        <p style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Email Quote</p>
                        <p style={{ fontSize: '13px', color: '#9CA3AF' }}>Get a price estimate</p>
                    </div>
                </div>

                {/* Row 3: Mobile Unit */}
                <div
                    className="flex items-center gap-4"
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '20px',
                        padding: '16px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                >
                    <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#F3F4F6',
                            borderRadius: '50%'
                        }}
                    >
                        <Car size={20} style={{ color: '#374151' }} />
                    </div>
                    <div>
                        <p style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Mobile Unit</p>
                        <p style={{ fontSize: '13px', color: '#9CA3AF' }}>We come to you</p>
                    </div>
                </div>
            </div>

            {/* Find a Workshop Section */}
            <div className="mb-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827' }}>
                        Find a Workshop
                    </h2>
                    <Link href={ROUTES.CENTERS} style={{ fontSize: '13px', color: '#9CA3AF' }}>
                        View List &gt;
                    </Link>
                </div>

                {/* Map Card */}
                <div
                    className="relative overflow-hidden"
                    style={{
                        height: '160px',
                        borderRadius: '24px'
                    }}
                >
                    {/* Map iframe */}
                    <iframe
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-7.7%2C33.5%2C-7.4%2C33.7&layer=mapnik"
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            filter: 'sepia(15%) saturate(90%)'
                        }}
                        title="Carte Pare-Brise Express"
                        loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 70%)'
                        }}
                    />

                    {/* CTA Button */}
                    <div
                        className="absolute left-4 right-4"
                        style={{ bottom: '16px' }}
                    >
                        <button
                            onClick={handleGetDirections}
                            className="w-full flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                                height: '44px',
                                backgroundColor: '#FFD200',
                                borderRadius: '12px'
                            }}
                        >
                            <Navigation size={18} style={{ color: '#000000' }} />
                            <span style={{ fontWeight: 700, fontSize: '14px', color: '#000000' }}>
                                Get Directions to Nearest
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Send a Request Form */}
            <div className="mb-6">
                <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', marginBottom: '16px' }}>
                    Send a Request
                </h2>

                <form
                    onSubmit={handleFormSubmit}
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '24px',
                        padding: '24px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
                    }}
                >
                    {/* Full Name */}
                    <div className="mb-4">
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                            Full Name
                        </label>
                        <div className="relative">
                            <User
                                size={18}
                                className="absolute"
                                style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}
                            />
                            <input
                                type="text"
                                placeholder="Your Name"
                                style={{
                                    width: '100%',
                                    height: '50px',
                                    backgroundColor: '#F9FAFB',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '0 16px 0 48px',
                                    fontSize: '15px',
                                    color: '#111827'
                                }}
                            />
                        </div>
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                            Phone Number
                        </label>
                        <div className="relative">
                            <Phone
                                size={18}
                                className="absolute"
                                style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}
                            />
                            <input
                                type="tel"
                                placeholder="06 XX XX XX XX"
                                style={{
                                    width: '100%',
                                    height: '50px',
                                    backgroundColor: '#F9FAFB',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '0 16px 0 48px',
                                    fontSize: '15px',
                                    color: '#111827'
                                }}
                            />
                        </div>
                    </div>

                    {/* Vehicle Model */}
                    <div className="mb-4">
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                            Vehicle Model <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(Optional)</span>
                        </label>
                        <div className="relative">
                            <Car
                                size={18}
                                className="absolute"
                                style={{ left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}
                            />
                            <input
                                type="text"
                                placeholder="e.g. Dacia Logan"
                                style={{
                                    width: '100%',
                                    height: '50px',
                                    backgroundColor: '#F9FAFB',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '0 16px 0 48px',
                                    fontSize: '15px',
                                    color: '#111827'
                                }}
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                            Message
                        </label>
                        <textarea
                            placeholder="Describe your issue..."
                            style={{
                                width: '100%',
                                height: '100px',
                                backgroundColor: '#F9FAFB',
                                border: 'none',
                                borderRadius: '12px',
                                padding: '16px',
                                fontSize: '15px',
                                color: '#111827',
                                resize: 'none'
                            }}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        className="w-full flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        style={{
                            height: '50px',
                            backgroundColor: isSubmitted ? '#10B981' : '#FFD200',
                            borderRadius: '12px'
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={18} className="animate-spin" style={{ color: '#000000' }} />
                                <span style={{ fontWeight: 700, fontSize: '15px', color: '#000000' }}>
                                    Sending...
                                </span>
                            </>
                        ) : isSubmitted ? (
                            <>
                                <CheckCircle size={18} style={{ color: '#FFFFFF' }} />
                                <span style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF' }}>
                                    Request Sent!
                                </span>
                            </>
                        ) : (
                            <>
                                <span style={{ fontWeight: 700, fontSize: '15px', color: '#000000' }}>
                                    Submit Request
                                </span>
                                <span style={{ color: '#000000' }}>&gt;</span>
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Added bottom padding to ensure spacing from main footer */}
            <div style={{ height: '24px' }} />
        </div>
    );
}
