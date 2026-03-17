"use client";

/**
 * src/components/organisms/JobDetailHeader.tsx
 * 
 * Venetian-themed header matching image_1.png:
 * - Luxury gold logo (glow effect)
 * - Premium serif typography for title
 * - Subtle radial background glows
 */
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Share2 } from "lucide-react";
import { fontJoti, fontPlayfair } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface JobDetailHeaderProps {
  title: string;
  company: string;
  address: string;
}

export function JobDetailHeader({ title, company, address }: JobDetailHeaderProps) {
  return (
    <section className="relative pt-48 pb-24 overflow-hidden bg-black">
      {/* Background Decor Master */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(187,154,48,0.12)_0%,transparent_70%)] blur-[120px]" />
        <div className="absolute inset-0 bg-noise opacity-[0.15]" />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-page-m md:px-6 flex flex-col items-center text-center">
        {/* Company Branding Section */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
           className="mb-16 relative group"
        >
          {/* Animated Aura */}
          <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full scale-150 group-hover:bg-gold/20 transition-all duration-1000" />
          
          <div className="relative flex flex-col items-center">
            {/* Venetian Dynamic Logo Style */}
            <div className="text-gold flex flex-col items-center">
               <span className={cn(
                  fontJoti.className, 
                  "text-7xl md:text-[10rem] tracking-tight-display drop-shadow-gold text-gold-gradient leading-none"
               )}>
                {company}
               </span>
                <div className="flex items-center gap-3 mt-1.5 md:mt-2 opacity-40">
                 <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gold" />
                 <span className="text-[8px] md:text-[10px] uppercase font-black tracking-[0.4em] md:tracking-[0.6em] text-neutral-400 translate-x-[0.2em] md:translate-x-[0.3em]">EST. 2026</span>
                 <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gold" />
               </div>
            </div>
          </div>
        </motion.div>

        {/* Job Title & Meta Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-4xl"
        >
          <h1 className={cn(
            fontJoti.className,
            "text-fluid-h1 md:text-7xl font-black text-neutral-100 mb-8 md:mb-10 tracking-tight-display leading-[1.1] md:leading-[0.95]"
          )}>
            {title}
          </h1>
          
          {/* Enhanced Meta Grid */}
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/5 group hover:border-gold/20 transition-all shadow-gold-inner">
              <MapPin className="w-4 h-4 text-gold-light group-hover:scale-110 transition-transform" />
              <address className="font-jost not-italic text-sm md:text-lg text-neutral-400 leading-premium tracking-premium-body">
                {address}
              </address>
            </div>
            
            <div className="flex items-center gap-10">
               <div className="h-px w-12 bg-white/10" />
               <motion.button 
                 whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
                 className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 hover:text-gold-light transition-all"
               >
                 <Share2 className="w-4 h-4" />
                 Secure Share
               </motion.button>
               <div className="h-px w-12 bg-white/10" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
