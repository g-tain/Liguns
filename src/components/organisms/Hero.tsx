"use client";

/**
 * src/components/organisms/Hero.tsx
 *
 * Modified Hero section matching "Image 2" style:
 * - Headlines use fontJoti for premium serif/display feel.
 * - Minimalist CTA: single rounded-full button.
 * - Centered layout with dark background.
 */
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { ApplyModal } from "./ApplyModal";

import Image from "next/image";

// ── Animation Variant Presets ──────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Component ─────────────────────────────────────────────────────
export function Hero() {
  const t = useTranslations("hero");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hydration-safe mount guard
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  if (!isMounted) return null;

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-5rem)] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* LCP Hero Image Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/img/hero_luxury_cyberpunk.png" // Fallback name
          alt="Liguns Entertainment Luxury Background"
          fill
          priority
          className="object-cover opacity-40 brightness-[0.7] saturate-[0.8]"
          sizes="100vw"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-page-m md:px-6 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 md:gap-12"
        >
          {/* Main Headline Section */}
          <div className="flex flex-col items-center">
            <motion.div 
              variants={itemVariants}
              className="px-4 py-1.5 rounded-full bg-gold/5 border border-gold/20 mb-6 md:mb-8 backdrop-blur-md"
            >
              <span className="text-[9px] md:text-[10px] font-black text-gold-light uppercase tracking-[0.3em] translate-x-[0.15em]">
                Liguns Entertainment
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className={cn(
                fontJoti.className,
                "text-neutral-100 leading-[1.1] tracking-tight-display",
                "text-fluid-h1 md:text-7xl lg:text-8xl"
              )}
            >
              <span className="block drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                {t("headline")}
              </span>
              <span className="block text-gold-gradient mt-2 py-2">
                {t("headlineAccent")}
              </span>
            </motion.h1>
          </div>

          {/* Unified CTA Button */}
          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              onClick={() => setIsModalOpen(true)}
              className={cn(
                "group relative px-14 py-6 rounded-full overflow-hidden transition-all duration-300",
                "bg-gold-gradient text-black font-jost font-black text-[11px] tracking-[0.3em] uppercase",
                "shadow-gold-glow-lg hover:shadow-gold-glow-xl border border-white/20"
              )}
            >
              <span className="relative z-10">
                {t("ctaPrimary")}
              </span>
              
              {/* Luxury Shimmer */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Fade-out blending */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      <ApplyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
