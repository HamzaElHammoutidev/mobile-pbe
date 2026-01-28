import PageLayout from "@/components/layout/PageLayout";
import JobApplicationPage from "@/features/career/JobApplicationPage";

export const metadata = {
    title: 'Postuler - Technicien Vitrage | Pare-Brise Express',
    description: 'Postulez pour le poste de Technicien Vitrage chez Pare-Brise Express.',
};

export const dynamic = 'force-dynamic';

export default function ApplyPage() {
    return (
        <PageLayout headerVariant="default" className="bg-white">
            <JobApplicationPage />
        </PageLayout>
    );
}
