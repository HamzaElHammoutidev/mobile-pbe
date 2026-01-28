import { fetchSingleType, fetchCollection, submitToStrapi, getMediaUrl } from './client';
import type {
  ContactPageData,
  ContactInfoData,
  CentreData,
  ContactMessageData,
} from '@/types/strapi';

// Default fallback data
const FALLBACK_CONTACT_PAGE: Partial<ContactPageData> = {
  pageTitle: 'How can we help you today?',
  formTitle: 'Send a Request',
  submitButtonText: 'Submit Request',
  submittingText: 'Sending...',
  successMessage: 'Request Sent!',
  whatsappDefaultMessage: 'Bonjour, j\'ai besoin d\'aide pour mon pare-brise.',
};

const FALLBACK_FORM_LABELS = {
  name: 'Full Name',
  phone: 'Phone Number',
  vehicle: 'Vehicle Model (Optional)',
  message: 'Message',
};

const FALLBACK_FORM_PLACEHOLDERS = {
  name: 'Your Name',
  phone: '06 XX XX XX XX',
  vehicle: 'e.g. Dacia Logan',
  message: 'Describe your issue...',
};

const FALLBACK_QUICK_ACTIONS: Array<{
  id: string;
  type: 'call' | 'whatsapp' | 'email' | 'map';
  label: string;
  sublabel: string;
  value?: string;
}> = [
  { id: 'call', type: 'call', label: 'Call Support', sublabel: 'Urgent?' },
  { id: 'whatsapp', type: 'whatsapp', label: 'WhatsApp', sublabel: 'Chat now' },
  { id: 'email', type: 'email', label: 'Email Quote', sublabel: 'Get a price estimate' },
  { id: 'mobile', type: 'map', label: 'Mobile Unit', sublabel: 'We come to you' },
];

export interface ContactPageContent {
  pageTitle: string;
  quickActions: Array<{
    id: string;
    type: 'call' | 'whatsapp' | 'email' | 'map';
    label: string;
    sublabel: string;
    value?: string;
  }>;
  form: {
    title: string;
    labels: {
      name: string;
      phone: string;
      vehicle: string;
      message: string;
    };
    placeholders: {
      name: string;
      phone: string;
      vehicle: string;
      message: string;
    };
    submitText: string;
    submittingText: string;
    successMessage: string;
  };
  contactInfo: {
    phone: string | null;
    email: string | null;
    address: string | null;
    whatsappNumber: string | null;
    whatsappMessage: string;
    socialLinks: {
      facebook: string | null;
      instagram: string | null;
      linkedin: string | null;
      twitter: string | null;
    };
  };
  nearestCenter: {
    lat: number;
    lng: number;
    name: string;
  } | null;
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  const [contactPage, contactInfo, centres] = await Promise.all([
    fetchSingleType<ContactPageData>('contact-page', { populate: '*' }),
    fetchSingleType<ContactInfoData>('contact-info'),
    fetchCollection<CentreData>('centres', {
      filters: { isActive: { $eq: true } },
      pagination: { limit: 1 },
    }),
  ]);

  const pageData = contactPage || FALLBACK_CONTACT_PAGE;
  const defaultCenter = centres[0];

  return {
    pageTitle: pageData.pageTitle || FALLBACK_CONTACT_PAGE.pageTitle!,
    quickActions: (pageData.quickActions as any) || FALLBACK_QUICK_ACTIONS,
    form: {
      title: pageData.formTitle || FALLBACK_CONTACT_PAGE.formTitle!,
      labels: (pageData.formLabels as any) || FALLBACK_FORM_LABELS,
      placeholders: (pageData.formPlaceholders as any) || FALLBACK_FORM_PLACEHOLDERS,
      submitText: pageData.submitButtonText || FALLBACK_CONTACT_PAGE.submitButtonText!,
      submittingText: pageData.submittingText || FALLBACK_CONTACT_PAGE.submittingText!,
      successMessage: pageData.successMessage || FALLBACK_CONTACT_PAGE.successMessage!,
    },
    contactInfo: {
      phone: contactInfo?.phone || null,
      email: contactInfo?.email || null,
      address: contactInfo?.address || null,
      whatsappNumber: contactInfo?.phone || null,
      whatsappMessage: pageData.whatsappDefaultMessage || FALLBACK_CONTACT_PAGE.whatsappDefaultMessage!,
      socialLinks: {
        facebook: contactInfo?.facebookUrl || null,
        instagram: contactInfo?.instagramUrl || null,
        linkedin: contactInfo?.linkedinUrl || null,
        twitter: contactInfo?.twitterUrl || null,
      },
    },
    nearestCenter: defaultCenter ? {
      lat: defaultCenter.latitude,
      lng: defaultCenter.longitude,
      name: defaultCenter.title,
    } : null,
  } as ContactPageContent;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export async function submitContactForm(
  payload: ContactFormPayload
): Promise<{ success: boolean; error?: string }> {
  try {
    const submission = await submitToStrapi<ContactMessageData>('contact-messages', {
      name: payload.name,
      email: payload.email,
      subject: payload.subject || 'Contact Form Submission',
      message: payload.message,
      isRead: false,
    });

    if (!submission) {
      return { success: false, error: 'Failed to submit message' };
    }

    return { success: true };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
