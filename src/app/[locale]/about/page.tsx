"use client";

/**
 * src/app/[locale]/about/page.tsx
 * 
 * Professional Storytelling and Reputation Page.
 * Features:
 * - Joti One display typography
 * - Vision & Mission Grid (8px system)
 * - Premium Narrative Blocks
 * - Cinematic Depth Decor
 */
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Shield, Target, Award, Rocket, Sparkles } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("about");

  const missions = t.raw("mission.list") as string[];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col pt-32">
      {/* ── Background Master ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[80%] h-[80%] bg-gold/5 blur-[180px] rounded-full opacity-40" />
        <div className="absolute bottom-0 left-0 w-[60%] h-[60%] bg-gold/[0.03] blur-[150px] rounded-full opacity-30" />
      </div>

      <div className="relative z-10">
        {/* ── Cinematic Hero ── */}
        <section className="max-w-screen-xl mx-auto px-6 py-24 md:py-48 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 px-5 py-2 rounded-full bg-gold/5 border border-gold/10 mb-10 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-gold-light" />
            <span className="text-[11px] font-black text-gold-light uppercase tracking-[0.4em] translate-x-[0.2em]">Our Legacy</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              fontJoti.className,
              "text-fluid-h1 md:text-[10rem] font-black leading-[1.1] md:leading-[0.9] text-gold-gradient tracking-tight-display mb-8 md:mb-12"
            )}
          >
            {t("title")}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-playfair italic text-lg md:text-4xl text-neutral-400 max-w-4xl font-medium"
          >
            "{t("subtitle")}"
          </motion.p>
        </section>

        {/* ── Narrative Story ── */}
        <section className="max-w-screen-xl mx-auto px-6 py-24 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-[0.5px] border-gold/20 shadow-gold-glow relative group">
                <div className="absolute inset-0 bg-shimmer-gold opacity-[0.05] group-hover:animate-shimmer" />
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                   <div className={cn(fontJoti.className, "text-[10rem] md:text-[15rem] text-gold/10 select-none group-hover:text-gold/20 transition-colors duration-1000")}>L</div>
                </div>
                {/* Decorative Frame */}
                <div className="absolute inset-6 md:inset-8 border-[0.5px] border-gold/10 rounded-[2rem] md:rounded-[2.5rem]" />
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex flex-col gap-10"
            >
               <h2 className={cn(fontJoti.className, "text-4xl md:text-6xl text-neutral-100 italic")}>Our Narrative</h2>
               <p className="font-jost text-xl text-neutral-400 leading-premium tracking-premium-body">
                 {t("story")}
               </p>
               <div className="p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-gold/[0.03] border-[0.5px] border-gold/10 shadow-gold-inner">
                  <h3 className="text-gold-light font-jost font-black text-xs uppercase tracking-widest-caps mb-4">Philosophy</h3>
                  <p className="font-jost text-base md:text-lg text-neutral-300 leading-relaxed italic">
                    {t("philosophy.desc")}
                  </p>
               </div>
            </motion.div>
          </div>
        </section>

        {/* ── Vision & Mission Grid ── */}
        <section className="bg-white/[0.02] py-32 border-y border-white/5">
          <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Vision */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 400, damping: 17 } }}
               className="flex flex-col gap-8 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-black border-[0.5px] border-white/5 hover:border-gold/20 transition-all duration-700 shadow-glass"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/5 border-[0.5px] border-gold/10 flex items-center justify-center text-gold">
                 <Target className="w-8 h-8" />
              </div>
              <h3 className={cn(fontJoti.className, "text-lg md:text-4xl text-neutral-100 uppercase tracking-widest-caps")}>{t("vision.title")}</h3>
              <p className="font-jost text-fluid-body text-neutral-400 leading-relaxed md:leading-premium tracking-premium-body">
                {t("vision.desc")}
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 400, damping: 17 } }}
               className="flex flex-col gap-8 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-black border-[0.5px] border-white/5 hover:border-gold/20 transition-all duration-700 shadow-glass"
            >
              <div className="w-16 h-16 rounded-2xl bg-gold/5 border-[0.5px] border-gold/10 flex items-center justify-center text-gold">
                 <Shield className="w-8 h-8" />
              </div>
              <h3 className={cn(fontJoti.className, "text-lg md:text-4xl text-neutral-100 uppercase tracking-widest-caps")}>{t("mission.title")}</h3>
              <ul className="flex flex-col gap-6">
                {missions.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 md:mt-2.5 shadow-gold-glow flex-shrink-0" />
                    <p className="font-jost text-fluid-body text-neutral-400 group-hover:text-neutral-200 transition-colors leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* ── Reputation Section ── */}
        <section className="max-w-screen-xl mx-auto px-6 py-32 text-center flex flex-col items-center gap-12">
           <Award className="w-16 h-16 text-gold/20" />
           <h2 className={cn(fontJoti.className, "text-3xl md:text-5xl text-neutral-500 max-w-2xl mx-auto italic leading-tight")}>
             Commitment to excellence and legal safety since 2026.
           </h2>
           <motion.button 
             whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
             className="px-16 py-6 rounded-full bg-gold-gradient text-black font-jost font-black text-xs tracking-[0.4em] uppercase shadow-gold-glow"
           >
             Connect with Us
           </motion.button>
        </section>
      </div>
    </div>
  );
}
