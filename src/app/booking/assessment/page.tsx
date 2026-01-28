import PageLayout from "@/components/layout/PageLayout";
import DamageAssessmentGuide from "@/features/booking/DamageAssessmentGuide";

export const metadata = {
    title: 'Évaluation - Pare-Brise Express',
    description: 'Évaluez votre dommage pour savoir si vous avez besoin d\'une réparation ou d\'un remplacement.',
};

export default function AssessmentPage() {
    return (
        <PageLayout headerVariant="default" className="bg-[#F9FAFB]">
            <DamageAssessmentGuide />
        </PageLayout>
    );
}
