import { fetchSingleType, fetchCollection, getMediaUrl } from './client';
import type {
  ServiceData,
  EventData,
  WhyUsData,
  ThemeVideoData,
} from '@/types/strapi';

// Default fallback data
const FALLBACK_SERVICES_HERO = {
  title: 'LEADER MAROCAIN DU VITRAGE',
  subtitle: 'QUI SOMMES NOUS?',
  description: 'Expertise, rapidité et qualité garanties pour tous vos besoins en vitrage automobile.',
  ctaText: 'En savoir plus',
};

const FALLBACK_STATS = [
  { value: '25+', label: 'Unités Mobiles', description: '' },
  { value: '20+', label: 'Années d\'Expérience', description: '' },
  { value: '100%', label: 'Agréé Assurances', description: 'Gestion administrative incluse' },
];

export interface ServicesPageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    videoUrl: string | null;
    ctaText: string;
  };
  stats: Array<{
    value: string;
    label: string;
    description: string;
  }>;
  services: Array<{
    id: number;
    title: string;
    description: string | null;
    iconUrl: string | null;
    href: string;
  }>;
  excellence: Array<{
    id: number;
    title: string;
    description: string | null;
    iconUrl: string | null;
  }>;
  events: Array<{
    id: number;
    title: string;
    date: string;
    dateLabel: string | null;
    imageUrl: string | null;
    link: string | null;
  }>;
}

export async function getServicesPageContent(): Promise<ServicesPageContent> {
  const [services, whyUsItems, events, themeVideos] = await Promise.all([
    fetchCollection<ServiceData>('services', {
      sort: ['order:asc'],
      populate: ['icon'],
    }),
    fetchCollection<WhyUsData>('why-uses', {
      sort: ['order:asc'],
      populate: ['icon'],
    }),
    fetchCollection<EventData>('events', {
      sort: ['date:desc'],
      pagination: { limit: 6 },
      populate: ['image'],
    }),
    fetchCollection<ThemeVideoData>('theme-videos', {
      filters: {
        isActive: { $eq: true },
        pages: { $contains: 'services' },
      },
      populate: ['video'],
    }),
  ]);

  const heroVideo = themeVideos?.[0]?.video;

  return {
    hero: {
      title: FALLBACK_SERVICES_HERO.title,
      subtitle: FALLBACK_SERVICES_HERO.subtitle,
      description: FALLBACK_SERVICES_HERO.description,
      videoUrl: heroVideo ? getMediaUrl(heroVideo) : null,
      ctaText: FALLBACK_SERVICES_HERO.ctaText,
    },
    stats: FALLBACK_STATS,
    services: services.map(service => ({
      id: service.id,
      title: service.title,
      description: service.description || null,
      iconUrl: service.icon ? getMediaUrl(service.icon) : null,
      href: `/services/${service.id}`,
    })),
    excellence: whyUsItems.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description || null,
      iconUrl: item.icon ? getMediaUrl(item.icon) : null,
    })),
    events: events.map(event => ({
      id: event.id,
      title: event.title,
      date: event.date,
      dateLabel: event.dateLabel || null,
      imageUrl: event.image ? getMediaUrl(event.image) : null,
      link: event.link || null,
    })),
  };
}
