import PageLayout from "@/components/layout/PageLayout";
import CareerPage from "@/features/career/CareerPage";
import { getCareersPageContent } from "@/lib/api/careers";
import { generatePageMetadata } from "@/lib/api/global";

export async function generateMetadata() {
    return generatePageMetadata('carrieres');
}

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function CarrieresPage() {
    const content = await getCareersPageContent();

    return (
        <PageLayout headerVariant="default" className="bg-white">
            <CareerPage jobs={content.jobs} benefits={content.benefits} />
        </PageLayout>
    );
}
