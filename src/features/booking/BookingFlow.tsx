'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, ChevronLeft, ChevronRight, MapPin, Navigation, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import type { BookingPageContent } from '@/lib/api/booking';

type ServiceType = 'in-center' | 'mobile' | null;

interface CalendarMonth {
    name: string;
    year: number;
    daysInMonth: number;
    startDay: number; // 0 = Sunday
}

interface BookingFlowProps {
    content: BookingPageContent;
}

export default function BookingFlow({ content }: BookingFlowProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const centerId = searchParams.get('centerId');
    
    const [selectedService, setSelectedService] = useState<ServiceType>(null);
    const [selectedDate, setSelectedDate] = useState(23);
    const [selectedTime, setSelectedTime] = useState<string | null>('10:00 AM');
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0); // 0 = current month
    const [isConfirming, setIsConfirming] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Calculate current month based on offset
    const getMonthData = (offset: number): CalendarMonth => {
        const date = new Date();
        date.setMonth(date.getMonth() + offset);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
        return {
            name: monthNames[date.getMonth()],
            year: date.getFullYear(),
            daysInMonth: new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(),
            startDay: new Date(date.getFullYear(), date.getMonth(), 1).getDay(),
        };
    };

    const monthData = useMemo(() => getMonthData(currentMonthIndex), [currentMonthIndex]);
    const currentMonth = `${monthData.name} ${monthData.year}`;

    const handlePrevMonth = () => {
        if (currentMonthIndex > 0) {
            setCurrentMonthIndex(prev => prev - 1);
            setSelectedDate(1); // Reset date when changing month
        }
    };

    const handleNextMonth = () => {
        if (currentMonthIndex < 3) { // Allow up to 3 months ahead
            setCurrentMonthIndex(prev => prev + 1);
            setSelectedDate(1);
        }
    };

    const handleChangeCenter = () => {
        router.push(ROUTES.CENTERS);
    };

    const handleConfirmAppointment = async () => {
        setIsConfirming(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsConfirming(false);
        setIsConfirmed(true);
        
        // Redirect to confirmation page after showing success
        setTimeout(() => {
            router.push(`${ROUTES.BOOKING_SCHEDULE}?confirmed=true`);
        }, 1500);
    };

    // Build services from Strapi content or use defaults
    const services = content.serviceTypes.length > 0 
        ? content.serviceTypes.map((st, idx) => ({
            id: st.identifier as 'in-center' | 'mobile',
            title: st.title,
            subtitle: st.subtitle || '',
            badge: { 
                text: st.badge?.text ?? (idx === 0 ? 'Best Value' : '+50 MAD'), 
                variant: (st.badge?.variant === 'highlight' || st.badge?.variant === 'neutral' ? st.badge.variant : idx === 0 ? 'highlight' : 'neutral') as 'highlight' | 'neutral',
            },
            image: st.imageUrl || (idx === 0 
                ? 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&q=80&w=200'
                : 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=200'),
        }))
        : [
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

    const days = [
        { dayName: 'Mon', date: 21, disabled: true },
        { dayName: 'Tue', date: 22, disabled: false },
        { dayName: 'Wed', date: 23, disabled: false },
        { dayName: 'Thu', date: 24, disabled: false },
        { dayName: 'Fri', date: 25, disabled: false },
    ];

    // Time slots: not yet in BookingPageContent (would need day-specific fetch). Use defaults.
    const timeSlots = [
        { time: '09:00 AM', disabled: false },
        { time: '10:00 AM', disabled: false },
        { time: '11:00 AM', disabled: true },
        { time: '01:00 PM', disabled: false },
        { time: '02:30 PM', disabled: false },
        { time: '04:00 PM', disabled: true },
    ];

    const selectedDayName = days.find(d => d.date === selectedDate)?.dayName || 'Wed';
    const showConfirmation = selectedService && selectedTime;

    return (
        <>
            <section className="bg-white py-6 px-4" style={{ paddingBottom: showConfirmation ? '20px' : '24px' }}>
                <div className="max-w-[380px] mx-auto">

                    {/* Progress Stepper */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-10 h-1.5 rounded-full" style={{ backgroundColor: '#E5E7EB' }} />
                        <div
                            className="w-10 h-1.5 rounded-full transition-colors"
                            style={{ backgroundColor: selectedService ? '#E5E7EB' : '#FFD200' }}
                        />
                        <div
                            className="w-10 h-1.5 rounded-full transition-colors"
                            style={{ backgroundColor: selectedService ? '#FFD200' : '#E5E7EB' }}
                        />
                    </div>

                    {/* Step 2: Service Type Selector */}
                    <div className="mb-8">
                        <h1 style={{ fontWeight: 800, fontSize: '20px', color: '#111827', marginBottom: '16px' }}>
                            Service Type
                        </h1>

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
                                        <div className="flex flex-col items-start">
                                            <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#111827' }}>{service.title}</h3>
                                            <p style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>{service.subtitle}</p>
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
                                        <div className="relative flex-shrink-0">
                                            <div
                                                className="overflow-hidden transition-all"
                                                style={{ width: '80px', height: '80px', borderRadius: '12px', filter: isSelected ? 'none' : 'grayscale(100%)' }}
                                            >
                                                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                                            </div>
                                            {isSelected && (
                                                <div className="absolute flex items-center justify-center" style={{ top: '-6px', right: '-6px', width: '24px', height: '24px', backgroundColor: '#FFD200', borderRadius: '50%' }}>
                                                    <Check size={14} strokeWidth={3} style={{ color: '#111827' }} />
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Step 3: Scheduling Interface */}
                    {selectedService && (
                        <div className="animate-in slide-in-from-bottom-4 fade-in duration-300">
                            {/* Selected Center Section */}
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 style={{ fontWeight: 700, fontSize: '16px', color: '#111827' }}>Selected Center</h2>
                                    <button
                                        onClick={handleChangeCenter}
                                        className="transition-colors hover:text-yellow-600"
                                        style={{ fontWeight: 700, fontSize: '14px', color: '#EAB308' }}
                                    >
                                        Change
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 p-3" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px' }}>
                                    <div className="flex items-center justify-center flex-shrink-0" style={{ width: '64px', height: '64px', backgroundColor: '#8FA3A3', borderRadius: '12px' }}>
                                        <MapPin size={24} style={{ color: '#FFFFFF' }} />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span style={{ fontWeight: 700, fontSize: '16px', color: '#111827' }}>Casablanca - Ain Sebaa</span>
                                        <span className="truncate" style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}>123 Bd Chefchaoueni, Casablanca 2...</span>
                                        <div className="flex items-center gap-1 mt-2">
                                            <Navigation size={12} fill="#22C55E" style={{ color: '#22C55E' }} />
                                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#22C55E' }}>2.4 km away</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h2 style={{ fontWeight: 800, fontSize: '20px', color: '#111827' }}>{currentMonth}</h2>
                                <div className="flex items-center gap-6">
                                    <button
                                        onClick={handlePrevMonth}
                                        disabled={currentMonthIndex === 0}
                                        className="transition-colors hover:text-yellow-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                        aria-label="Previous month"
                                    >
                                        <ChevronLeft size={24} style={{ color: '#111827' }} />
                                    </button>
                                    <button
                                        onClick={handleNextMonth}
                                        disabled={currentMonthIndex >= 3}
                                        className="transition-colors hover:text-yellow-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                        aria-label="Next month"
                                    >
                                        <ChevronRight size={24} style={{ color: '#111827' }} />
                                    </button>
                                </div>
                            </div>

                            {/* Date Picker Strip */}
                            <div className="flex gap-3 overflow-x-auto pb-2 mb-8" style={{ scrollbarWidth: 'none' }}>
                                {days.map((day) => {
                                    const isSelected = selectedDate === day.date;
                                    const isDisabled = day.disabled;
                                    return (
                                        <button
                                            key={day.date}
                                            onClick={() => !isDisabled && setSelectedDate(day.date)}
                                            disabled={isDisabled}
                                            className="flex flex-col items-center justify-center flex-shrink-0 transition-all"
                                            style={{
                                                width: '60px',
                                                height: '72px',
                                                borderRadius: '16px',
                                                backgroundColor: isSelected ? '#FFD200' : isDisabled ? '#F9FAFB' : '#FFFFFF',
                                                border: isSelected ? 'none' : '1px solid #F3F4F6',
                                                boxShadow: isSelected ? '0 4px 12px rgba(255, 210, 0, 0.3)' : '0 2px 4px rgba(0,0,0,0.02)',
                                                opacity: isDisabled ? 0.5 : 1,
                                                cursor: isDisabled ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            <span style={{ fontSize: '12px', fontWeight: 500, color: isSelected ? '#111827' : '#9CA3AF', marginBottom: '4px' }}>{day.dayName}</span>
                                            <span style={{ fontSize: isSelected ? '24px' : '20px', fontWeight: isSelected ? 800 : 700, color: isSelected ? '#111827' : '#374151' }}>{day.date}</span>
                                            {isSelected && <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#111827', marginTop: '2px' }} />}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Time Slot Grid */}
                            <div>
                                <h3 style={{ fontWeight: 800, fontSize: '18px', color: '#111827', marginBottom: '16px' }}>Available Time</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    {timeSlots.map((slot) => {
                                        const isSelected = selectedTime === slot.time;
                                        const isDisabled = slot.disabled;
                                        return (
                                            <button
                                                key={slot.time}
                                                onClick={() => !isDisabled && setSelectedTime(slot.time)}
                                                disabled={isDisabled}
                                                className="flex items-center justify-center transition-all"
                                                style={{
                                                    height: '48px',
                                                    borderRadius: '12px',
                                                    backgroundColor: isSelected ? '#FFD200' : isDisabled ? '#F9FAFB' : '#FFFFFF',
                                                    border: isSelected ? '2px solid #EAB308' : isDisabled ? '1px dashed #E5E7EB' : '1px solid #E5E7EB',
                                                    boxShadow: isSelected ? '0 2px 8px rgba(255, 210, 0, 0.25)' : 'none',
                                                    cursor: isDisabled ? 'not-allowed' : 'pointer'
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontSize: '14px',
                                                        fontWeight: isSelected ? 800 : 600,
                                                        color: isDisabled ? '#9CA3AF' : '#111827',
                                                        textDecoration: isDisabled ? 'line-through' : 'none'
                                                    }}
                                                >
                                                    {slot.time}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Sticky Confirmation Footer */}
            {showConfirmation && (
                <div
                    className="fixed bottom-0 left-0 right-0 bg-white z-50"
                    style={{
                        boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
                        padding: '20px 24px 24px'
                    }}
                >
                    <div className="max-w-[380px] mx-auto">
                        {/* Row 1: Summary Info */}
                        <div className="flex items-start justify-between mb-4">
                            {/* Left: Price */}
                            <div>
                                <span
                                    className="uppercase block"
                                    style={{ fontSize: '10px', letterSpacing: '0.5px', color: '#6B7280', fontWeight: 700 }}
                                >
                                    Total Estimate
                                </span>
                                <span style={{ fontSize: '20px', fontWeight: 800, color: '#111827' }}>1,200 MAD</span>
                            </div>

                            {/* Right: Context */}
                            <div className="text-right">
                                <span
                                    className="inline-block mb-1"
                                    style={{
                                        backgroundColor: '#FEF9C3',
                                        color: '#000000',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        padding: '4px 8px',
                                        borderRadius: '6px'
                                    }}
                                >
                                    {selectedDayName}, Oct {selectedDate} @ {selectedTime}
                                </span>
                                <span className="block" style={{ fontSize: '12px', fontWeight: 400, color: '#6B7280' }}>
                                    {selectedService === 'in-center' ? 'In-Center Service' : 'Mobile Workshop'}
                                </span>
                            </div>
                        </div>

                        {/* Row 2: Action Button */}
                        <button
                            onClick={handleConfirmAppointment}
                            disabled={isConfirming || isConfirmed}
                            className="w-full flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed"
                            style={{
                                height: '56px',
                                backgroundColor: isConfirmed ? '#10B981' : '#FFD200',
                                borderRadius: '16px',
                                boxShadow: '0 4px 12px rgba(255, 210, 0, 0.25)'
                            }}
                        >
                            {isConfirming ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" style={{ color: '#111827' }} />
                                    <span style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Confirming...</span>
                                </>
                            ) : isConfirmed ? (
                                <>
                                    <CheckCircle size={20} style={{ color: '#FFFFFF' }} />
                                    <span style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF' }}>Confirmed!</span>
                                </>
                            ) : (
                                <>
                                    <span style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>Confirm Appointment</span>
                                    <ArrowRight size={20} style={{ color: '#111827' }} strokeWidth={2.5} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
