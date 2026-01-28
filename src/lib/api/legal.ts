import { fetchSingleType } from './client';
import type { LegalPageData, LegalIdentifier } from '@/types/strapi';

// Default fallback data
const FALLBACK_LEGAL: Partial<LegalPageData> = {
  pageTitle: 'INFORMATIONS LÉGALES & CONFORMITÉ',
  pageSubtitle: 'Transparence totale sur notre identité et nos pratiques.',
  companyName: 'PARE-BRISE EXPRESS SARL',
  companyType: 'Société à Responsabilité Limitée',
  capitalAmount: '1.000.000 DHS',
  companyAddress: '123 Boulevard d\'Anfa, Résidence Les Palmiers, 3ème étage\n20000 Casablanca, Maroc',
  companyEmail: 'juridique@pbe.ma',
  editorSectionTitle: 'ÉDITEUR DU SITE',
  headquartersSectionTitle: 'SIÈGE SOCIAL',
  contactSectionTitle: 'CONTACT',
  identifiersSectionTitle: 'IDENTIFIANTS LÉGAUX',
  hostingProvider: 'Amazon Web Services (AWS)',
  hostingLegalEntity: 'Amazon.com Legal Department',
  hostingAddress: '410 Terry Avenue North, Seattle, WA 98109-5210, USA',
  hostingSectionTitle: 'HÉBERGEMENT',
  dataProtectionTitle: 'Données Personnelles',
  cndpAuthorization: 'D-W-219/2023',
  dataProtectionText: 'Conformément à la loi 09-08 relative à la protection des personnes physiques à l\'égard du traitement des données à caractère personnel, vous disposez d\'un droit d\'accès, de rectification et d\'opposition aux données vous concernant.',
  privacyPolicyLinkText: 'Consulter notre politique de confidentialité',
  lastUpdatedLabel: 'Dernière mise à jour',
};

const FALLBACK_IDENTIFIERS: LegalIdentifier[] = [
  { labelText: 'I.C.E', identifierValue: '001548796000088' },
  { labelText: 'R.C', identifierValue: '345678' },
  { labelText: 'IDENTIFIANT FISCAL', identifierValue: '15234567' },
  { labelText: 'TAXE PRO', identifierValue: '35791246' },
];

export interface LegalPageContent {
  pageTitle: string;
  pageSubtitle: string;
  company: {
    name: string;
    type: string;
    capital: string;
    address: string;
    email: string;
  };
  sectionTitles: {
    editor: string;
    headquarters: string;
    contact: string;
    identifiers: string;
    hosting: string;
    dataProtection: string;
  };
  legalIdentifiers: LegalIdentifier[];
  hosting: {
    provider: string;
    legalEntity: string;
    address: string;
  };
  dataProtection: {
    cndpAuthorization: string;
    text: string;
    privacyPolicyLinkText: string;
  };
  lastUpdated: {
    label: string;
    date: string | null;
  };
}

export async function getLegalPageContent(): Promise<LegalPageContent> {
  const legalPage = await fetchSingleType<LegalPageData>('legal-page', { populate: '*' });
  const data = legalPage || FALLBACK_LEGAL;

  return {
    pageTitle: data.pageTitle || FALLBACK_LEGAL.pageTitle!,
    pageSubtitle: data.pageSubtitle || FALLBACK_LEGAL.pageSubtitle!,
    company: {
      name: data.companyName || FALLBACK_LEGAL.companyName!,
      type: data.companyType || FALLBACK_LEGAL.companyType!,
      capital: data.capitalAmount || FALLBACK_LEGAL.capitalAmount!,
      address: data.companyAddress || FALLBACK_LEGAL.companyAddress!,
      email: data.companyEmail || FALLBACK_LEGAL.companyEmail!,
    },
    sectionTitles: {
      editor: data.editorSectionTitle || FALLBACK_LEGAL.editorSectionTitle!,
      headquarters: data.headquartersSectionTitle || FALLBACK_LEGAL.headquartersSectionTitle!,
      contact: data.contactSectionTitle || FALLBACK_LEGAL.contactSectionTitle!,
      identifiers: data.identifiersSectionTitle || FALLBACK_LEGAL.identifiersSectionTitle!,
      hosting: data.hostingSectionTitle || FALLBACK_LEGAL.hostingSectionTitle!,
      dataProtection: data.dataProtectionTitle || FALLBACK_LEGAL.dataProtectionTitle!,
    },
    legalIdentifiers: data.legalIdentifiers || FALLBACK_IDENTIFIERS,
    hosting: {
      provider: data.hostingProvider || FALLBACK_LEGAL.hostingProvider!,
      legalEntity: data.hostingLegalEntity || FALLBACK_LEGAL.hostingLegalEntity!,
      address: data.hostingAddress || FALLBACK_LEGAL.hostingAddress!,
    },
    dataProtection: {
      cndpAuthorization: data.cndpAuthorization || FALLBACK_LEGAL.cndpAuthorization!,
      text: data.dataProtectionText || FALLBACK_LEGAL.dataProtectionText!,
      privacyPolicyLinkText: data.privacyPolicyLinkText || FALLBACK_LEGAL.privacyPolicyLinkText!,
    },
    lastUpdated: {
      label: data.lastUpdatedLabel || FALLBACK_LEGAL.lastUpdatedLabel!,
      date: data.lastUpdatedDate || null,
    },
  };
}
