import PageLayout from "@/components/layout/PageLayout";
import ServicesHero from "@/features/services/ServicesHero";
import StatsSection from "@/features/services/StatsSection";
import ServicesCarousel from "@/features/services/ServicesCarousel";
import ExcellenceSection from "@/features/services/ExcellenceSection";
import EventsSection from "@/features/services/EventsSection";
import { getServicesPageContent } from "@/lib/api/services";
import { generatePageMetadata } from "@/lib/api/global";

export async function generateMetadata() {
    return generatePageMetadata('services');
}

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
    const content = await getServicesPageContent();

    return (
        <PageLayout headerVariant="default" className="bg-[#111827]">
            <ServicesHero content={content.hero} />
            <StatsSection content={content.stats} />
            <ServicesCarousel content={content.services} />
            <ExcellenceSection content={content.excellence} />
            <EventsSection content={content.events} />
        </PageLayout>
    );
}
