import { fetchSingleType, fetchCollection, getMediaUrl } from './client';
import type {
  AboutPageData,
  CertificationData,
  StatItem,
  MapNode,
} from '@/types/strapi';

// Default fallback data
const FALLBACK_ABOUT: Partial<AboutPageData> = {
  heroTitle: 'Le Leader National du Vitrage Automobile',
  heroSubtitle: 'Pare-Brise Express, votre partenaire de confiance depuis 2010.',
  sinceYear: 'Depuis 2010',
  serviceAvailability: 'Service 7j/7',
  certificationsTitle: 'Certifications & Confiance',
  certificationsSubtitle: 'Nous respectons les normes les plus strictes pour garantir votre sécurité.',
  nationalReachTitle: 'Partout au Maroc.',
  nationalReachSubtitle: 'Vraiment.',
  nationalReachDescription: 'Notre réseau couvre l\'ensemble du royaume avec plus de 80 centres et 25 unités mobiles.',
  teamCultureTitle: 'Nos Équipes sur le Terrain',
  teamCultureDescription: 'Formation continue à Casablanca',
  findCenterButtonText: 'Trouver un centre près de chez moi',
};

const FALLBACK_STATS: StatItem[] = [
  { value: '15', label: 'ANNÉES' },
  { value: '80', label: 'CENTRES' },
  { value: '250', label: 'EXPERTS' },
];

const FALLBACK_MAP_NODES: MapNode[] = [
  { id: 'casablanca', x: '28%', y: '38%', size: 24 },
  { id: 'rabat', x: '24%', y: '32%', size: 18 },
  { id: 'marrakech', x: '30%', y: '52%', size: 18 },
  { id: 'fes', x: '35%', y: '28%', size: 16 },
  { id: 'tanger', x: '20%', y: '15%', size: 16 },
  { id: 'agadir', x: '18%', y: '62%', size: 14 },
];

export interface AboutPageContent {
  hero: {
    title: string;
    subtitle: string;
    imageUrl: string | null;
    sinceYear: string;
    serviceAvailability: string;
    stats: StatItem[];
  };
  certifications: {
    title: string;
    subtitle: string;
    items: Array<{
      id: number;
      name: string;
      description: string | null;
      iconUrl: string | null;
    }>;
  };
  nationalReach: {
    title: string;
    subtitle: string;
    description: string;
    mapImageUrl: string | null;
    mapNodes: MapNode[];
  };
  teamCulture: {
    title: string;
    description: string;
    imageUrls: string[];
    findCenterButtonText: string;
  };
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  const [aboutPage, certifications] = await Promise.all([
    fetchSingleType<AboutPageData>('about-page', { populate: '*' }),
    fetchCollection<CertificationData>('certifications', {
      filters: { isActive: { $eq: true } },
      sort: ['order:asc'],
      populate: ['icon'],
    }),
  ]);

  const data = aboutPage || FALLBACK_ABOUT;

  return {
    hero: {
      title: data.heroTitle || FALLBACK_ABOUT.heroTitle!,
      subtitle: data.heroSubtitle || FALLBACK_ABOUT.heroSubtitle!,
      imageUrl: data.heroImage ? getMediaUrl(data.heroImage) : null,
      sinceYear: data.sinceYear || FALLBACK_ABOUT.sinceYear!,
      serviceAvailability: data.serviceAvailability || FALLBACK_ABOUT.serviceAvailability!,
      stats: data.statsItems || FALLBACK_STATS,
    },
    certifications: {
      title: data.certificationsTitle || FALLBACK_ABOUT.certificationsTitle!,
      subtitle: data.certificationsSubtitle || FALLBACK_ABOUT.certificationsSubtitle!,
      items: certifications.map(cert => ({
        id: cert.id,
        name: cert.name,
        description: cert.description || null,
        iconUrl: cert.icon ? getMediaUrl(cert.icon) : null,
      })),
    },
    nationalReach: {
      title: data.nationalReachTitle || FALLBACK_ABOUT.nationalReachTitle!,
      subtitle: data.nationalReachSubtitle || FALLBACK_ABOUT.nationalReachSubtitle!,
      description: data.nationalReachDescription || FALLBACK_ABOUT.nationalReachDescription!,
      mapImageUrl: data.mapImage ? getMediaUrl(data.mapImage) : null,
      mapNodes: data.mapNodes || FALLBACK_MAP_NODES,
    },
    teamCulture: {
      title: data.teamCultureTitle || FALLBACK_ABOUT.teamCultureTitle!,
      description: data.teamCultureDescription || FALLBACK_ABOUT.teamCultureDescription!,
      imageUrls: data.teamImages?.map(img => getMediaUrl(img)) || [],
      findCenterButtonText: data.findCenterButtonText || FALLBACK_ABOUT.findCenterButtonText!,
    },
  };
}
