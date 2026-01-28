'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Navigation } from 'lucide-react';

export default function SchedulingInterface() {
    const [selectedDate, setSelectedDate] = useState(23);

    // Current month/year for demo
    const currentMonth = 'October 2023';

    // Days for the date picker strip
    const days = [
        { dayName: 'Mon', date: 21, disabled: true },
        { dayName: 'Tue', date: 22, disabled: false },
        { dayName: 'Wed', date: 23, disabled: false },
        { dayName: 'Thu', date: 24, disabled: false },
        { dayName: 'Fri', date: 25, disabled: false },
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
                        style={{ backgroundColor: '#E5E7EB' }}
                    />
                    <div
                        className="w-10 h-1.5 rounded-full"
                        style={{ backgroundColor: '#FFD200' }}
                    />
                </div>

                {/* Selected Center Section */}
                <div className="mb-8">
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-3">
                        <h2 style={{ fontWeight: 700, fontSize: '16px', color: '#111827' }}>
                            Selected Center
                        </h2>
                        <button style={{ fontWeight: 700, fontSize: '14px', color: '#EAB308' }}>
                            Change
                        </button>
                    </div>

                    {/* Center Card */}
                    <div
                        className="flex items-center gap-4 p-3"
                        style={{
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #E5E7EB',
                            borderRadius: '16px'
                        }}
                    >
                        {/* Map Tile */}
                        <div
                            className="flex items-center justify-center flex-shrink-0"
                            style={{
                                width: '64px',
                                height: '64px',
                                backgroundColor: '#8FA3A3',
                                borderRadius: '12px'
                            }}
                        >
                            <MapPin size={24} style={{ color: '#FFFFFF' }} />
                        </div>

                        {/* Details */}
                        <div className="flex flex-col min-w-0">
                            <span style={{ fontWeight: 700, fontSize: '16px', color: '#111827' }}>
                                Casablanca - Ain Sebaa
                            </span>
                            <span
                                className="truncate"
                                style={{ fontSize: '13px', color: '#6B7280', marginTop: '2px' }}
                            >
                                123 Bd Chefchaoueni, Casablanca 2...
                            </span>

                            {/* Distance Tag */}
                            <div className="flex items-center gap-1 mt-2">
                                <Navigation size={12} fill="#22C55E" style={{ color: '#22C55E' }} />
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#22C55E' }}>
                                    2.4 km away
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 style={{ fontWeight: 800, fontSize: '20px', color: '#111827' }}>
                        {currentMonth}
                    </h2>

                    <div className="flex items-center gap-6">
                        <button aria-label="Previous month">
                            <ChevronLeft size={24} style={{ color: '#111827' }} />
                        </button>
                        <button aria-label="Next month">
                            <ChevronRight size={24} style={{ color: '#111827' }} />
                        </button>
                    </div>
                </div>

                {/* Date Picker Strip */}
                <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
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
                                    backgroundColor: isSelected
                                        ? '#FFD200'
                                        : isDisabled
                                            ? '#F9FAFB'
                                            : '#FFFFFF',
                                    border: isSelected ? 'none' : '1px solid #F3F4F6',
                                    boxShadow: isSelected
                                        ? '0 4px 12px rgba(255, 210, 0, 0.3)'
                                        : '0 2px 4px rgba(0,0,0,0.02)',
                                    opacity: isDisabled ? 0.5 : 1,
                                    cursor: isDisabled ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {/* Day Name */}
                                <span
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        color: isSelected ? '#111827' : '#9CA3AF',
                                        marginBottom: '4px'
                                    }}
                                >
                                    {day.dayName}
                                </span>

                                {/* Date Number */}
                                <span
                                    style={{
                                        fontSize: isSelected ? '24px' : '20px',
                                        fontWeight: isSelected ? 800 : 700,
                                        color: isSelected ? '#111827' : '#374151'
                                    }}
                                >
                                    {day.date}
                                </span>

                                {/* Selection Indicator Dot */}
                                {isSelected && (
                                    <span
                                        style={{
                                            width: '4px',
                                            height: '4px',
                                            borderRadius: '50%',
                                            backgroundColor: '#111827',
                                            marginTop: '2px'
                                        }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
