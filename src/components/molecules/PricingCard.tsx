"use client";

/**
 * src/components/molecules/PricingCard.tsx
 * 
 * Luxury Pricing Table Card.
 */
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { fontJoti } from "@/lib/fonts";

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

export function PricingCard({ name, price, features, isPopular, ctaText }: PricingCardProps) {
  return (
    <motion.div
      whileHover={{ y: -16, scale: 1.02 }}
      className={cn(
        "group relative p-8 md:p-12 rounded-[3rem] flex flex-col transition-all duration-700 overflow-hidden shadow-glass",
        isPopular 
          ? "border-gold/40 bg-gold/[0.04] shadow-gold-glow-lg" 
          : "border-white/5 bg-white/[0.02] hover:border-gold/20"
      )}
    >
      {/* Premium Accents */}
      <div className="absolute -top-px left-0 w-full h-[2px] bg-shimmer-gold opacity-10 group-hover:opacity-40 animate-shimmer" />
      
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-8 right-8">
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-gold-gradient px-4 py-1.5 rounded-full shadow-gold-glow border border-gold-light/20"
          >
            <span className="text-[10px] font-black text-black uppercase tracking-[0.2em]">MOST ELITE</span>
          </motion.div>
        </div>
      )}

      {/* Plan Header */}
      <div className="mb-12">
        <h3 className="text-xs font-black text-neutral-500 uppercase tracking-[0.4em] mb-6">
          {name}
        </h3>
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-black text-gold/60 tracking-widest uppercase">IDR</span>
          <span className={cn(
            fontJoti.className,
            "text-fluid-h1 md:text-7xl font-black text-neutral-100 italic"
          )}>
            {price}
          </span>
        </div>
      </div>

      {/* Features List */}
      <ul className="flex flex-col gap-6 mb-16 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-5">
            <div className="w-6 h-6 rounded-full bg-gold/10 border border-gold/10 flex items-center justify-center group-hover:border-gold/30 transition-colors">
              <Check className="w-3 h-3 text-gold" />
            </div>
            <span className="font-jost text-fluid-body font-medium text-neutral-400 group-hover:text-neutral-200 transition-colors tracking-premium-body">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* High-Impact CTA */}
      <motion.button 
        whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
        className={cn(
          "w-full py-5 rounded-[2rem] font-jost font-black text-xs uppercase tracking-[0.3em] transition-all relative overflow-hidden",
          isPopular
            ? "bg-gold-gradient text-black shadow-gold-glow hover:shadow-gold-glow-xl"
            : "bg-white/5 border border-white/10 text-neutral-300 hover:bg-gold/5 hover:text-gold-light hover:border-gold/20"
        )}
      >
        <span className="relative z-10">{ctaText}</span>
        {isPopular && (
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer" />
        )}
      </motion.button>

      {/* Floating Depth Decoration */}
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gold/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </motion.div>
  );
}
