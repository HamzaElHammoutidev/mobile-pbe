'use client';

import PageLayout from '@/components/layout/PageLayout';

export default function GuidePage() {
  return (
    <PageLayout headerVariant="default">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-6">Guide Utilisateur</h1>

        <div className="max-w-3xl mx-auto space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Comment faire une réservation</h2>
            <p className="text-gray-700 mb-4">
              Pare-Brise Express rend facile la réservation de votre service de réparation ou remplacement de pare-brise.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Visitez la page de réservation</li>
              <li>Sélectionnez le type de service</li>
              <li>Choisissez votre centre préféré</li>
              <li>Confirmez votre réservation</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Services disponibles</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#FFD200] font-bold">•</span>
                <div>
                  <h3 className="font-bold">Réparation</h3>
                  <p className="text-gray-600">Pour les petits impacts</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD200] font-bold">•</span>
                <div>
                  <h3 className="font-bold">Remplacement</h3>
                  <p className="text-gray-600">Pour les dommages importants</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FFD200] font-bold">•</span>
                <div>
                  <h3 className="font-bold">Calibrage ADAS</h3>
                  <p className="text-gray-600">Calibrage des systèmes d'aide à la conduite</p>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Nos centres</h2>
            <p className="text-gray-700">
              Trouvez le centre Pare-Brise Express le plus proche de vous pour un service rapide et professionnel.
            </p>
          </section>

          <div className="text-center mt-8">
            <a href="/contact" className="inline-block bg-[#FFD200] text-black px-8 py-3 rounded-lg font-bold hover:opacity-90">
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
