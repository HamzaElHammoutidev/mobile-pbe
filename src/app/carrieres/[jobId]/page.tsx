import PageLayout from "@/components/layout/PageLayout";
import JobDetailPage from "@/features/career/JobDetailPage";
import { getJobDetail } from "@/lib/api/careers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ jobId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { jobId } = await params;
    const job = await getJobDetail(jobId);

    if (!job) {
        return {
            title: 'Offre non trouvée - Carrières | Pare-Brise Express',
        };
    }

    return {
        title: `${job.title} - Carrières | Pare-Brise Express`,
        description: `Postulez pour le poste de ${job.title} à ${job.location} chez Pare-Brise Express.`,
    };
}

export const revalidate = 3600;
export const dynamic = 'force-dynamic';

export default async function JobPage({ params }: PageProps) {
    const { jobId } = await params;
    const job = await getJobDetail(jobId);

    if (!job) {
        notFound();
    }

    return (
        <PageLayout headerVariant="default" className="bg-white">
            <JobDetailPage job={job} />
        </PageLayout>
    );
}
