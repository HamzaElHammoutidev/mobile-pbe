'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { GlobalSettings } from '@/lib/api/global';

// Default settings when Strapi is unavailable
const DEFAULT_SETTINGS: GlobalSettings = {
  siteName: 'Pare-Brise Express',
  siteTagline: 'Le spécialiste n°1 du vitrage automobile au Maroc',
  logoUrl: null,
  logoAltUrl: null,
  faviconUrl: null,
  phone: {
    main: '0801 00 0801',
    secondary: null,
    whatsapp: null,
  },
  email: null,
  socialLinks: {
    facebook: 'https://www.facebook.com/parebriseexpress',
    instagram: 'https://www.instagram.com/parebriseexpress_maroc',
    linkedin: 'https://www.linkedin.com/company/pare-brise-express',
    twitter: null,
    youtube: null,
  },
  navigation: [
    { id: 'home', label: 'Accueil', href: '/' },
    { id: 'services', label: 'Services', href: '/services' },
    { id: 'about', label: 'À Propos', href: '/about' },
    { id: 'network', label: 'Notre Réseau', href: '/notre-reseau' },
    { id: 'centres', label: 'Nos Centres', href: '/centres' },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ],
  footerNavigation: [
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
  ],
  footer: {
    tagline: 'Le spécialiste n°1 du vitrage automobile au Maroc. Rapidité, efficacité et sécurité garanties.',
    copyright: `© ${new Date().getFullYear()} Pare-Brise Express Maroc. Tous droits réservés.`,
  },
  header: {
    ctaText: 'Prendre RDV',
  },
  stickyBar: {
    badgeText: 'Urgence?',
    title: 'Prêt à réparer?',
    ctaText: 'Prendre RDV',
  },
  seo: {
    defaultTitle: 'Pare-Brise Express | Leader du Vitrage Automobile au Maroc',
    defaultDescription: 'Service de réparation et remplacement de pare-brise. Agréé par toutes les assurances. Intervention en 30 minutes.',
    ogImageUrl: null,
  },
};

const GlobalSettingsContext = createContext<GlobalSettings>(DEFAULT_SETTINGS);

interface GlobalSettingsProviderProps {
  children: ReactNode;
  settings?: GlobalSettings | null;
}

export function GlobalSettingsProvider({ 
  children, 
  settings 
}: GlobalSettingsProviderProps) {
  const value = settings || DEFAULT_SETTINGS;
  
  return (
    <GlobalSettingsContext.Provider value={value}>
      {children}
    </GlobalSettingsContext.Provider>
  );
}

export function useGlobalSettings(): GlobalSettings {
  const context = useContext(GlobalSettingsContext);
  if (!context) {
    console.warn('useGlobalSettings must be used within GlobalSettingsProvider');
    return DEFAULT_SETTINGS;
  }
  return context;
}

export { DEFAULT_SETTINGS };
