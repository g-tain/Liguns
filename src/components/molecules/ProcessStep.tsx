"use client";

/**
 * src/components/molecules/ProcessStep.tsx
 * 
 * Interactive Process Timeline Step.
 */
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fontJoti } from "@/lib/fonts";

interface ProcessStepProps {
  number: string;
  title: string;
  index: number;
}

export function ProcessStep({ number, title, index }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      className="relative flex flex-col items-center group cursor-pointer"
    >
      {/* Step Foundation */}
      <div className="relative group-hover:scale-110 transition-transform duration-700">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-neutral-950 border-[0.5px] border-gold/20 flex items-center justify-center relative z-10 group-hover:border-gold group-hover:shadow-gold-glow transition-all duration-500 shadow-gold-inner">
          <span className={cn(fontJoti.className, "text-gold text-base md:text-lg italic tracking-tighter")}>{number}</span>
        </div>
        
        {/* Pulsing Aura */}
        <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Title */}
      <h4 className="mt-8 px-4 text-center font-jost font-black text-neutral-100 group-hover:text-gold-light transition-colors tracking-widest-caps uppercase text-fluid-body leading-relaxed">
        {title}
      </h4>

      {/* Premium Connecting Line (Visual Path) */}
      <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-gold/40 via-gold/10 to-transparent -z-0">
        <div className="absolute inset-0 bg-gold/30 group-hover:animate-shimmer opacity-30" />
      </div>
    </motion.div>
  );
}
