'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

type ServiceType = 'in-center' | 'mobile';

export default function ServiceTypeSelector() {
    const [selectedService, setSelectedService] = useState<ServiceType>('in-center');

    const services = [
        {
            id: 'in-center' as const,
            title: 'In-Center Service',
            subtitle: 'Visit our nearest workshop',
            badge: { text: 'Best Value', variant: 'highlight' as const },
            image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&q=80&w=200',
        },
        {
            id: 'mobile' as const,
            title: 'Mobile Workshop',
            subtitle: 'We come to your location',
            badge: { text: '+50 MAD', variant: 'neutral' as const },
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=200',
        },
    ];

    return (
        <section className="bg-white py-6 px-4">
            <div className="max-w-[380px] mx-auto">

                {/* Progress Stepper */}
                <div className="flex items-center justify-center gap-2 mb-6">
                    <div
                        className="w-10 h-1.5 rounded-full"
                        style={{ backgroundColor: '#E5E7EB' }}
                    />
                    <div
                        className="w-10 h-1.5 rounded-full"
                        style={{ backgroundColor: '#FFD200' }}
                    />
                    <div
                        className="w-10 h-1.5 rounded-full"
                        style={{ backgroundColor: '#E5E7EB' }}
                    />
                </div>

                {/* Page Header */}
                <h1
                    style={{
                        fontWeight: 800,
                        fontSize: '20px',
                        color: '#111827',
                        marginBottom: '16px'
                    }}
                >
                    Service Type
                </h1>

                {/* Selection Cards */}
                <div className="flex flex-col gap-4">
                    {services.map((service) => {
                        const isSelected = selectedService === service.id;

                        return (
                            <button
                                key={service.id}
                                onClick={() => setSelectedService(service.id)}
                                className="flex items-center justify-between p-4 w-full text-left transition-all"
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    border: isSelected ? '2px solid #FFD200' : '1px solid #E5E7EB',
                                    borderRadius: '16px',
                                    boxShadow: isSelected ? '0 4px 15px rgba(255, 210, 0, 0.1)' : 'none',
                                    minHeight: '110px'
                                }}
                            >
                                {/* Left Content */}
                                <div className="flex flex-col items-start">
                                    <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#111827' }}>
                                        {service.title}
                                    </h3>
                                    <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
                                        {service.subtitle}
                                    </p>

                                    {/* Badge */}
                                    <span
                                        className="mt-3 px-2 py-1"
                                        style={{
                                            backgroundColor: service.badge.variant === 'highlight' ? '#FEF3C7' : '#F3F4F6',
                                            color: service.badge.variant === 'highlight' ? '#92400E' : '#374151',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            borderRadius: '6px'
                                        }}
                                    >
                                        {service.badge.text}
                                    </span>
                                </div>

                                {/* Right Content - Image with selection marker */}
                                <div className="relative flex-shrink-0">
                                    <div
                                        className="overflow-hidden"
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            borderRadius: '12px',
                                            filter: isSelected ? 'none' : 'grayscale(100%)'
                                        }}
                                    >
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Selection Checkmark */}
                                    {isSelected && (
                                        <div
                                            className="absolute flex items-center justify-center"
                                            style={{
                                                top: '-6px',
                                                right: '-6px',
                                                width: '24px',
                                                height: '24px',
                                                backgroundColor: '#FFD200',
                                                borderRadius: '50%'
                                            }}
                                        >
                                            <Check size={14} strokeWidth={3} style={{ color: '#111827' }} />
                                        </div>
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
