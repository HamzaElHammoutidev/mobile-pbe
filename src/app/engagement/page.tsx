import PageLayout from "@/components/layout/PageLayout";
import EngagementPage from "@/features/engagement/EngagementPage";
import { getEngagementPageContent } from "@/lib/api/engagement";
import { generatePageMetadata } from "@/lib/api/global";

export async function generateMetadata() {
    return generatePageMetadata('engagement');
}

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function EngagementsPage() {
    const content = await getEngagementPageContent();

    return (
        <PageLayout headerVariant="default" className="bg-[#FFFCF5]">
            <EngagementPage content={content} />
        </PageLayout>
    );
}
