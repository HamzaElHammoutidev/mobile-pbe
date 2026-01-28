import PageLayout from "@/components/layout/PageLayout";
import AboutHeroSection from "@/features/about/AboutHeroSection";
import CertificationsSection from "@/features/about/CertificationsSection";
import NationalReachSection from "@/features/about/NationalReachSection";
import TeamCultureSection from "@/features/about/TeamCultureSection";
import { getAboutPageContent } from "@/lib/api/about";
import { generatePageMetadata } from "@/lib/api/global";

export async function generateMetadata() {
    return generatePageMetadata('about');
}

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function AboutPage() {
    const content = await getAboutPageContent();

    return (
        <PageLayout headerVariant="default" className="bg-white">
            <AboutHeroSection content={content.hero} />
            <CertificationsSection content={content.certifications} />
            <NationalReachSection content={content.nationalReach} />
            <TeamCultureSection content={content.teamCulture} />
        </PageLayout>
    );
}
