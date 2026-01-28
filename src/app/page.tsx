import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/features/home/HeroSection";
import TrustSection from "@/features/home/TrustSection";
import DecisionSection from "@/features/home/DecisionSection";
import CoverageMapSection from "@/features/home/CoverageMapSection";
import StickyActionBar from "@/components/layout/StickyActionBar";
import ProcessStepsSection from "@/features/home/ProcessStepsSection";
import ServicesStackSection from "@/features/home/ServicesStackSection";
import TestimonialsCarousel from "@/features/home/TestimonialsCarousel";
import HomeVideoSection from "@/features/home/HomeVideoSection";
import { getHomepageContent } from "@/lib/api/homepage";
import { getNetworkPageContent } from "@/lib/api/network";
import { generatePageMetadata } from "@/lib/api/global";

export async function generateMetadata() {
  return generatePageMetadata('home');
}

export const revalidate = 3600; // Revalidate every hour
export const dynamic = 'force-dynamic';

export default async function Home() {
  const [content, networkContent] = await Promise.all([
    getHomepageContent(),
    getNetworkPageContent(),
  ]);
  const centres = networkContent.centres.map((c) => ({
    id: c.id,
    name: c.name,
    latitude: c.latitude,
    longitude: c.longitude,
    city: c.city,
  }));

  return (
    <PageLayout headerVariant="default" className="bg-white">
      <HeroSection content={content.hero} />
      <TrustSection content={content.trust} />
      <ProcessStepsSection />
      <ServicesStackSection />
      <DecisionSection content={content.decision} />
      <CoverageMapSection content={content.coverage} centres={centres} />
      <HomeVideoSection />
      <TestimonialsCarousel />
      <StickyActionBar />
    </PageLayout>
  );
}
