"use client";

/**
 * src/components/organisms/Features.tsx
 * 
 * Luxury Glassmorphism Feature Cards with:
 * - Lucide icons with gold gradients
 * - Hover scale and inner glow effects
 * - Fade-up entrance animations via Framer Motion
 */
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, Network, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { fontJoti } from "@/lib/fonts";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Features() {
  const t = useTranslations("features");

  const cards = [
    {
      key: "security",
      icon: <ShieldCheck className="w-7 h-7" />,
      title: t("security.title"),
      desc: t("security.desc"),
    },
    {
      key: "career",
      icon: <TrendingUp className="w-7 h-7" />,
      title: t("career.title"),
      desc: t("career.desc"),
    },
    {
      key: "network",
      icon: <Network className="w-7 h-7" />,
      title: t("network.title"),
      desc: t("network.desc"),
    },
    {
      key: "branding",
      icon: <Zap className="w-7 h-7" />,
      title: t("branding.title"),
      desc: t("branding.desc"),
    },
  ];

  return (
    <section className="py-24 md:py-48 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ink-gradient opacity-40 pointer-events-none" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-screen-xl mx-auto px-page-m md:px-6 flex flex-col gap-16 md:gap-24 relative z-10"
      >
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <motion.div 
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 backdrop-blur-md"
          >
            <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em] translate-x-[0.2em]">
              AGENCY ADVANTAGES
            </span>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className={cn(
              fontJoti.className,
              "text-mobile-h1 md:text-[5rem] font-black text-neutral-100 tracking-tight-display leading-[1.0] md:leading-[0.9]"
            )}
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mt-2 md:mt-4 text-neutral-400 font-jost text-fluid-body leading-relaxed md:leading-premium max-w-xl"
          >
            {t("description") || "Kami melampaui sekadar penyaluran tenaga kerja. Kami membangun ekosistem profesional yang mendukung pertumbuhan karier jangka panjang Anda."}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {cards.map((card) => (
            <motion.div
              key={card.key}
              variants={itemVariants}
              whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className={cn(
                "group relative p-6 md:p-10 rounded-2xl md:rounded-[2.5rem] overflow-hidden",
                "bg-white/[0.03] backdrop-blur-xl border-[0.5px] border-gold/20 hover:border-gold/40",
                "transition-all duration-700 shadow-glass"
              )}
            >
              {/* Animated Inner Shimmer */}
              <div className="absolute inset-0 bg-shimmer-gold opacity-0 group-hover:animate-shimmer pointer-events-none" />
              
              <div className="w-16 h-16 rounded-3xl bg-gold/10 flex items-center justify-center text-gold mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-gold-inner">
                {card.icon}
              </div>

              <h3 className={cn(
                fontJoti.className,
                "text-lg lg:text-2xl font-black text-white mb-4 transition-colors group-hover:text-gold-light uppercase tracking-widest-caps"
              )}>
                {card.title}
              </h3>
              
              <p className="font-jost text-neutral-400 text-fluid-body leading-relaxed md:leading-premium font-medium tracking-premium-body">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
