"use client";

/**
 * src/app/[locale]/layanan/page.tsx
 * 
 * Luxury Services Page.
 * Features:
 * - Animated Hero with Joti One
 * - Services Grid (3 columns)
 * - Process Timeline (4 steps)
 * - Luxury Pricing Tables
 * - Benefits Grid (6 columns/icons)
 */
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  Users, Globe, Share2, ShieldCheck, 
  Clock, TrendingUp, Handshake, Zap, 
  CheckCircle2, Crown 
} from "lucide-react";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { PricingCard } from "@/components/molecules/PricingCard";
import { ProcessStep } from "@/components/molecules/ProcessStep";
import { fontJoti, fontPlayfair } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import Image from "next/image";

export default function ServicesPage() {
  const t = useTranslations("services");

  const services = [
    { id: "recruitment", icon: Users },
    { id: "web", icon: Globe },
    { id: "branding", icon: Share2 },
  ];

  const benefits = [
    { key: "prof", icon: TrendingUp },
    { key: "sec", icon: ShieldCheck },
    { key: "sup", icon: Clock },
    { key: "net", icon: Handshake },
    { key: "pri", icon: Zap },
    { key: "res", icon: CheckCircle2 },
  ];

  const processes = ["step1", "step2", "step3", "step4"];

  const pricingPlans = [
    {
      name: t("pricing.starter"),
      price: "1.5M",
      features: ["Konsultasi Awal", "Optimasi Profil Dasar", "1x Posting Promosi", "Support Email"],
      isPopular: false,
    },
    {
      name: t("pricing.pro"),
      price: "4.5M",
      features: ["Manajemen Full Konten", "Website Portofolio", "Prioritas Penyaluran", "Support WhatsApp 24/7"],
      isPopular: true,
    },
    {
      name: t("pricing.ent"),
      price: "9.9M",
      features: ["Personal Branding Unicorn", "Casting Internasional", "Video Content Cinematik", "Dedicated Manager"],
      isPopular: false,
    },
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* ── Background Master ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[80vh] bg-gradient-to-b from-gold/[0.05] via-transparent to-transparent" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] bg-gold/[0.03] blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[60%] h-[60%] bg-gold/[0.02] blur-[180px] rounded-full" />
      </div>

      {/* ── Premium Hero Section ── */}
      <section className="relative pt-48 pb-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-screen-xl mx-auto px-6 flex flex-col items-center gap-10"
        >
          <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-gold/5 border border-gold/10 backdrop-blur-md">
            <Crown className="w-4 h-4 text-gold-light" />
            <span className="text-[11px] font-black text-gold-light uppercase tracking-[0.4em] translate-x-[0.2em]">Our Professional Sanctuary</span>
          </div>
          
          <h1 className={cn(
            fontJoti.className,
            "text-fluid-h1 md:text-[8rem] text-neutral-100 leading-[1.1] md:leading-[0.9] tracking-tight-display max-w-5xl"
          )}>
            Solusi Elit <br />
            <span className="text-gold-gradient py-4 block">{t("title")}</span>
          </h1>
          
          <p className="font-jost text-fluid-body text-neutral-400 max-w-2xl leading-relaxed md:leading-premium tracking-premium-body">
            Kami menghadirkan ekosistem eksklusif yang menggabungkan manajemen bakat kelas atas dengan teknologi digital termutakhir.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
             <div className="w-px h-24 bg-gradient-to-b from-gold/50 to-transparent animate-pulse" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Services Mastery Grid ── */}
      <section className="max-w-screen-xl mx-auto px-6 pb-48">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((svc, i) => (
            <ServiceCard
              key={svc.id}
              title={t(`list.${svc.id}.title`)}
              description={t(`list.${svc.id}.desc`)}
              icon={svc.icon}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ── Benefits Showcase ── */}
      <section className="bg-black/50 py-48 border-y border-white/5 relative">
        <div className="absolute inset-0 bg-shimmer-gold opacity-[0.02]" />
        <div className="max-w-screen-xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center gap-6 mb-32">
            <div className="px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20">
              <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">ELITE PERKS</span>
            </div>
            <h2 className={cn(fontJoti.className, "text-fluid-h1 font-black text-neutral-100 italic tracking-tight leading-[1.1] md:leading-[0.9]")}>
               {t("benefits.title")}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-12">
            {benefits.map((b, i) => (
               <motion.div
                 key={b.key}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="flex flex-col items-center gap-6 group"
               >
                 <div className="w-20 h-20 rounded-[2rem] bg-gold/5 border border-gold/10 flex items-center justify-center group-hover:bg-gold-gradient group-hover:scale-110 transition-all duration-700 shadow-gold-inner">
                   <b.icon className="w-8 h-8 text-gold-light group-hover:text-black transition-colors" />
                 </div>
                 <span className="text-center font-jost text-[11px] font-black text-neutral-400 group-hover:text-gold-light transition-colors uppercase tracking-[0.2em] leading-relaxed">
                   {t(`benefits.${b.key}`)}
                 </span>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workflow Timeline ── */}
      <section className="py-48 max-w-screen-xl mx-auto px-6 overflow-hidden">
        <div className="flex flex-col items-center text-center gap-6 mb-32">
          <div className="px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20">
            <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">OPERATIONAL FLOW</span>
          </div>
          <h2 className={cn(fontJoti.className, "text-fluid-h1 font-black text-neutral-100 italic tracking-tight leading-[1.1] md:leading-[0.9]")}>
            {t("process.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-0 relative">
          {processes.map((step, i) => (
            <ProcessStep 
              key={step} 
              number={`0${i + 1}`} 
              title={t(`process.${step}`)} 
              index={i} 
            />
          ))}
        </div>
      </section>

      {/* ── Pricing Excellence ── */}
      <section className="py-48 bg-black/40 border-t border-white/5">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col items-center text-center gap-6 mb-32">
            <div className="px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20">
              <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">PREMIUM PLANS</span>
            </div>
            <h2 className={cn(fontJoti.className, "text-fluid-h1 font-black text-neutral-100 italic tracking-tight leading-[1.1] md:leading-[0.9]")}>
              {t("pricing.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto items-center">
            {pricingPlans.map((plan, i) => (
              <PricingCard
                key={plan.name}
                {...plan}
                ctaText={t("pricing.cta")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final Conversion Section ── */}
      <section className="pt-24 pb-48 max-w-screen-xl mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="group relative p-8 md:p-32 rounded-[3rem] md:rounded-[4rem] border-[0.5px] border-gold/10 bg-ink-gradient shadow-glass overflow-hidden"
        >
           <div className="relative z-10 flex flex-col items-center gap-12">
              <h2 className={cn(fontJoti.className, "text-fluid-h1 font-black text-neutral-100 tracking-tight leading-[1.1] md:leading-[0.9]")}>
                Siap Memulai <br />
                <span className="text-gold-gradient">Masa Depan?</span>
              </h2>
              <p className="font-jost text-neutral-400 max-w-xl mx-auto text-fluid-body leading-relaxed md:leading-premium tracking-premium-body">
                Konsultasikan kebutuhan Anda dengan tim ahli Liguns. Kami siap membantu Anda mencapai standar hiburan kelas dunia.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <motion.button 
                  whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                  className="px-12 py-5 rounded-full bg-gold-gradient text-black font-jost font-black tracking-[0.3em] uppercase text-xs shadow-gold-glow flex items-center justify-center gap-4 group/btn"
                >
                  <SendIcon className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  Hubungi Kami Sekarang
                </motion.button>
              </div>
           </div>
           
           {/* Dynamic Texture Decor */}
           <div className="absolute inset-0 bg-shimmer-gold opacity-0 group-hover:animate-shimmer pointer-events-none" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        </motion.div>
      </section>
    </div>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

