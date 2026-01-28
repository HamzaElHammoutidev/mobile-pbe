'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Crosshair, ArrowUpRight, Truck, Shield, Award, Search, Star, Navigation, Phone, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { useGeolocation } from '@/hooks/useGeolocation';
import { openDirections, openPhoneDialer } from '@/hooks/useExternalNavigation';
import type { NetworkPageContent, CentreDisplay } from '@/lib/api/network';
import { calculateDistance } from '@/lib/api/network';

interface NetworkMapPageProps {
    content: NetworkPageContent;
}

const DEFAULT_CENTER = {
    id: 1,
    name: 'Pare-Brise Maarif',
    address: '123 Blvd d\'Anfa, Casablanca',
    latitude: 33.5892,
    longitude: -7.6311,
    phone: '0522123456',
    rating: 4.8,
    isOpen: true,
    closingTime: '19:00',
    city: 'Casablanca',
};

export default function NetworkMapPage({ content }: NetworkMapPageProps) {
    // defensive: handle undefined or empty centres array
    const centresFromContent = content?.centres;
    const hasCentres = Array.isArray(centresFromContent) && centresFromContent.length > 0;
    const centres = hasCentres ? centresFromContent : [DEFAULT_CENTER];
    const [selectedCenter, setSelectedCenter] = useState<CentreDisplay>(centres[0]);
    const [userDistance, setUserDistance] = useState<number | null>(null);
    const [showAllCentres, setShowAllCentres] = useState(false);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const { loading: geoLoading, requestLocation, coords: userCoords } = useGeolocation();
    const showSearchResult = searchQuery.length > 0;

    // Find nearest center based on user coordinates
    const findNearestCenter = (lat: number, lng: number): CentreDisplay & { distance: number } => {
        let nearestCenter = centres[0];
        let minDistance = calculateDistance(lat, lng, centres[0].latitude, centres[0].longitude);

        for (const centre of centres) {
            const dist = calculateDistance(lat, lng, centre.latitude, centre.longitude);
            if (dist < minDistance) {
                minDistance = dist;
                nearestCenter = centre;
            }
        }

        return { ...nearestCenter, distance: minDistance };
    };

    const handleGeolocation = async () => {
        const coords = await requestLocation();
        if (coords) {
            // Find the nearest center to user's position
            const nearest = findNearestCenter(coords.latitude, coords.longitude);
            setSelectedCenter(nearest);
            setUserDistance(nearest.distance);
            setSearchQuery(`Ma position (${nearest.city})`);
        }
    };

    const handleGetDirections = () => {
        openDirections({
            latitude: selectedCenter.latitude,
            longitude: selectedCenter.longitude,
            label: selectedCenter.name,
            ...(userCoords && {
                origin: { latitude: userCoords.latitude, longitude: userCoords.longitude },
            }),
        });
    };

    const handleCallCenter = () => {
        openPhoneDialer(selectedCenter.phone);
    };

    const handleSelectCenter = () => {
        // Store selected center in session/state and navigate to booking
        router.push(`${ROUTES.BOOKING}?centerId=${selectedCenter.id}`);
    };

    const handleShowAllCentres = () => {
        setShowAllCentres(true);
        setSearchQuery('Tous les centres');
        setUserDistance(null);
        setSelectedCenter(centres[0]);
    };

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        if (value !== 'Tous les centres') setShowAllCentres(false);
    };

    // Filter centres based on search
    const filteredCentres = useMemo(() => {
        if (!searchQuery.trim() || searchQuery.startsWith('Ma position') || searchQuery === 'Tous les centres') return centres;
        const query = searchQuery.toLowerCase();
        return centres.filter(c => 
            c.name.toLowerCase().includes(query) || 
            c.city.toLowerCase().includes(query) ||
            c.address.toLowerCase().includes(query)
        );
    }, [centres, searchQuery]);

    // Update selected center when search filters change (but not for geolocation)
    useEffect(() => {
        if (searchQuery && !searchQuery.startsWith('Ma position') && filteredCentres.length > 0) {
            // If current selected isn't in filtered list, select the first filtered one
            const isSelectedInFiltered = filteredCentres.some(c => c.id === selectedCenter.id);
            if (!isSelectedInFiltered) {
                setSelectedCenter(filteredCentres[0]);
                setUserDistance(null);
            }
        }
    }, [filteredCentres, searchQuery, selectedCenter.id]);

    // Map embed URL: center on selected centre with marker, ~25km view
    const mapEmbedSrc = useMemo(() => {
        const lat = selectedCenter.latitude;
        const lng = selectedCenter.longitude;
        const delta = 0.12; // ~25km span
        const minLon = lng - delta;
        const maxLon = lng + delta;
        const minLat = lat - delta;
        const maxLat = lat + delta;
        const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
        const marker = `${lat},${lng}`;
        return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`;
    }, [selectedCenter.latitude, selectedCenter.longitude]);

    return (
        <div className="relative" style={{ minHeight: 'calc(100vh - 200px)' }}>

            {/* Map Background */}
            <div className="relative w-full" style={{ height: '600px' }}>
                <iframe
                    key={`map-${selectedCenter.id}`}
                    src={mapEmbedSrc}
                    title="Carte des centres PBE"
                    className="w-full h-full border-0"
                    style={{ filter: 'saturate(0.9)' }}
                />

                {/* Search Bar (Top) */}
                <div
                    className="absolute z-30 left-4 right-4"
                    style={{ top: '16px' }}
                >
                    <div
                        className="flex items-center gap-3 w-full"
                        style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '999px',
                            padding: '12px 16px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                        }}
                    >
                        <Search size={20} style={{ color: '#9CA3AF' }} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Trouver un centre à proximité..."
                            className="flex-1 bg-transparent outline-none"
                            style={{ fontSize: '14px', color: '#111827' }}
                        />
                    </div>
                </div>

                {/* Floating Stats Card - click to show all centres */}
                <button
                    type="button"
                    onClick={handleShowAllCentres}
                    aria-label="Voir tous les centres"
                    className="absolute z-20 text-left w-full max-w-[200px] transition-all hover:bg-gray-50/80 active:scale-[0.98] cursor-pointer rounded-[20px]"
                    style={{
                        top: '80px',
                        left: '16px',
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(8px)',
                        padding: '16px 20px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                >
                    <div className="flex items-baseline mb-1">
                        <span
                            style={{
                                fontWeight: 800,
                                fontSize: '36px',
                                color: '#FFD200',
                                textShadow: '0 2px 4px rgba(255, 210, 0, 0.2)'
                            }}
                        >
                            {content?.stats?.centresCount ?? centres.length}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: '28px', color: '#FFD200' }}>+</span>
                        <span style={{ fontWeight: 700, fontSize: '21px', color: '#0F172A', marginLeft: '4px' }}>
                            {content?.stats?.centresLabel ?? 'CENTRES'}
                        </span>
                    </div>
                    <div
                        className="uppercase"
                        style={{
                            fontSize: '11px',
                            color: '#4B5563',
                            letterSpacing: '1px',
                            lineHeight: 1.4,
                            fontWeight: 700,
                            marginTop: '4px'
                        }}
                    >
                        <div>{content?.stats?.coverageLabel ?? 'Couverture Nationale'}</div>
                        <div>Maroc</div>
                    </div>
                </button>

                {/* Location Trigger Button (Right Side) */}
                <button
                    onClick={handleGeolocation}
                    disabled={geoLoading}
                    className="absolute z-20 flex items-center justify-center transition-all hover:bg-gray-50 active:scale-95 disabled:opacity-50"
                    style={{
                        right: '16px',
                        top: '90%',
                        transform: 'translateY(-50%)',
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '50%',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                >
                    {geoLoading ? (
                        <Loader2 size={20} className="animate-spin" style={{ color: '#111827' }} />
                    ) : (
                        <Crosshair size={20} style={{ color: '#111827' }} />
                    )}
                </button>
            </div>

            {/* Center Search Result Card - Shows when searching */}
            {showSearchResult && (
                <div
                    className="mx-4 -mt-6 relative z-10 mb-4"
                    style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '20px',
                        padding: '20px',
                        boxShadow: '0 4px 25px rgba(0,0,0,0.1)'
                    }}
                >
                    {/* Handle Bar */}
                    <div className="flex justify-center mb-4">
                        <div style={{ width: '40px', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '2px' }} />
                    </div>

                    {/* Center Info Row */}
                    <div className="flex gap-4 mb-4">
                        {/* Image with Rating */}
                        <div className="relative flex-shrink-0" style={{ width: '100px', height: '100px' }}>
                            <img
                                src={selectedCenter.imageUrl || "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&q=80&w=200"}
                                alt={selectedCenter.name}
                                className="w-full h-full object-cover"
                                style={{ borderRadius: '16px' }}
                            />
                            {/* Rating Badge */}
                            {selectedCenter.rating && (
                                <div
                                    className="absolute flex items-center gap-1 px-2 py-1"
                                    style={{
                                        top: '8px',
                                        left: '8px',
                                        backgroundColor: '#FFD200',
                                        borderRadius: '6px'
                                    }}
                                >
                                    <span style={{ fontWeight: 700, fontSize: '12px', color: '#111827' }}>
                                        {selectedCenter.rating.toFixed(1)}
                                    </span>
                                    <Star size={10} fill="#111827" style={{ color: '#111827' }} />
                                </div>
                            )}
                        </div>

                        {/* Center Details */}
                        <div className="flex flex-col flex-1">
                            <h3 style={{ fontWeight: 800, fontSize: '18px', color: '#111827', marginBottom: '4px' }}>
                                {selectedCenter.name}
                            </h3>
                            <p style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>
                                {selectedCenter.address}
                            </p>

                            {/* Status Row */}
                            <div className="flex items-center gap-3 flex-wrap">
                                <span
                                    className="uppercase"
                                    style={{
                                        backgroundColor: selectedCenter.isOpen ? '#22C55E' : '#EF4444',
                                        color: '#FFFFFF',
                                        fontSize: '10px',
                                        fontWeight: 800,
                                        padding: '4px 8px',
                                        borderRadius: '4px'
                                    }}
                                >
                                    {selectedCenter.isOpen ? 'Ouvert' : 'Fermé'}
                                </span>
                                {selectedCenter.closingTime && (
                                    <span style={{ fontSize: '12px', color: '#6B7280' }}>
                                        Jusqu'à {selectedCenter.closingTime}
                                    </span>
                                )}
                                {userDistance !== null && (
                                    <span style={{ fontSize: '12px', color: '#3B82F6', fontWeight: 600 }}>
                                        {userDistance < 1 
                                            ? `${Math.round(userDistance * 1000)} m` 
                                            : `${userDistance.toFixed(1)} km`}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Other matching / all centres list */}
                    {filteredCentres.length > 1 && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p style={{ fontSize: '12px', color: '#6B7280', marginBottom: '8px' }}>
                                {showAllCentres
                                    ? 'Tous nos centres'
                                    : `${filteredCentres.length - 1} autre${filteredCentres.length > 2 ? 's' : ''} centre${filteredCentres.length > 2 ? 's' : ''} trouvé${filteredCentres.length > 2 ? 's' : ''}`}
                            </p>
                            <div
                                className={`flex gap-2 overflow-x-auto pb-2 ${showAllCentres ? 'flex-col overflow-y-auto max-h-[280px] overflow-x-hidden' : ''}`}
                                style={showAllCentres ? { scrollbarWidth: 'thin' } : { scrollbarWidth: 'none' }}
                            >
                                {(showAllCentres ? filteredCentres : filteredCentres.filter(c => c.id !== selectedCenter.id).slice(0, 5))
                                    .filter(c => c.id !== selectedCenter.id)
                                    .map(centre => (
                                        <button
                                            key={centre.id}
                                            onClick={() => {
                                                setSelectedCenter(centre);
                                                if (userCoords) {
                                                    setUserDistance(calculateDistance(
                                                        userCoords.latitude,
                                                        userCoords.longitude,
                                                        centre.latitude,
                                                        centre.longitude
                                                    ));
                                                } else {
                                                    setUserDistance(null);
                                                }
                                            }}
                                            className={`text-left transition-all hover:bg-yellow-50 ${showAllCentres ? 'flex items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-100' : 'flex-shrink-0 px-3 py-2 rounded-[10px] border border-gray-200'}`}
                                            style={
                                                showAllCentres
                                                    ? { backgroundColor: selectedCenter.id === centre.id ? '#FFFBEB' : '#F9FAFB', borderColor: selectedCenter.id === centre.id ? '#FDE68A' : '#E5E7EB' }
                                                    : { backgroundColor: '#F9FAFB', borderColor: '#E5E7EB' }
                                            }
                                        >
                                            {showAllCentres && (
                                                <div className="w-10 h-10 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                                    <img
                                                        src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&q=80&w=80"
                                                        alt=""
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <span className="block font-semibold text-[13px] text-gray-900 truncate">
                                                    {centre.name}
                                                </span>
                                                <span style={{ fontSize: '11px', color: '#6B7280' }}>
                                                    {centre.city}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons Row */}
                    <div className="flex items-center gap-3">
                        {/* Go / Itinerary Button */}
                        <button
                            onClick={handleGetDirections}
                            className="flex flex-col items-center justify-center transition-all hover:bg-gray-100 active:scale-95"
                            style={{
                                width: '60px',
                                height: '60px',
                                backgroundColor: '#F9FAFB',
                                borderRadius: '16px'
                            }}
                            title={userCoords ? 'Itinéraire depuis ma position' : 'Ouvrir dans Maps'}
                        >
                            <Navigation size={20} style={{ color: '#111827' }} />
                            <span style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
                                {userCoords ? 'Itinéraire' : 'Go'}
                            </span>
                        </button>

                        {/* Call Button */}
                        <button
                            onClick={handleCallCenter}
                            className="flex flex-col items-center justify-center transition-all hover:bg-gray-100 active:scale-95"
                            style={{
                                width: '60px',
                                height: '60px',
                                backgroundColor: '#F9FAFB',
                                borderRadius: '16px'
                            }}
                        >
                            <Phone size={20} style={{ color: '#111827' }} />
                            <span style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>Call</span>
                        </button>

                        {/* Select Center CTA */}
                        <button
                            onClick={handleSelectCenter}
                            className="flex-1 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            style={{
                                height: '56px',
                                backgroundColor: '#FFD200',
                                borderRadius: '16px'
                            }}
                        >
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>
                                Select Center
                            </span>
                            <ArrowRight size={18} style={{ color: '#111827' }} />
                        </button>
                    </div>
                </div>
            )}

            {/* Service Detail Card (Ateliers Mobiles) */}
            <div
                className={`mx-4 relative z-10 ${showSearchResult ? '' : '-mt-6'}`}
                style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 -4px 25px rgba(0,0,0,0.1)'
                }}
            >
                {/* Header Row */}
                <div className="flex items-center pb-4 mb-4 border-b border-gray-100">
                    <div
                        className="flex items-center justify-center"
                        style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#FEF9C3',
                            borderRadius: '12px'
                        }}
                    >
                        <Truck size={20} style={{ color: '#B45309' }} />
                    </div>
                    <h3 style={{ fontWeight: 800, fontSize: '18px', color: '#111827', marginLeft: '12px' }}>
                        Ateliers Mobiles
                    </h3>
                    <span
                        className="uppercase ml-auto"
                        style={{
                            backgroundColor: '#F3F4F6',
                            color: '#4B5563',
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '6px 10px',
                            borderRadius: '6px',
                            letterSpacing: '0.5px'
                        }}
                    >
                        Service Premium
                    </span>
                </div>

                {/* Body Content - Split Layout */}
                <div className="flex gap-4">
                    <div
                        className="relative flex-shrink-0 overflow-hidden"
                        style={{
                            width: '90px',
                            height: '110px',
                            borderRadius: '16px'
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=200"
                            alt="Van mobile"
                            className="w-full h-full object-cover"
                        />
                        <div
                            className="absolute flex items-center justify-center"
                            style={{
                                bottom: '8px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '28px',
                                height: '20px',
                                backgroundColor: 'rgba(255,255,255,0.95)',
                                borderRadius: '4px'
                            }}
                        >
                            <Truck size={16} style={{ color: '#111827' }} />
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 justify-between">
                        <div>
                            <h4 style={{ fontWeight: 800, fontSize: '15px', color: '#111827', marginBottom: '4px' }}>
                                Nous venons à vous.
                            </h4>
                            <p style={{ fontSize: '12px', fontWeight: 400, color: '#4B5563', lineHeight: 1.4 }}>
                                Profitez de notre service mobile à domicile ou au bureau pour le remplacement de votre vitrage.
                            </p>
                        </div>

                        <div
                            className="flex items-center gap-2 mt-3"
                            style={{
                                backgroundColor: '#FFFBEB',
                                border: '1px solid #FEF3C7',
                                borderRadius: '10px',
                                padding: '8px 12px'
                            }}
                        >
                            <Award size={16} fill="#F59E0B" style={{ color: '#F59E0B' }} />
                            <span style={{ fontSize: '12px', fontWeight: 800, color: '#78350F' }}>
                                Déplacement Gratuit*
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trust Badges - Outside Card */}
            <div className="flex items-center justify-center gap-8 mt-6 px-4">
                <div className="flex items-center gap-2">
                    <Shield size={18} style={{ color: '#9CA3AF' }} />
                    <span style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', fontWeight: 500 }}>
                        Garantie Vitrage
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Award size={18} style={{ color: '#9CA3AF' }} />
                    <span style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', fontWeight: 500 }}>
                        Agréé Assurances
                    </span>
                </div>
            </div>

            {/* CTA Section */}
            <div className="mx-4 mt-6 mb-8">
                <div
                    className="flex items-center justify-between px-5 py-4"
                    style={{
                        backgroundColor: '#0F172A',
                        borderRadius: '16px'
                    }}
                >
                    <div>
                        <span
                            className="uppercase block"
                            style={{ fontSize: '10px', color: '#94A3B8', marginBottom: '2px' }}
                        >
                            Besoin d&apos;aide ?
                        </span>
                        <span style={{ fontSize: '16px', fontWeight: 700, color: '#FFD200' }}>
                            Prendre Rendez-vous
                        </span>
                    </div>

                    <Link
                        href={ROUTES.BOOKING}
                        className="flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                        style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#FFD200',
                            borderRadius: '10px'
                        }}
                    >
                        <ArrowUpRight size={20} style={{ color: '#111827' }} strokeWidth={2.5} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
