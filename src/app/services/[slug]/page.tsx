'use client';

import { useParams, notFound } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';

const SERVICE_DETAILS: Record<string, { title: string; description: string }> = {
  reparation: {
    title: 'RÉPARATION DE PARE-BRISE',
    description: 'Impacts plus petits qu\'une pièce de 2€. Intervention en 30 minutes sans rendez-vous nécessaire.',
  },
  remplacement: {
    title: 'REMPLACEMENT DE PARE-BRISE',
    description: 'Pare-brise, lunette arrière, glaces latérales. Installation rapide et garantie à vie.',
  },
  calibrage: {
    title: 'CALIBRAGE ADAS',
    description: 'Recalibrage des caméras d\'aide à la conduite après remplacement de pare-brise.',
  },
  'atelier-mobile': {
    title: 'ATELIER MOBILE',
    description: 'Service de réparation et remplacement à domicile. Nous venons à vous partout au Maroc.',
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = SERVICE_DETAILS[slug];

  if (!service) {
    notFound();
  }

  return (
    <PageLayout headerVariant="default">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
        <p className="text-xl text-gray-600">{service.description}</p>

        <div className="mt-12 bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">À propos de ce service</h2>
          <p className="text-gray-700 mb-4">
            Pare-Brise Express offre un service professionnel et rapide pour tous vos besoins en vitrage automobile.
          </p>
          <p className="text-gray-700">
            Notre équipe d'experts travaille avec les meilleurs matériaux et techniques pour assurer votre sécurité.
          </p>
        </div>

        <div className="mt-8 text-center">
          <a href="/contact" className="inline-block bg-[#FFD200] text-black px-8 py-3 rounded-lg font-bold hover:opacity-90">
            Prendre un rendez-vous
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
