import PageLayout from "@/components/layout/PageLayout";
import JobDetailPage from "@/features/career/JobDetailPage";
import type { JobDetailContent } from "@/lib/api/careers";

export const metadata = {
    title: 'Technicien Vitrage - Carrières | Pare-Brise Express',
    description: 'Postulez pour le poste de Technicien Vitrage à Casablanca chez Pare-Brise Express.',
};

const SAMPLE_JOB: any = {
    id: 1,
    title: 'Technicien Vitrage',
    description: 'Nous cherchons un technicien vitrage expérimenté pour rejoindre notre équipe à Casablanca.',
    requirements: 'Expérience minimale de 2 ans, connaissance des systèmes de vitrage automobile',
    location: 'Casablanca',
    category: 'Technique',
    postedDate: new Date().toISOString(),
    isActive: true,
    responsibilities: [
        "Diagnostic des dommages et choix de la solution technique appropriée (réparation ou remplacement).",
        "Réalisation d'interventions en atelier mobile ou en centre technique.",
        "Calibrage des systèmes d'aide à la conduite (ADAS) après remplacement de pare-brise.",
        "Entretien des outils et gestion du stock de l'unité mobile."
    ],
    qualifications: [
        "Expérience de 2 ans minimum en vitrage automobile ou carrosserie.",
        "Permis de conduire B valide.",
        "Formation technique (CAP/BEP mécanique ou carrosserie) appréciée.",
        "Sens du détail, rigueur et excellent relationnel client."
    ],
    publishedAt: new Date().toISOString(),
};

export default function JobPage() {
    return (
        <PageLayout headerVariant="default" className="bg-white">
            <JobDetailPage job={SAMPLE_JOB} />
        </PageLayout>
    );
}
