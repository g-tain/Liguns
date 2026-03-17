/**
 * src/app/[locale]/services/page.tsx
 * 
 * Luxury Services Showcase with premium grid.
 */
import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sparkles, Megaphone, Users, Zap } from "lucide-react";

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const services = [
    { icon: <Sparkles className="w-6 h-6" />, title: "Venue Management", desc: "Optimalisasi ruang dan operasional untuk venue hiburan kelas atas." },
    { icon: <Megaphone className="w-6 h-6" />, title: "Digital Marketing", desc: "Strategi pemasaran terpadu untuk menjangkau audiens kreatif Indonesia." },
    { icon: <Users className="w-6 h-6" />, title: "Talent Agency", desc: "Manajemen dan pengembangan bakat profesional di industri kreatif." },
    { icon: <Zap className="w-6 h-6" />, title: "Event Production", desc: "Kurasi dan eksekusi acara spekakuler dengan standar produksi tinggi." },
  ];

  return (
    <div className="section-container py-12 md:py-24 flex flex-col gap-12">
      <div className="flex flex-col gap-4 max-w-2xl">
        <h1 className="font-playfair text-4xl md:text-6xl font-black text-gold-gradient tracking-tighter">
          {t("title")}
        </h1>
        <p className="font-jost text-lg text-white/60">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        {services.map((item, idx) => (
          <div key={idx} className="glass-card p-10 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center text-gold mb-8 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-4">
              {item.title}
            </h3>
            <p className="font-jost text-white/50 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
