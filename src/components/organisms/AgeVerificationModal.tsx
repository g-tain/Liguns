"use client";

/**
 * src/components/organisms/AgeVerificationModal.tsx
 * 
 * Cinematic Age Gate for legal compliance (19+).
 * Features:
 * - Backdrop blur XXL
 * - LocalStorage persistence
 * - Joti One premium typography
 */
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, LogOut } from "lucide-react";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export function AgeVerificationModal() {
  const t = useTranslations("ageGate");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isVerified = localStorage.getItem("age-verified-19");
    if (!isVerified) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("age-verified-19", "true");
    setIsVisible(false);
    document.body.style.overflow = "unset";
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black"
        >
          {/* Background Decor */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(187,154,48,0.15)_0%,transparent_70%)]" />
          </div>

          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg glass-card p-10 md:p-16 rounded-[3rem] border border-gold/30 shadow-gold-glow-lg text-center flex flex-col items-center gap-10"
          >
            {/* Icon Group */}
            <div className="relative">
              <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full scale-110 animate-pulse" />
              <div className="relative w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                 <ShieldCheck className="w-10 h-10 text-gold-light" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              <h2 className={cn(
                fontJoti.className,
                "text-4xl md:text-5xl text-gold-gradient leading-tight"
              )}>
                {t("title")}
              </h2>
              <p className="font-jost text-neutral-400 text-lg leading-premium tracking-premium-body">
                {t("description")}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col w-full gap-4">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirm}
                className="w-full py-5 rounded-full bg-gold-gradient text-black font-jost font-black text-xs tracking-[0.3em] uppercase shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
              >
                {t("confirm")}
              </motion.button>
              
              <button
                onClick={handleExit}
                className="flex items-center justify-center gap-2 text-[10px] font-black text-neutral-600 uppercase tracking-widest hover:text-white transition-colors py-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                {t("exit")}
              </button>
            </div>

            {/* Subtle Footer */}
            <p className="text-[10px] text-neutral-700 font-medium uppercase tracking-[0.2em]">
              Safe & Secure Experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
