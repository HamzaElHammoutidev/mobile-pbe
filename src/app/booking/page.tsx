import PageLayout from "@/components/layout/PageLayout";
import BookingFlow from "@/features/booking/BookingFlow";
import { getBookingPageContent } from "@/lib/api/booking";
import { generatePageMetadata } from "@/lib/api/global";

export async function generateMetadata() {
    return generatePageMetadata('booking');
}

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function BookingPage() {
    const content = await getBookingPageContent();

    return (
        <PageLayout headerVariant="default" className="bg-white">
            <BookingFlow content={content} />
        </PageLayout>
    );
}
