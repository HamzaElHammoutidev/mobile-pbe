// Re-export all API modules
// This file provides a central import point for all Strapi API functions

// Core client utilities
export {
  getStrapiURL,
  getMediaUrl,
  getOptimizedImageUrl,
  fetchAPI,
  fetchSingleType,
  fetchCollection,
  fetchById,
  fetchByField,
  submitToStrapi,
  uploadMedia,
  populateDeep,
  POPULATE,
} from './client';

// Homepage API
export {
  getHomepageContent,
  type HomepageContent,
} from './homepage';

// About Page API
export {
  getAboutPageContent,
  type AboutPageContent,
} from './about';

// Services Page API
export {
  getServicesPageContent,
  type ServicesPageContent,
} from './services';

// Careers API
export {
  getCareersPageContent,
  getJobDetail,
  submitCvApplication,
  type CareersPageContent,
  type JobDetailContent,
  type CvSubmissionPayload,
} from './careers';

// Contact API
export {
  getContactPageContent,
  submitContactForm,
  type ContactPageContent,
  type ContactFormPayload,
} from './contact';

// Network/Centres API
export {
  getNetworkPageContent,
  getAllCentres,
  getCentreById,
  getNearestCentres,
  calculateDistance,
  type NetworkPageContent,
  type CentreInfo,
  type CentreDisplay,
} from './network';

// Engagement API
export {
  getEngagementPageContent,
  type EngagementPageContent,
} from './engagement';

// Legal API
export {
  getLegalPageContent,
  type LegalPageContent,
} from './legal';

// Booking API
export {
  getBookingPageContent,
  getTimeSlots,
  getBookingCentres,
  getNearestBookingCentres,
  type BookingPageContent,
  type BookingServiceType,
  type TimeSlot,
  type BookingCentre,
  type DamageAssessmentContent,
} from './booking';

// Global Settings API
export {
  getGlobalSettings,
  getPageSeo,
  generatePageMetadata,
  type GlobalSettings,
  type PageSeo,
} from './global';
