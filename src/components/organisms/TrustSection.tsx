"use client";

/**
 * src/components/organisms/TrustSection.tsx
 * 
 * Social Proof / Trust Badges with:
 * - Minimalist high-tracking typography
 * - Icon separators with gold accents
 * - Responsive marquee-like grid layout
 */
import React from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, Shield, Headphones, Award } from "lucide-react";

export function TrustSection() {
  const t = useTranslations("trust");

  const badges = [
    { key: "reputation", icon: <Star className="w-4 h-4" /> },
    { key: "privacy", icon: <Shield className="w-4 h-4" /> },
    { key: "support", icon: <Headphones className="w-4 h-4" /> },
    { key: "partner", icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <section className="border-y border-white/5 bg-black/[0.1] py-12 md:py-24 overflow-hidden relative px-page-m md:px-0">
      <div className="absolute inset-0 bg-ink-gradient opacity-50" />
      <div className="section-container relative z-10">
        <div className="flex flex-col gap-12">
          <h2 className="text-center font-jost text-[10px] md:text-xs font-black text-neutral-500 uppercase tracking-[0.4em]">
            {t("title")}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
            {badges.map((badge, idx) => (
              <motion.div
                key={badge.key}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="flex items-center justify-center gap-5 group"
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="text-gold opacity-40 group-hover:opacity-100 transition-all duration-300"
                >
                  {badge.icon}
                </motion.div>
                <span className="font-jost text-xs md:text-sm font-black text-neutral-400 tracking-[0.1em] uppercase group-hover:text-white transition-colors">
                  {t(badge.key)}
                </span>
                
                {/* Visual Separator (Laptop+) */}
                {idx !== badges.length - 1 && (
                  <div className="hidden lg:block ml-auto mr-0 w-px h-8 bg-white/5" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
