"use client";

/**
 * src/components/AgeGate.tsx
 * 
 * Cinematic Age verification gate (19+).
 * Features:
 * - Backdrop-blur-2xl with OLED-optimized black overlay.
 * - Shimmering gold borders.
 * - Legal agreement integration.
 * - LocalStorage persistence.
 */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export function AgeGate() {
  const t = useTranslations("ageGate");
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const verified = localStorage.getItem("age-verified");
    if (!verified) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("age-verified", "true");
    setIsVisible(false);
    document.body.style.overflow = "unset";
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-6"
        >
          {/* Central Gold Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-black/40 border border-gold/30 rounded-[3rem] p-8 md:p-12 text-center shadow-gold-glow-xl overflow-hidden"
          >
            {/* Shimmer Effect on Border */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent animate-shimmer" />

            <div className="flex flex-col items-center gap-6">
              {/* Logo First */}
              <div className="relative w-20 h-auto">
                <Image 
                  src="/assets/img/Logo Liguns.png"
                  alt="Liguns Entertainment"
                  width={80}
                  height={40}
                  className="object-contain filter drop-shadow-gold"
                  priority
                />
              </div>

              {/* Typography */}
              <div className="flex flex-col gap-4">
                <h2 className={cn(
                  fontJoti.className,
                  "text-3xl md:text-4xl text-gold-gradient leading-tight"
                )}>
                  {t("title")}
                </h2>
                <p className="font-jost text-neutral-400 text-base md:text-lg leading-relaxed px-4">
                  {t("description")}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col w-full gap-4">
                <motion.button
                  whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                  onClick={handleVerify}
                  className="w-full py-4 md:py-5 rounded-full bg-gold-gradient text-black font-jost font-black text-xs tracking-[0.3em] uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
                >
                  SAYA BERUSIA 19+
                </motion.button>
                
                <button
                  onClick={handleExit}
                  className="text-[10px] font-black text-neutral-600 uppercase tracking-widest hover:text-white transition-colors"
                >
                  KEMUDAHAN / EXIT
                </button>
              </div>

              {/* Legal Link */}
              <div className="pt-4 border-t border-white/5 w-full">
                <p className="text-[10px] md:text-[11px] text-neutral-500 font-medium">
                  Dengan melanjutkan, Anda menyetujui{" "}
                  <Link href="/terms" className="text-gold hover:underline">
                    Ketentuan Layanan
                  </Link>{" "}
                  kami.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
