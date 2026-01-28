import { fetchCollection, getMediaUrl } from './client';
import type {
  BookingServiceTypeData,
  TimeSlotTemplateData,
  CentreData,
} from '@/types/strapi';

// Default fallback data
const FALLBACK_SERVICE_TYPES = [
  {
    identifier: 'in-center',
    title: 'In-Center Service',
    subtitle: 'Visit our nearest workshop',
    badgeText: 'Best Value',
    badgeVariant: 'highlight' as const,
    priceModifier: 0,
    priceModifierLabel: '',
  },
  {
    identifier: 'mobile',
    title: 'Mobile Workshop',
    subtitle: 'We come to your location',
    badgeText: '+50 MAD',
    badgeVariant: 'neutral' as const,
    priceModifier: 50,
    priceModifierLabel: '+50 MAD',
  },
];

const FALLBACK_BOOKING_LABELS = {
  serviceTypeTitle: 'Service Type',
  selectedCenterLabel: 'Selected Center',
  changeButtonText: 'Change',
  availableTimeLabel: 'Available Time',
  totalEstimateLabel: 'Total Estimate',
  confirmButtonText: 'Confirm Appointment',
  repairTitle: 'Réparation',
  replacementTitle: 'Remplacement',
  assessmentTitle: 'Impact ou Fissure ?',
  assessmentSubtitle: 'Comparez votre dommage pour savoir si vous avez besoin d\'une réparation ou d\'un remplacement.',
  bookingCtaText: 'Prendre Rendez-vous',
};

export interface BookingServiceType {
  id: number;
  identifier: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  imageUrl: string | null;
  iconUrl: string | null;
  badge: {
    text: string | null;
    variant: 'highlight' | 'neutral' | 'warning' | 'success';
  };
  priceModifier: number;
  priceModifierLabel: string | null;
  isDefault: boolean;
}

export interface TimeSlot {
  time: string;
  displayTime: string;
  isAvailable: boolean;
}

export interface BookingCentre {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
  distance?: number;
}

export interface DamageAssessmentContent {
  title: string;
  subtitle: string;
  repairCard: {
    title: string;
    badge: string;
    features: string[];
    trustBadges: string[];
  };
  replacementCard: {
    title: string;
    badge: string;
    features: string[];
  };
  ctaText: string;
}

export interface BookingPageContent {
  labels: typeof FALLBACK_BOOKING_LABELS;
  serviceTypes: BookingServiceType[];
  damageAssessment: DamageAssessmentContent;
}

export async function getBookingPageContent(): Promise<BookingPageContent> {
  let serviceTypes: BookingServiceTypeData[] = [];

  try {
    serviceTypes = await fetchCollection<BookingServiceTypeData>('booking-service-types', {
      filters: { isActive: { $eq: true } },
      sort: ['order:asc'],
      populate: ['image', 'icon'],
    }, 'static');
  } catch (error) {
    console.warn('Failed to fetch booking service types, using fallback:', error);
    serviceTypes = [];
  }

  const mappedServiceTypes: BookingServiceType[] = serviceTypes.length > 0
    ? serviceTypes.map(st => ({
        id: st.id,
        identifier: st.identifier,
        title: st.title,
        subtitle: st.subtitle || null,
        description: st.description || null,
        imageUrl: st.image ? getMediaUrl(st.image) : null,
        iconUrl: st.icon ? getMediaUrl(st.icon) : null,
        badge: {
          text: st.badgeText || null,
          variant: st.badgeVariant,
        },
        priceModifier: st.priceModifier,
        priceModifierLabel: st.priceModifierLabel || null,
        isDefault: st.isDefault,
      }))
    : FALLBACK_SERVICE_TYPES.map((st, idx) => ({
        id: idx + 1,
        identifier: st.identifier,
        title: st.title,
        subtitle: st.subtitle,
        description: null,
        imageUrl: null,
        iconUrl: null,
        badge: {
          text: st.badgeText,
          variant: st.badgeVariant,
        },
        priceModifier: st.priceModifier,
        priceModifierLabel: st.priceModifierLabel || null,
        isDefault: idx === 0,
      }));

  return {
    labels: FALLBACK_BOOKING_LABELS,
    serviceTypes: mappedServiceTypes,
    damageAssessment: {
      title: 'Impact ou Fissure ?',
      subtitle: 'Comparez votre dommage pour savoir si vous avez besoin d\'une réparation ou d\'un remplacement.',
      repairCard: {
        title: 'Réparation',
        badge: 'Recommandé',
        features: [
          'Plus petit qu\'une pièce de 2€',
          'Fait en 30 min',
          'Souvent 0€ avec assurance',
        ],
        trustBadges: ['Mobile', 'Garantie', 'Assurance'],
      },
      replacementCard: {
        title: 'Remplacement',
        badge: 'Priorité Sécurité',
        features: [
          'Fissure ou gros impact',
          'Certifié CE',
          'Garantie à vie',
        ],
      },
      ctaText: 'Prendre Rendez-vous',
    },
  };
}

export async function getTimeSlots(dayOfWeek: string): Promise<TimeSlot[]> {
  const templates = await fetchCollection<TimeSlotTemplateData>('time-slot-templates', {
    filters: {
      dayOfWeek: { $eq: dayOfWeek },
      isAvailable: { $eq: true },
    },
    sort: ['order:asc'],
  }, 'static');

  if (templates.length === 0) {
    // Return default time slots
    return [
      { time: '09:00', displayTime: '09:00 AM', isAvailable: true },
      { time: '10:00', displayTime: '10:00 AM', isAvailable: true },
      { time: '11:00', displayTime: '11:00 AM', isAvailable: true },
      { time: '14:00', displayTime: '02:00 PM', isAvailable: true },
      { time: '15:00', displayTime: '03:00 PM', isAvailable: true },
      { time: '16:00', displayTime: '04:00 PM', isAvailable: true },
      { time: '17:00', displayTime: '05:00 PM', isAvailable: true },
    ];
  }

  return templates.map(t => ({
    time: t.time,
    displayTime: t.displayTime || t.time,
    isAvailable: t.isAvailable,
  }));
}

export async function getBookingCentres(): Promise<BookingCentre[]> {
  const centres = await fetchCollection<CentreData>('centres', {
    filters: { isActive: { $eq: true } },
    sort: ['title:asc'],
  }, 'dynamic');

  return centres.map(c => ({
    id: c.id,
    name: c.title,
    address: c.address || null,
    phone: c.phone || null,
    latitude: c.latitude,
    longitude: c.longitude,
  }));
}

export async function getNearestBookingCentres(
  userLat: number,
  userLng: number,
  limit: number = 5
): Promise<BookingCentre[]> {
  const allCentres = await getBookingCentres();

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return allCentres
    .map(centre => ({
      ...centre,
      distance: calculateDistance(userLat, userLng, centre.latitude, centre.longitude),
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    .slice(0, limit);
}
