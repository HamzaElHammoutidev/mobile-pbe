import PageLayout from "@/components/layout/PageLayout";
import SchedulingInterface from "@/features/booking/SchedulingInterface";

export const metadata = {
    title: 'Planifier - Pare-Brise Express',
    description: 'Choisissez la date et l\'heure de votre rendez-vous.',
};

export default function SchedulePage() {
    return (
        <PageLayout headerVariant="default" className="bg-white">
            <SchedulingInterface />
        </PageLayout>
    );
}
