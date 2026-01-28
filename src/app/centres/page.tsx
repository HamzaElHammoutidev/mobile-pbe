import PageLayout from "@/components/layout/PageLayout";
import NetworkMapPage from "@/features/network/NetworkMapPage";
import { getNetworkPageContent } from "@/lib/api/network";
import { generatePageMetadata } from "@/lib/api/global";

export async function generateMetadata() {
    return generatePageMetadata('centres');
}

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function CentresPage() {
    const content = await getNetworkPageContent();

    return (
        <PageLayout headerVariant="default" className="bg-white">
            <NetworkMapPage content={content} />
        </PageLayout>
    );
}
