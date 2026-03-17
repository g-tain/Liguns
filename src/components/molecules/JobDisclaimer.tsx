"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ShieldCheck, Anchor, Info } from "lucide-react";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";

/**
 * src/components/molecules/JobDisclaimer.tsx
 * 
 * Premium Disclaimer Component for Job Detail Pages.
 * Highlights:
 * - Age Requirement (19+)
 * - Free Registration Policy (Anti-Fraud)
 * - Cyberpunk Luxury Aesthetic (Glassmorphism + Gold)
 */

export function JobDisclaimer() {
  const t = useTranslations("jobDisclaimer");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-20 max-w-4xl mx-auto"
    >
      <div className="relative p-8 md:p-12 rounded-[3.5rem] bg-white/[0.02] border border-gold/20 overflow-hidden shadow-gold-glow-sm">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-10 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-gold" />
          </div>
          <h2 className={cn(fontJoti.className, "text-2xl md:text-3xl text-gold-gradient")}>
            {t("title")}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {/* Age Requirement */}
          <div className="space-y-4 p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-gold/30 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-xs font-black text-gold">19</span>
              </div>
              <h3 className="font-jost font-black text-xs uppercase tracking-[0.2em] text-white/90 group-hover:text-gold transition-colors">
                {t("age.title")}
              </h3>
            </div>
            <p className="font-jost text-sm text-neutral-400 leading-relaxed">
              {t("age.desc")}
            </p>
          </div>

          {/* Free Registration */}
          <div className="space-y-4 p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-gold/30 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <Anchor className="w-4 h-4 text-gold" />
              </div>
              <h3 className="font-jost font-black text-xs uppercase tracking-[0.2em] text-white/90 group-hover:text-gold transition-colors">
                {t("fee.title")}
              </h3>
            </div>
            <p className="font-jost text-sm text-neutral-400 leading-relaxed">
              {t("fee.desc")}
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-10 flex items-center gap-3 text-[10px] font-black text-white/20 uppercase tracking-[0.3em] justify-center pt-8 border-t border-white/5">
          <Info className="w-3 h-3" />
          <span>Liguns Identity & Security Guaranteed</span>
        </div>
      </div>
    </motion.div>
  );
}
