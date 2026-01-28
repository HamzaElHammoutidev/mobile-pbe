import { fetchSingleType, fetchByField, getMediaUrl } from './client';
import type {
  GlobalSettingsData,
  ContactInfoData,
  PageSeoData,
  NavigationItem,
  FooterNavSection,
} from '@/types/strapi';

// Default fallback data
const FALLBACK_GLOBAL: Partial<GlobalSettingsData> = {
  siteName: 'Pare-Brise Express',
  siteTagline: 'Le spécialiste n°1 du vitrage automobile au Maroc',
  mainPhoneNumber: '0801 00 0801',
  footerTagline: 'Le spécialiste n°1 du vitrage automobile au Maroc. Service rapide, qualité garantie, agréé par toutes les assurances.',
  headerCtaText: 'Prendre RDV',
  stickyBarBadgeText: 'Urgence?',
  stickyBarTitle: 'Prêt à réparer?',
  stickyBarCtaText: 'Prendre RDV',
};

const FALLBACK_NAV_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'Accueil', href: '/' },
  { id: 'services', label: 'Services', href: '/services' },
  { id: 'about', label: 'À Propos', href: '/about' },
  { id: 'centres', label: 'Nos Centres', href: '/centres' },
  { id: 'contact', label: 'Contact', href: '/contact' },
];

const FALLBACK_FOOTER_NAV: FooterNavSection[] = [
  {
    title: 'Services',
    links: [
      { id: 'reparation', label: 'Réparation', href: '/services/reparation' },
      { id: 'remplacement', label: 'Remplacement', href: '/services/remplacement' },
      { id: 'calibrage', label: 'Calibrage ADAS', href: '/services/calibrage' },
      { id: 'mobile', label: 'Atelier Mobile', href: '/services/atelier-mobile' },
    ],
  },
  {
    title: 'Société',
    links: [
      { id: 'about', label: 'À Propos', href: '/about' },
      { id: 'careers', label: 'Carrières', href: '/carrieres' },
      { id: 'engagement', label: 'Engagements', href: '/engagement' },
      { id: 'contact', label: 'Contact', href: '/contact' },
    ],
  },
];

export interface GlobalSettings {
  siteName: string;
  siteTagline: string;
  logoUrl: string | null;
  logoAltUrl: string | null;
  faviconUrl: string | null;
  phone: {
    main: string | null;
    secondary: string | null;
    whatsapp: string | null;
  };
  email: string | null;
  socialLinks: {
    facebook: string | null;
    instagram: string | null;
    linkedin: string | null;
    twitter: string | null;
    youtube: string | null;
  };
  navigation: NavigationItem[];
  footerNavigation: FooterNavSection[];
  footer: {
    tagline: string;
    copyright: string;
  };
  header: {
    ctaText: string;
  };
  stickyBar: {
    badgeText: string;
    title: string;
    ctaText: string;
  };
  seo: {
    defaultTitle: string | null;
    defaultDescription: string | null;
    ogImageUrl: string | null;
  };
}

export async function getGlobalSettings(): Promise<GlobalSettings> {
  const [globalSettings, contactInfo] = await Promise.all([
    fetchSingleType<GlobalSettingsData>('global-settings', { populate: '*' }),
    fetchSingleType<ContactInfoData>('contact-info'),
  ]);

  const data = globalSettings || FALLBACK_GLOBAL;
  const currentYear = new Date().getFullYear();

  return {
    siteName: data.siteName || FALLBACK_GLOBAL.siteName!,
    siteTagline: data.siteTagline || FALLBACK_GLOBAL.siteTagline!,
    logoUrl: data.logo ? getMediaUrl(data.logo) : null,
    logoAltUrl: data.logoAlt ? getMediaUrl(data.logoAlt) : null,
    faviconUrl: data.favicon ? getMediaUrl(data.favicon) : null,
    phone: {
      main: data.mainPhoneNumber || contactInfo?.phone || FALLBACK_GLOBAL.mainPhoneNumber || null,
      secondary: data.secondaryPhoneNumber || null,
      whatsapp: data.whatsappNumber || null,
    },
    email: data.mainEmail || contactInfo?.email || null,
    socialLinks: {
      facebook: data.facebookUrl || contactInfo?.facebookUrl || null,
      instagram: data.instagramUrl || contactInfo?.instagramUrl || null,
      linkedin: data.linkedinUrl || contactInfo?.linkedinUrl || null,
      twitter: data.twitterUrl || contactInfo?.twitterUrl || null,
      youtube: data.youtubeUrl || null,
    },
    navigation: data.navigationItems || FALLBACK_NAV_ITEMS,
    footerNavigation: data.footerNavigation || FALLBACK_FOOTER_NAV,
    footer: {
      tagline: data.footerTagline || FALLBACK_GLOBAL.footerTagline!,
      copyright: data.footerCopyright || `© ${currentYear} Pare-Brise Express. Tous droits réservés.`,
    },
    header: {
      ctaText: data.headerCtaText || FALLBACK_GLOBAL.headerCtaText!,
    },
    stickyBar: {
      badgeText: data.stickyBarBadgeText || FALLBACK_GLOBAL.stickyBarBadgeText!,
      title: data.stickyBarTitle || FALLBACK_GLOBAL.stickyBarTitle!,
      ctaText: data.stickyBarCtaText || FALLBACK_GLOBAL.stickyBarCtaText!,
    },
    seo: {
      defaultTitle: data.defaultSeoTitle || null,
      defaultDescription: data.defaultSeoDescription || null,
      ogImageUrl: data.defaultOgImage ? getMediaUrl(data.defaultOgImage) : null,
    },
  };
}

export interface PageSeo {
  title: string;
  description: string | null;
  keywords: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageUrl: string | null;
  canonicalUrl: string | null;
  noIndex: boolean;
  noFollow: boolean;
  structuredData: Record<string, unknown> | null;
}

export async function getPageSeo(
  page: PageSeoData['page']
): Promise<PageSeo | null> {
  const seoData = await fetchByField<PageSeoData>('page-seos', 'page', page, { populate: '*' });

  if (!seoData) return null;

  return {
    title: seoData.title,
    description: seoData.description || null,
    keywords: seoData.keywords || null,
    ogTitle: seoData.ogTitle || null,
    ogDescription: seoData.ogDescription || null,
    ogImageUrl: seoData.ogImage ? getMediaUrl(seoData.ogImage) : null,
    canonicalUrl: seoData.canonicalUrl || null,
    noIndex: seoData.noIndex,
    noFollow: seoData.noFollow,
    structuredData: seoData.structuredData || null,
  };
}

// Helper to generate metadata for Next.js pages
export async function generatePageMetadata(page: PageSeoData['page']) {
  const [globalSettings, pageSeo] = await Promise.all([
    getGlobalSettings(),
    getPageSeo(page),
  ]);

  const title = pageSeo?.title || globalSettings.seo.defaultTitle || globalSettings.siteName;
  const description = pageSeo?.description || globalSettings.seo.defaultDescription || globalSettings.siteTagline;

  return {
    title,
    description,
    keywords: pageSeo?.keywords?.split(',').map(k => k.trim()),
    openGraph: {
      title: pageSeo?.ogTitle || title,
      description: pageSeo?.ogDescription || description,
      images: pageSeo?.ogImageUrl ? [pageSeo.ogImageUrl] : globalSettings.seo.ogImageUrl ? [globalSettings.seo.ogImageUrl] : [],
      siteName: globalSettings.siteName,
    },
    robots: {
      index: !pageSeo?.noIndex,
      follow: !pageSeo?.noFollow,
    },
    ...(pageSeo?.canonicalUrl && { alternates: { canonical: pageSeo.canonicalUrl } }),
  };
}
