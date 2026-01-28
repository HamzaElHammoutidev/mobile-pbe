import { fetchSingleType, fetchCollection, getMediaUrl } from './client';
import type {
  EngagementPageData,
  CertificationData,
  PromiseItem,
  BenefitItem,
  ProcessStep,
  FeatureItem,
} from '@/types/strapi';

// Default fallback data
const FALLBACK_ENGAGEMENT: Partial<EngagementPageData> = {
  heroTitle: 'Votre Sécurité, Notre Priorité Absolue',
  heroSubtitle: 'Confiance & Qualité',
  heroDescription: 'Pare-Brise Express s\'engage à vous offrir le meilleur service de vitrage automobile au Maroc.',
  promisesTitle: 'Nos Promesses',
  benefitsTitle: 'Pourquoi Nous Choisir?',
  certificationsTitle: 'Nos Certifications Officielles',
  mobileWorkshopTitle: 'Atelier Mobile',
  mobileWorkshopSubtitle: 'On vient chez vous !',
  mobileWorkshopDescription: 'Pas le temps de vous déplacer? Profitez de notre service mobile pour une intervention directement chez vous.',
  mobileWorkshopCtaText: 'Réserver un Atelier Mobile',
};

const FALLBACK_PROMISES: PromiseItem[] = [
  { icon: 'ShieldCheck', title: 'Qualité du vitrage', description: 'Nous nous engageons à offrir des prestations de haute qualité guidées par la quête de l’excellence.', imageUrl: 'https://parebriseexpress.ma/images/Vitrage.jpg' },
  { icon: 'Shield', title: 'Respect des normes de sécurité', description: 'Nous respectons des normes strictes pour chaque intervention, avec un souci constant de sécurité et de durabilité.', imageUrl: 'https://parebriseexpress.ma/images/respect-normes.jpeg' },
  { icon: 'Zap', title: 'Rapidité d\'exécution', description: 'Toutes nos réparations sont réalisées dans les plus brefs délais pour vous remettre sur la route rapidement.', imageUrl: 'https://parebriseexpress.ma/storage/WhatsApp%20Image%202024-11-15%20at%2016.49.58.jpeg' },
  { icon: 'Check', title: 'Des procédures simplifiées', description: 'Nous optimisons chaque étape pour vous faire gagner du temps avec une gestion administrative complète.', imageUrl: 'https://parebriseexpress.ma/images/procedure-simpl.jpeg' },
  { icon: 'User', title: 'Qualité du service', description: 'Une équipe d\'experts à votre écoute pour une expérience client irréprochable.', imageUrl: 'https://parebriseexpress.ma/images/qulite.jpg' },
];

const FALLBACK_BENEFITS: BenefitItem[] = [
  { icon: 'FileText', title: 'Gestion administrative complète', description: 'Nous traitons directement avec votre assurance.' },
  { icon: 'Clock', title: 'Intervention en 1h chrono', description: 'Service ultra-rapide pour minimiser votre attente.' },
  { icon: 'Gift', title: 'Franchise offerte', description: 'Nous offrons la franchise selon les conditions de votre contrat.' },
];

const FALLBACK_PROCESS_STEPS: ProcessStep[] = [
  { step: 1, title: 'Déclarez le bris', description: 'Contactez-nous pour déclarer votre sinistre.' },
  { step: 2, title: 'Gestion Dossier', description: 'Nous prenons en charge votre dossier assurance.' },
  { step: 3, title: 'Réparation immédiate', description: 'Intervention rapide par nos experts.' },
];

const FALLBACK_MOBILE_FEATURES: FeatureItem[] = [
  { icon: 'Gift', text: 'Service Gratuit' },
  { icon: 'Truck', text: 'Déplacement offert' },
  { icon: 'Clock', text: 'Intervention rapide' },
];

export interface EngagementPageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  promises: {
    title: string;
    items: PromiseItem[];
  };
  benefits: {
    title: string;
    items: BenefitItem[];
  };
  certifications: {
    title: string;
    items: Array<{
      id: number;
      name: string;
      shortName: string | null;
      description: string | null;
      iconUrl: string | null;
      badgeUrl: string | null;
    }>;
  };
  processSteps: ProcessStep[];
  mobileWorkshop: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string | null;
    features: FeatureItem[];
    ctaText: string;
  };
}

export async function getEngagementPageContent(): Promise<EngagementPageContent> {
  const [engagementPage, certifications] = await Promise.all([
    fetchSingleType<EngagementPageData>('engagement-page', { populate: '*' }),
    fetchCollection<CertificationData>('certifications', {
      filters: { isActive: { $eq: true } },
      sort: ['order:asc'],
      populate: ['icon', 'badge'],
    }),
  ]);

  const data = engagementPage || FALLBACK_ENGAGEMENT;

  return {
    hero: {
      title: data.heroTitle || FALLBACK_ENGAGEMENT.heroTitle!,
      subtitle: data.heroSubtitle || FALLBACK_ENGAGEMENT.heroSubtitle!,
      description: data.heroDescription || FALLBACK_ENGAGEMENT.heroDescription!,
    },
    promises: {
      title: data.promisesTitle || FALLBACK_ENGAGEMENT.promisesTitle!,
      items: data.promises || FALLBACK_PROMISES,
    },
    benefits: {
      title: data.benefitsTitle || FALLBACK_ENGAGEMENT.benefitsTitle!,
      items: data.benefits || FALLBACK_BENEFITS,
    },
    certifications: {
      title: data.certificationsTitle || FALLBACK_ENGAGEMENT.certificationsTitle!,
      items: certifications.map(cert => ({
        id: cert.id,
        name: cert.name,
        shortName: cert.shortName || null,
        description: cert.description || null,
        iconUrl: cert.icon ? getMediaUrl(cert.icon) : null,
        badgeUrl: cert.badge ? getMediaUrl(cert.badge) : null,
      })),
    },
    processSteps: data.processSteps || FALLBACK_PROCESS_STEPS,
    mobileWorkshop: {
      title: data.mobileWorkshopTitle || FALLBACK_ENGAGEMENT.mobileWorkshopTitle!,
      subtitle: data.mobileWorkshopSubtitle || FALLBACK_ENGAGEMENT.mobileWorkshopSubtitle!,
      description: data.mobileWorkshopDescription || FALLBACK_ENGAGEMENT.mobileWorkshopDescription!,
      imageUrl: data.mobileWorkshopImage ? getMediaUrl(data.mobileWorkshopImage) : null,
      features: data.mobileWorkshopFeatures || FALLBACK_MOBILE_FEATURES,
      ctaText: data.mobileWorkshopCtaText || FALLBACK_ENGAGEMENT.mobileWorkshopCtaText!,
    },
  };
}
