import PageLayout from "@/components/layout/PageLayout";
import NetworkHero from "@/features/corporate-overview/NetworkHero";
import WhyChooseUs from "@/features/corporate-overview/WhyChooseUs";
import TimelineSection from "@/features/corporate-overview/TimelineSection";
import CertificationsScroll from "@/features/corporate-overview/CertificationsScroll";
import NewsCarousel from "@/features/corporate-overview/NewsCarousel";
import { CalendarDays } from "lucide-react";

export async function generateMetadata() {
    return {
        title: "Notre Réseau - Pare-Brise Express",
        description: "Découvrez notre réseau national, nos valeurs et notre expertise.",
    };
}

export default function NotreReseauPage() {
    return (
        <PageLayout backgroundColor="bg-[#FAFAFA]" headerVariant="default" footerVariant="default">
            <div className="max-w-screen-sm mx-auto bg-white min-h-screen shadow-sm">
                <NetworkHero />
                <WhyChooseUs />
                <TimelineSection />
                <CertificationsScroll />
                <NewsCarousel />

                {/* Urgent Banner - matching the reference image bottom */}
                <div className="px-5 py-6 bg-[#FAFAFA] border-t border-gray-100 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-red-500 font-bold text-[11px] uppercase tracking-wider">URGENCE ?</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-[19px] font-extrabold text-[#111827]">Un bris de glace ?</h3>
                        <button className="bg-[#FFD200] px-5 py-2.5 rounded-[18px] font-black text-[11px] tracking-[0.12em] flex items-center gap-2 shadow-[0_10px_24px_rgba(255,210,0,0.35)] active:scale-95 transition-all">
                            PRENDRE RDV
                            <CalendarDays className="w-4 h-4 text-black" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
