import { fetchSingleType, fetchCollection, getMediaUrl, POPULATE } from './client';
import type {
  HomepageData,
  InsurancePartnerData,
  CertificationData,
  ThemeVideoData,
  StatItem,
  ProblemType,
  DecisionCard,
  MapPin,
} from '@/types/strapi';

// Default fallback data for when Strapi is unavailable
const FALLBACK_HOMEPAGE: Partial<HomepageData> = {
  heroTitle: 'Intervention Express',
  heroSubtitle: 'Réparation en 30 Minutes',
  cityPlaceholder: 'Votre ville (ex: Casablanca)',
  ctaButtonText: 'Voir les disponibilités',
  trustTitle: 'Agréé par toutes les assurances',
  trustRating: 4.9,
  trustReviewCount: 1200,
  trustReviewText: 'Basé sur 1200+ avis clients',
  decisionTitle: 'Réparer ou Remplacer ?',
  coverageTitle: 'Partout au Maroc',
  coverageSubtitle: 'Atelier Mobile',
  mobileWorkshopText: 'Intervention gratuite à domicile.',
};

const FALLBACK_PROBLEM_TYPES: ProblemType[] = [
  { id: 'impact', label: 'Impact' },
  { id: 'fissure', label: 'Fissure' },
  { id: 'casse', label: 'Casse' },
];

const FALLBACK_STATS: StatItem[] = [
  { value: '80+', label: 'Centres' },
  { value: '25+', label: 'Unités Mobiles' },
  { value: '15', label: 'Années' },
];

const FALLBACK_REPAIR_CARD: DecisionCard = {
  title: 'Réparation',
  badge: 'Recommandé',
  features: ['Coût minime', '30 mins max'],
  price: '5DH',
};

const FALLBACK_REPLACEMENT_CARD: DecisionCard = {
  title: 'Remplacement',
  badge: 'Si nécessaire',
  features: ['Fissure > 30cm', 'Garantie à vie'],
};

export interface HomepageContent {
  hero: {
    title: string;
    subtitle: string;
    videoUrl: string | null;
    backgroundImageUrl: string | null;
    problemTypes: ProblemType[];
    cityPlaceholder: string;
    ctaButtonText: string;
  };
  trust: {
    title: string;
    rating: number;
    reviewCount: number;
    reviewText: string;
    insurancePartners: Array<{
      id: number;
      name: string;
      logoUrl: string;
    }>;
    certifications: Array<{
      id: number;
      name: string;
      shortName?: string;
      iconUrl: string | null;
    }>;
  };
  decision: {
    title: string;
    repairCard: DecisionCard;
    replacementCard: DecisionCard;
  };
  coverage: {
    title: string;
    subtitle: string;
    mobileWorkshopText: string;
    mapPins: MapPin[];
  };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  // Fetch all data in parallel
  const [homepage, insurancePartners, certifications, themeVideos] = await Promise.all([
    fetchSingleType<HomepageData>('homepage', { populate: '*' }),
    fetchCollection<InsurancePartnerData>('insurance-partners', {
      filters: { isActive: { $eq: true } },
      sort: ['order:asc'],
      populate: ['logo'],
    }),
    fetchCollection<CertificationData>('certifications', {
      filters: { isActive: { $eq: true } },
      sort: ['order:asc'],
      populate: ['icon', 'badge'],
    }),
    fetchCollection<ThemeVideoData>('theme-videos', {
      filters: {
        isActive: { $eq: true },
        pages: { $contains: 'home' },
      },
      populate: ['video'],
    }),
  ]);

  const data = homepage || FALLBACK_HOMEPAGE;
  const heroVideo = themeVideos?.[0]?.video || data.heroVideo;

  return {
    hero: {
      title: data.heroTitle || FALLBACK_HOMEPAGE.heroTitle!,
      subtitle: data.heroSubtitle || FALLBACK_HOMEPAGE.heroSubtitle!,
      videoUrl: heroVideo ? getMediaUrl(heroVideo) : null,
      backgroundImageUrl: data.heroBackgroundImage ? getMediaUrl(data.heroBackgroundImage) : null,
      problemTypes: data.problemTypes || FALLBACK_PROBLEM_TYPES,
      cityPlaceholder: data.cityPlaceholder || FALLBACK_HOMEPAGE.cityPlaceholder!,
      ctaButtonText: data.ctaButtonText || FALLBACK_HOMEPAGE.ctaButtonText!,
    },
    trust: {
      title: data.trustTitle || FALLBACK_HOMEPAGE.trustTitle!,
      rating: data.trustRating || FALLBACK_HOMEPAGE.trustRating!,
      reviewCount: data.trustReviewCount || FALLBACK_HOMEPAGE.trustReviewCount!,
      reviewText: data.trustReviewText || FALLBACK_HOMEPAGE.trustReviewText!,
      insurancePartners: insurancePartners.map(partner => ({
        id: partner.id,
        name: partner.name,
        logoUrl: getMediaUrl(partner.logo),
      })),
      certifications: certifications.map(cert => ({
        id: cert.id,
        name: cert.name,
        shortName: cert.shortName,
        iconUrl: cert.icon ? getMediaUrl(cert.icon) : null,
      })),
    },
    decision: {
      title: data.decisionTitle || FALLBACK_HOMEPAGE.decisionTitle!,
      repairCard: data.repairCard || FALLBACK_REPAIR_CARD,
      replacementCard: data.replacementCard || FALLBACK_REPLACEMENT_CARD,
    },
    coverage: {
      title: data.coverageTitle || FALLBACK_HOMEPAGE.coverageTitle!,
      subtitle: data.coverageSubtitle || FALLBACK_HOMEPAGE.coverageSubtitle!,
      mobileWorkshopText: data.mobileWorkshopText || FALLBACK_HOMEPAGE.mobileWorkshopText!,
      mapPins: data.mapPinPositions || [],
    },
  };
}
