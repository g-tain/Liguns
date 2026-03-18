"use client";

/**
 * src/components/organisms/CallToAction.tsx
 * 
 * Cinematic CTA Section with:
 * - Radial gradient (Black to Gold) background
 * - Shimmer neon button effects
 * - Fade-up entrance animations
 */
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ArrowRight, Send } from "lucide-react";

export function CallToAction() {
  const t = useTranslations("cta");

  return (
    <section className="max-w-screen-xl mx-auto px-page-m pb-24 md:pb-48">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-[2rem] md:rounded-[4rem] overflow-hidden bg-ink-gradient border-[0.5px] border-gold/10 py-16 md:py-32 px-6 md:px-8 text-center shadow-glass"
      >
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(187,154,48,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -top-px left-0 w-full h-[2px] bg-shimmer-gold opacity-30 animate-shimmer" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="inline-flex self-center px-4 py-1.5 rounded-full bg-gold/5 border border-gold/10 backdrop-blur-sm"
            >
              <span className="text-[10px] font-black text-gold-light uppercase tracking-[0.4em] translate-x-[0.2em]">
                Ready to Join the Elites?
              </span>
            </motion.div>
            
            <h2 className={cn(
              fontJoti.className,
              "text-mobile-h1 md:text-[5.5rem] font-black text-neutral-100 tracking-tight-display leading-[1.0] md:leading-[0.95]"
            )}>
              {t("title")}
            </h2>
            
            <p className="max-w-xl mx-auto text-neutral-300 font-jost text-sm md:text-xl font-medium tracking-premium-body leading-relaxed md:leading-premium mt-2 md:mt-4">
              Mulai perjalanan karier Anda di industri hiburan premium sekarang. Proses pendaftaran cepat dan sepenuhnya rahasia.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
            <motion.div whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}>
              <Link href="/lowongan">
                <button className="flex items-center gap-3 px-10 py-5 rounded-full bg-gold-gradient text-black font-jost font-black text-xs tracking-[0.2em] uppercase shadow-gold-glow-lg transition-all">
                  {t("findJobs")}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </motion.div>
            
            <motion.div whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}>
              <Link href="/gabung">
                <button className="flex items-center gap-3 px-10 py-5 rounded-full border-[0.5px] border-gold/20 text-gold-light font-jost font-black text-xs tracking-[0.2em] uppercase hover:bg-gold/5 transition-all">
                  <Send className="w-5 h-5" />
                  GABUNG SEKARANG
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
