'use client';

import dynamic from 'next/dynamic';
import { MapPin, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { HomepageContent } from '@/lib/api/homepage';
import type { CentreMapItem } from './MoroccoCentresMap';

const MoroccoCentresMap = dynamic(() => import('./MoroccoCentresMap'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center bg-gray-100"
      style={{ minHeight: '300px' }}
    >
      <span style={{ fontSize: '14px', color: '#6B7280' }}>Chargement de la carte…</span>
    </div>
  ),
});

interface CoverageMapSectionProps {
  content: HomepageContent['coverage'];
  centres: CentreMapItem[];
}

export default function CoverageMapSection({ content, centres }: CoverageMapSectionProps) {
  return (
    <section className="bg-white py-8 px-4">
      <div className="max-w-[380px] mx-auto">

        {/* Separator Line */}
        <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', marginBottom: '32px' }} />

        {/* Section Header */}
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', marginBottom: '16px' }}>
          {content.title}
        </h2>

        {/* Map Container */}
        <div
          className="relative rounded-[24px] overflow-hidden"
          style={{ height: '300px' }}
        >
          <MoroccoCentresMap
            centres={centres}
            className="rounded-[24px]"
            style={{ filter: 'saturate(0.92) contrast(0.98)' }}
          />

          {/* Floating Action Card */}
          <Link
            href="/centres"
            className="absolute left-4 right-4 bottom-4 flex items-center gap-3 p-3 rounded-[20px] bg-white transition-transform hover:scale-[1.02] z-[1000]"
            style={{
              boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Icon Box */}
            <div
              className="flex items-center justify-center"
              style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#FFF7CD',
                borderRadius: '12px'
              }}
            >
              <MapPin size={24} style={{ color: '#111827' }} />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#111827', marginBottom: '2px' }}>
                Nos Centres
              </p>
              <p style={{ fontSize: '13px', fontWeight: 400, color: '#6B7280' }}>
                Un réseau de centres techniques à travers tout le Maroc.
              </p>
            </div>

            {/* Arrow Button */}
            <div
              className="flex items-center justify-center"
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#F3F4F6',
                borderRadius: '50%'
              }}
            >
              <ChevronRight size={16} style={{ color: '#111827' }} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
