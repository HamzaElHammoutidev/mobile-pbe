'use client';

import { Star, User, Quote } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const testimonials = [
    {
        name: "Karim Benali",
        text: "Service impeccable ! L'équipe est arrivée à l'heure et a réparé mon pare-brise en un temps record. Très professionnel.",
        rating: 5,
    },
    {
        name: "Sarah Mansouri",
        text: "J'ai adoré le service à domicile. C'était très pratique pour moi qui travaille toute la journée. Je recommande !",
        rating: 5,
    },
    {
        name: "Mohammed Alami",
        text: "Un travail de qualité et une équipe très sympathique. Le prix était également très compétitif.",
        rating: 4.5,
    },
    {
        name: "Yassine Tazi",
        text: "Prise de rendez-vous simple et rapide. Le technicien était très compétent et minutieux.",
        rating: 5,
    }
];

export default function TestimonialsCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const scrollPosition = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        const centerPosition = scrollPosition + containerWidth / 2;

        let newActiveIndex = 0;
        let minDistance = Infinity;

        // Iterate through children to find the one closest to center
        const children = container.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement;
            const childCenter = child.offsetLeft + child.offsetWidth / 2;
            const distance = Math.abs(childCenter - centerPosition);

            if (distance < minDistance) {
                minDistance = distance;
                newActiveIndex = i;
            }
        }

        if (newActiveIndex !== activeIndex) {
            setActiveIndex(newActiveIndex);
        }
    };

    return (
        <section className="py-8 bg-white" style={{ paddingTop: '32px' }}>
            <div className="w-full">
                {/* Section Header */}
                <div className="flex justify-between items-center mb-6 px-6">
                    <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111827' }}>
                        Témoignages
                    </h2>

                    {/* Indicators */}
                    <div className="flex items-center gap-1.5 transition-all duration-300">
                        {testimonials.map((_, index) => (
                            <div
                                key={index}
                                className="transition-all duration-300 ease-in-out"
                                style={{
                                    width: activeIndex === index ? '16px' : '4px',
                                    height: '4px',
                                    backgroundColor: activeIndex === index ? '#FFD200' : '#E5E7EB',
                                    borderRadius: activeIndex === index ? '99px' : '50%'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Horizontal Scrollable List */}
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="w-full overflow-x-auto flex gap-4 px-6 pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 snap-center relative p-6 w-[85vw] sm:w-[350px]"
                            style={{
                                backgroundColor: '#F9FAFB',
                                borderRadius: '24px',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Decorative Quote */}
                            <Quote
                                className="absolute top-6 right-6 text-[#E5E7EB]"
                                size={48}
                                fill="#E5E7EB"
                                style={{ transform: 'scaleX(-1)' }}
                            />

                            {/* Rating */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                                    <Star key={i} size={18} fill="#FACC15" strokeWidth={0} />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p
                                className="mb-8 relative z-10"
                                style={{
                                    color: '#4B5563',
                                    fontSize: '15px',
                                    fontWeight: 500,
                                    fontStyle: 'italic',
                                    lineHeight: 1.6,
                                    minHeight: '72px'
                                }}
                            >
                                "{testimonial.text}"
                            </p>

                            {/* User Profile */}
                            <div className="flex items-center gap-3">
                                <div
                                    className="flex items-center justify-center rounded-full"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: '#E5E7EB'
                                    }}
                                >
                                    <User size={20} className="text-[#9CA3AF]" fill="#9CA3AF" />
                                </div>
                                <div className="flex flex-col">
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
                                        {testimonial.name}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: '10px',
                                            fontWeight: 700,
                                            color: '#9CA3AF',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}
                                    >
                                        CLIENT VÉRIFIÉ
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
