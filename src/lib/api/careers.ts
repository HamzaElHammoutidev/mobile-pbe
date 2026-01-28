import { fetchCollection, fetchById, submitToStrapi, uploadMedia, getMediaUrl } from './client';
import type { JobData, CvSubmissionData } from '@/types/strapi';

// Default fallback data
const FALLBACK_CAREERS_PAGE = {
  heroTitle: 'Recrutement 2025',
  heroSubtitle: 'Devenez un Expert du Vitrage.',
  heroDescription: 'Rejoignez le leader marocain du vitrage automobile et construisez votre carrière avec nous.',
  ctaText: 'Voir les offres',
  benefitsTitle: 'Pourquoi nous rejoindre ?',
  openPositionsTitle: 'Open Positions',
  fastTrackTitle: 'Fast Track Application',
  fastTrackDescription: "Don't see the right role? Send us your CV and we'll keep you in mind for future opportunities.",
};

const FALLBACK_BENEFITS = [
  {
    id: 'pbe-academy',
    icon: 'GraduationCap',
    title: 'PBE Academy',
    description: 'Formation continue et certification technique reconnue.',
  },
  {
    id: 'stability',
    icon: 'Shield',
    title: 'Stabilité & Carrière',
    description: 'CDI, avantages sociaux et perspectives d\'évolution.',
  },
  {
    id: 'tools',
    icon: 'Wrench',
    title: 'Outils High-Tech',
    description: 'Travaillez avec des équipements de pointe.',
  },
];

export interface CareersPageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string | null;
    ctaText: string;
  };
  benefits: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
  }>;
  openPositionsTitle: string;
  jobs: Array<{
    id: number;
    title: string;
    location: string | null;
    category: string | null;
    isNew: boolean;
    isUrgent: boolean;
  }>;
  fastTrack: {
    title: string;
    description: string;
  };
}

export interface JobDetailContent {
  id: number;
  title: string;
  location: string | null;
  category: string | null;
  description: string | null;
  requirements: string | null;
  postedDate: string;
  isActive: boolean;
}

export async function getCareersPageContent(): Promise<CareersPageContent> {
  const jobs = await fetchCollection<JobData>('jobs', {
    filters: { isActive: { $eq: true } },
    sort: ['createdAt:desc'],
  }, 'dynamic');

  // Determine if job is new (posted within last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  return {
    hero: {
      title: FALLBACK_CAREERS_PAGE.heroTitle,
      subtitle: FALLBACK_CAREERS_PAGE.heroSubtitle,
      description: FALLBACK_CAREERS_PAGE.heroDescription,
      imageUrl: null,
      ctaText: FALLBACK_CAREERS_PAGE.ctaText,
    },
    benefits: FALLBACK_BENEFITS,
    openPositionsTitle: FALLBACK_CAREERS_PAGE.openPositionsTitle,
    jobs: jobs.map(job => ({
      id: job.id,
      title: job.title,
      location: job.location || null,
      category: job.category || null,
      isNew: new Date(job.createdAt) > sevenDaysAgo,
      isUrgent: job.expirationDate ? new Date(job.expirationDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : false,
    })),
    fastTrack: {
      title: FALLBACK_CAREERS_PAGE.fastTrackTitle,
      description: FALLBACK_CAREERS_PAGE.fastTrackDescription,
    },
  };
}

export async function getJobDetail(jobId: string | number): Promise<JobDetailContent | null> {
  const job = await fetchById<JobData>('jobs', jobId, {}, 'dynamic');
  
  if (!job) return null;

  return {
    id: job.id,
    title: job.title,
    location: job.location || null,
    category: job.category || null,
    description: job.description || null,
    requirements: job.requirements || null,
    postedDate: job.createdAt,
    isActive: job.isActive,
  };
}

export interface CvSubmissionPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message?: string;
  jobId?: number;
}

export async function submitCvApplication(
  payload: CvSubmissionPayload,
  cvFile: File
): Promise<{ success: boolean; error?: string }> {
  try {
    // First upload the CV file
    const uploadedFile = await uploadMedia(cvFile);
    
    if (!uploadedFile) {
      return { success: false, error: 'Failed to upload CV file' };
    }

    // Then submit the application
    const submission = await submitToStrapi<CvSubmissionData>('cv-submissions', {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: payload.phone,
      message: payload.message,
      cvFile: uploadedFile.id,
      job: payload.jobId,
    });

    if (!submission) {
      return { success: false, error: 'Failed to submit application' };
    }

    return { success: true };
  } catch (error) {
    console.error('CV submission error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
