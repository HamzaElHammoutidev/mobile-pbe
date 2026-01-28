/**
 * Centralized route configuration for Pare-Brise Express
 * All application routes should be imported from here to avoid hardcoded strings
 */

export const ROUTES = {
  // Main pages
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CONTACT: '/contact',
  
  // Booking flow
  BOOKING: '/booking',
  BOOKING_ASSESSMENT: '/booking/assessment',
  BOOKING_SCHEDULE: '/booking/schedule',
  
  // Career pages
  CAREERS: '/carrieres',
  JOB_DETAIL: (jobId: string) => `/carrieres/job/${jobId}` as const,
  JOB_APPLY: (jobId?: string) => jobId ? `/carrieres/apply?jobId=${jobId}` : '/carrieres/apply',
  
  // Other pages
  CENTERS: '/centres',
  ENGAGEMENT: '/engagement',
  LEGAL: '/mentions-legales',
  NETWORK: '/notre-reseau',
  
  // Service sub-pages
  SERVICE_REPAIR: '/services/reparation',
  SERVICE_REPLACEMENT: '/services/remplacement',
  SERVICE_CALIBRATION: '/services/calibrage',
  SERVICE_MOBILE: '/services/atelier-mobile',
  
  // Legal sub-pages
  PRIVACY_POLICY: '/politique-confidentialite',
  CGV: '/cgv',
  COOKIES: '/cookies',
  SITEMAP: '/plan-du-site',
} as const;

// Type for static routes (excludes functions)
export type StaticRoute = {
  [K in keyof typeof ROUTES]: typeof ROUTES[K] extends string ? typeof ROUTES[K] : never;
}[keyof typeof ROUTES];

// Navigation items for the mobile menu
export const NAV_ITEMS = [
  { label: 'Accueil', href: ROUTES.HOME },
  { label: 'Services', href: ROUTES.SERVICES },
  { label: 'Nos Centres', href: ROUTES.CENTERS },
  { label: 'À propos', href: ROUTES.ABOUT },
  { label: 'Carrières', href: ROUTES.CAREERS },
  { label: 'Contact', href: ROUTES.CONTACT },
] as const;

// Footer navigation structure
export const FOOTER_NAV = {
  services: [
    { label: 'Réparation', href: ROUTES.SERVICE_REPAIR },
    { label: 'Remplacement', href: ROUTES.SERVICE_REPLACEMENT },
    { label: 'Calibrage ADAS', href: ROUTES.SERVICE_CALIBRATION },
  ],
  company: [
    { label: 'À propos', href: ROUTES.ABOUT },
    { label: 'Carrières', href: ROUTES.CAREERS },
    { label: 'Contact', href: ROUTES.CONTACT },
    { label: 'Mentions Légales', href: ROUTES.LEGAL },
  ],
} as const;

// External links
export const EXTERNAL_LINKS = {
  WEBSITE: 'https://parebriseexpress.ma',
  INSTAGRAM: 'https://instagram.com/parebriseexpress',
  FACEBOOK: 'https://facebook.com/parebriseexpress',
  LINKEDIN: 'https://linkedin.com/company/parebriseexpress',
} as const;

// Phone numbers
export const PHONE_NUMBERS = {
  MAIN: '0800000908',
  FORMATTED: '08 00 00 09 08',
  CONTACT: '0522000000',
  CONTACT_FORMATTED: '05 22 00 00 00',
} as const;
