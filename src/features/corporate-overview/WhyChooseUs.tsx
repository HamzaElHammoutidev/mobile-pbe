'use client';

import React from 'react';
import { ShieldAlert, CheckCircle2, Award, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';

const WhyChooseUs = () => {
    return (
        <section className="px-5 py-10 bg-[#FAFAFA] overflow-hidden">
            <div className="mb-10">
                <h2 className="text-[22px] font-extrabold inline-block relative">
                    Pourquoi nous choisir ?
                    <span className="absolute -bottom-2 left-0 w-14 h-1 rounded-full bg-[#FFD200]" />
                </h2>
            </div>

            <div className="space-y-14">
                {/* Sécurité Avant Tout */}
                <div className="relative group">
                    <ShieldAlert className="absolute -right-6 -top-10 w-40 h-40 text-black/5 -z-0 pointer-events-none transition-transform group-hover:scale-110 duration-500" />
                    <div className="relative z-10 flex items-start gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-black mt-2.5 shrink-0" />
                        <div>
                            <h3 className="text-lg font-bold mb-3 text-[#111827]">Sécurité Avant Tout</h3>
                            <p className="text-gray-500 text-[15px] leading-[1.6] max-w-[95%]">
                                Nous ne faisons aucun compromis sur votre sécurité. En respectant strictement les <span className="text-black font-semibold">normes constructeur</span> et en utilisant du vitrage certifié d'origine, nous garantissons la résistance structurelle de votre véhicule après chaque intervention.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Agréé Assurances */}
                <div className="relative group">
                    <CheckCircle2 className="absolute -left-8 -top-10 w-40 h-40 text-black/5 -z-0 pointer-events-none transition-transform group-hover:scale-110 duration-500" />
                    <div className="relative z-10 flex items-start gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FFD200] mt-2.5 shrink-0" />
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-[#111827]">Agréé Assurances</h3>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD200]" />
                            </div>
                            <p className="text-gray-500 text-[15px] leading-[1.6] max-w-[95%]">
                                Partenaire de confiance des principales compagnies d'assurance au Maroc. Nous gérons l'intégralité de votre dossier administratif : <span className="text-black font-semibold">aucune avance de frais</span>, zéro tracas. Votre tranquillité d'esprit est incluse.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Garantie à Vie */}
                <div className="relative group">
                    <Award className="absolute -right-6 -top-10 w-40 h-40 text-black/5 -z-0 pointer-events-none transition-transform group-hover:scale-110 duration-500" />
                    <div className="relative z-10 flex items-start gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-black mt-2.5 shrink-0" />
                        <div>
                            <h3 className="text-lg font-bold mb-3 text-[#111827]">Garantie à Vie</h3>
                            <p className="text-gray-500 text-[15px] leading-[1.6] max-w-[95%]">
                                La qualité de nos matériaux et l'expertise de nos techniciens nous permettent d'offrir une <span className="text-black font-semibold">garantie à vie</span> sur l'étanchéité et la pose. Une promesse tenue dans tout notre réseau national.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <Button className="w-full rounded-[20px] h-14 text-[13px] tracking-[0.18em] gap-3 shadow-xl hover:translate-y-[-2px] transition-all">
                    DEMANDER UN RAPPEL
                    <Phone className="w-5 h-5 fill-black stroke-black" />
                </Button>
            </div>
        </section>
    );
};

export default WhyChooseUs;
