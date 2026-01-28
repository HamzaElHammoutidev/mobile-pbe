import PageLayout from "@/components/layout/PageLayout";
import LegalMentionsPage from "@/features/legal/LegalMentionsPage";
import { getLegalPageContent } from "@/lib/api/legal";
import { generatePageMetadata } from "@/lib/api/global";

export async function generateMetadata() {
    return generatePageMetadata('mentions-legales');
}

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function MentionsLegalesRoute() {
    const content = await getLegalPageContent();

    return (
        <PageLayout headerVariant="default" footerVariant="default">
            <LegalMentionsPage content={content} />
        </PageLayout>
    );
}
