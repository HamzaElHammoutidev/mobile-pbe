import PageLayout from "@/components/layout/PageLayout";
import ContactPage from "@/features/contact/ContactPage";
import { getContactPageContent } from "@/lib/api/contact";
import { generatePageMetadata } from "@/lib/api/global";

export async function generateMetadata() {
    return generatePageMetadata('contact');
}

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function Contact() {
    const content = await getContactPageContent();

    return (
        <PageLayout headerVariant="default" className="bg-[#F9FAFB]" backgroundColor="bg-[#F9FAFB]">
            <ContactPage content={content} />
        </PageLayout>
    );
}
