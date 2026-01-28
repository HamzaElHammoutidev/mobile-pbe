// Strapi API Response Types
// Generated for PBE Strapi CMS integration

// Base Strapi types
export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  size: number;
  name: string;
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
  mime: string;
  name: string;
}

export interface StrapiBaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
}

// Homepage Types
export interface HomepageData extends StrapiBaseEntity {
  heroTitle: string;
  heroSubtitle?: string;
  heroVideo?: StrapiMedia;
  heroBackgroundImage?: StrapiMedia;
  problemTypes?: ProblemType[];
  cityPlaceholder?: string;
  ctaButtonText?: string;
  statsItems?: StatItem[];
  trustTitle?: string;
  trustRating?: number;
  trustReviewCount?: number;
  trustReviewText?: string;
  decisionTitle?: string;
  repairCard?: DecisionCard;
  replacementCard?: DecisionCard;
  coverageTitle?: string;
  coverageSubtitle?: string;
  mobileWorkshopText?: string;
  mapPinPositions?: MapPin[];
}

export interface ProblemType {
  id: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

export interface DecisionCard {
  title: string;
  badge?: string;
  features: string[];
  price?: string;
}

export interface MapPin {
  id: string;
  name: string;
  x: string;
  y: string;
  size?: number;
}

// About Page Types
export interface AboutPageData extends StrapiBaseEntity {
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: StrapiMedia;
  sinceYear?: string;
  serviceAvailability?: string;
  statsItems?: StatItem[];
  certificationsTitle?: string;
  certificationsSubtitle?: string;
  nationalReachTitle?: string;
  nationalReachSubtitle?: string;
  nationalReachDescription?: string;
  mapImage?: StrapiMedia;
  mapNodes?: MapNode[];
  teamCultureTitle?: string;
  teamCultureDescription?: string;
  teamImages?: StrapiMedia[];
  findCenterButtonText?: string;
}

export interface MapNode {
  id: string;
  name?: string;
  x: string;
  y: string;
  size?: number;
}

// Engagement Page Types
export interface EngagementPageData extends StrapiBaseEntity {
  heroTitle: string;
  heroSubtitle?: string;
  heroDescription?: string;
  promisesTitle?: string;
  promises?: PromiseItem[];
  benefitsTitle?: string;
  benefits?: BenefitItem[];
  certificationsTitle?: string;
  processSteps?: ProcessStep[];
  mobileWorkshopTitle?: string;
  mobileWorkshopSubtitle?: string;
  mobileWorkshopDescription?: string;
  mobileWorkshopImage?: StrapiMedia;
  mobileWorkshopFeatures?: FeatureItem[];
  mobileWorkshopCtaText?: string;
}

export interface PromiseItem {
  icon?: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface BenefitItem {
  icon?: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  description?: string;
}

export interface FeatureItem {
  icon?: string;
  text: string;
}

// Contact Page Types
export interface ContactPageData extends StrapiBaseEntity {
  pageTitle: string;
  quickActions?: QuickAction[];
  formTitle?: string;
  formLabels?: FormLabels;
  formPlaceholders?: FormPlaceholders;
  submitButtonText?: string;
  submittingText?: string;
  successMessage?: string;
  mapDefaultCenter?: MapCenter;
  whatsappDefaultMessage?: string;
}

export interface QuickAction {
  id: string;
  type: 'call' | 'whatsapp' | 'email' | 'map';
  label: string;
  sublabel?: string;
  value?: string;
}

export interface FormLabels {
  name?: string;
  phone?: string;
  vehicle?: string;
  message?: string;
}

export interface FormPlaceholders {
  name?: string;
  phone?: string;
  vehicle?: string;
  message?: string;
}

export interface MapCenter {
  lat: number;
  lng: number;
  name?: string;
}

// Legal Page Types
export interface LegalPageData extends StrapiBaseEntity {
  pageTitle: string;
  pageSubtitle?: string;
  companyName: string;
  companyType?: string;
  capitalAmount?: string;
  companyAddress?: string;
  companyEmail?: string;
  legalIdentifiers?: LegalIdentifier[];
  editorSectionTitle?: string;
  headquartersSectionTitle?: string;
  contactSectionTitle?: string;
  identifiersSectionTitle?: string;
  hostingProvider?: string;
  hostingLegalEntity?: string;
  hostingAddress?: string;
  hostingSectionTitle?: string;
  dataProtectionTitle?: string;
  cndpAuthorization?: string;
  dataProtectionText?: string;
  privacyPolicyLinkText?: string;
  lastUpdatedDate?: string;
  lastUpdatedLabel?: string;
}

export interface LegalIdentifier {
  labelText: string;
  identifierValue: string;
}

// Network Page Types
export interface NetworkPageData extends StrapiBaseEntity {
  searchPlaceholder?: string;
  statsText?: string;
  statsSubtext?: string;
  openLabel?: string;
  closedLabel?: string;
  untilLabel?: string;
  distanceLabel?: string;
  goButtonText?: string;
  callButtonText?: string;
  selectCenterText?: string;
  mobileWorkshopTitle?: string;
  mobileWorkshopSubtitle?: string;
  mobileWorkshopDescription?: string;
  mobileWorkshopImages?: StrapiMedia[];
  mobileWorkshopFeatures?: FeatureItem[];
  helpSectionTitle?: string;
  bookingCtaText?: string;
  mapDefaultBounds?: MapBounds;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

// Global Settings Types
export interface GlobalSettingsData extends StrapiBaseEntity {
  siteName: string;
  siteTagline?: string;
  logo?: StrapiMedia;
  logoAlt?: StrapiMedia;
  favicon?: StrapiMedia;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultOgImage?: StrapiMedia;
  mainPhoneNumber?: string;
  secondaryPhoneNumber?: string;
  whatsappNumber?: string;
  mainEmail?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  footerTagline?: string;
  footerCopyright?: string;
  headerCtaText?: string;
  stickyBarBadgeText?: string;
  stickyBarTitle?: string;
  stickyBarCtaText?: string;
  navigationItems?: NavigationItem[];
  footerNavigation?: FooterNavSection[];
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterNavSection {
  title: string;
  links: NavigationItem[];
}

// Collection Types

// Certification
export interface CertificationData extends StrapiBaseEntity {
  name: string;
  shortName?: string;
  description?: string;
  icon?: StrapiMedia;
  badge?: StrapiMedia;
  order: number;
  isActive: boolean;
}

// Insurance Partner
export interface InsurancePartnerData extends StrapiBaseEntity {
  name: string;
  logo: StrapiMedia;
  logoLight?: StrapiMedia;
  website?: string;
  order: number;
  isActive: boolean;
  isFeatured: boolean;
}

// Event
export interface EventData extends StrapiBaseEntity {
  title: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  date: string;
  dateLabel?: string;
  image?: StrapiMedia;
  gallery?: StrapiMedia[];
  link?: string;
  order: number;
  isFeatured: boolean;
  category: 'team-building' | 'salon' | 'partnership' | 'training' | 'other';
}

// Booking Service Type
export interface BookingServiceTypeData extends StrapiBaseEntity {
  identifier: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: StrapiMedia;
  icon?: StrapiMedia;
  badgeText?: string;
  badgeVariant: 'highlight' | 'neutral' | 'warning' | 'success';
  priceModifier: number;
  priceModifierLabel?: string;
  order: number;
  isActive: boolean;
  isDefault: boolean;
}

// Time Slot Template
export interface TimeSlotTemplateData extends StrapiBaseEntity {
  time: string;
  displayTime?: string;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  isAvailable: boolean;
  order: number;
  slotDurationMinutes: number;
  maxBookings: number;
}

// Page SEO
export interface PageSeoData extends StrapiBaseEntity {
  page: 'home' | 'about' | 'services' | 'contact' | 'centres' | 'engagement' | 'mentions-legales' | 'booking' | 'carrieres' | 'politique-confidentialite' | 'cgv';
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: StrapiMedia;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl?: string;
  noIndex: boolean;
  noFollow: boolean;
  structuredData?: Record<string, unknown>;
}

// Existing Content Types (already in Strapi)

// Centre
export interface CentreData extends StrapiBaseEntity {
  title: string;
  latitude: number;
  longitude: number;
  address?: string;
  phone?: string;
  hours?: string;
  email?: string;
  isActive: boolean;
}

// Job
export interface JobData extends StrapiBaseEntity {
  title: string;
  description?: string;
  requirements?: string;
  category?: string;
  location?: string;
  expirationDate?: string;
  isActive: boolean;
}

// Service
export interface ServiceData extends StrapiBaseEntity {
  title: string;
  description?: string;
  icon?: StrapiMedia;
  order: number;
}

// Testimonial
export interface TestimonialData extends StrapiBaseEntity {
  name: string;
  content: string;
  rating?: number;
  photo?: StrapiMedia;
  company?: string;
}

// FAQ
export interface FaqData extends StrapiBaseEntity {
  question: string;
  answer: string;
  category?: string;
  order: number;
}

// Why Us
export interface WhyUsData extends StrapiBaseEntity {
  title: string;
  description?: string;
  icon?: StrapiMedia;
  order: number;
}

// Theme Video
export interface ThemeVideoData extends StrapiBaseEntity {
  video: StrapiMedia;
  pages: string[];
  isActive: boolean;
}

// Contact Info
export interface ContactInfoData extends StrapiBaseEntity {
  email?: string;
  phone?: string;
  address?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}

// Contact Message (for form submissions)
export interface ContactMessageData extends StrapiBaseEntity {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  isRead: boolean;
}

// CV Submission
export interface CvSubmissionData extends StrapiBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  cvFile: StrapiMedia;
  message?: string;
  job?: JobData;
}

// Declaration
export interface DeclarationData extends StrapiBaseEntity {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  cin?: string;
  city?: string;
  address?: string;
  declarationType?: string;
  description?: string;
  attachments?: StrapiMedia[];
  status: 'pending' | 'processing' | 'completed' | 'rejected';
}

// Advertisement
export interface AdvertisementData extends StrapiBaseEntity {
  title: string;
  image: StrapiMedia;
  link?: string;
  isVisible: boolean;
  order: number;
}
