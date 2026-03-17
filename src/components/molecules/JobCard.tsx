"use client";

/**
 * src/components/molecules/JobCard.tsx
 * 
 * Cyberpunk Luxury Job Card Template.
 * Features:
 * - Backdrop blur glassmorphism
 * - Shimmering "Featured" badge
 * - Animated entrance while in view
 */
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { fontJoti } from "@/lib/fonts";

interface JobCardProps {
  title: string;
  venue: string;
  location: string;
  salary?: string;
  tags: string[];
  isFeatured?: boolean;
}

export function JobCard({ title, venue, location, salary, tags, isFeatured }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      className={cn(
        "group relative p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] overflow-hidden transition-all duration-700",
        "bg-white/[0.03] backdrop-blur-xl border border-white/5 hover:border-gold/30 shadow-glass",
        isFeatured && "border-gold/20 bg-gold/[0.04] shadow-gold-glow"
      )}
    >
      {/* Featured Shimmer Badge */}
      {isFeatured && (
        <div className="absolute top-4 right-4 z-10 md:top-6 md:right-6">
          <div className="relative px-3 py-1 rounded-full bg-gold/10 border-[0.5px] border-gold/30 overflow-hidden shadow-gold-inner">
            <span className="relative z-10 flex items-center gap-1 text-[9px] md:text-[10px] font-black text-gold-light uppercase tracking-[0.2em]">
              <Star className="w-2.5 h-2.5 fill-gold" />
              PRIORITY
            </span>
            <div className="absolute inset-0 w-full h-full bg-shimmer-gold opacity-30 animate-shimmer" />
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex items-start gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gold/5 border-[0.5px] border-gold/10 flex items-center justify-center group-hover:bg-gold/10 group-hover:rotate-6 transition-all duration-500 shadow-gold-inner">
           <Briefcase className="w-6 h-6 md:w-8 md:h-8 text-gold-light" />
        </div>
        <div className="flex-1">
          <h3 className={cn(
            fontJoti.className,
            "text-lg md:text-2xl font-black text-neutral-100 group-hover:text-gold-light transition-colors leading-tight"
          )}>
            {title}
          </h3>
          <p className="text-[9px] md:text-sm font-black text-neutral-500 mt-1 md:mt-2 uppercase tracking-[0.2em]">
            {venue}
          </p>
        </div>
      </div>

      {/* Meta Pills */}
      <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border-[0.5px] border-white/5 text-[9px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest">
          <MapPin className="w-2.5 h-2.5 text-gold/40" />
          {location}
        </div>
        {tags.map((tag) => (
          <span key={tag} className="px-2.5 py-1 rounded-full bg-gold/5 border-[0.5px] border-gold/10 text-[9px] md:text-[10px] font-black text-gold/60 uppercase tracking-widest">
            {tag}
          </span>
        ))}
      </div>

      {/* Footer: Price & Action */}
      <div className="flex justify-between items-center pt-6 md:pt-8 border-t border-white/5">
        <div>
          <p className="text-[9px] md:text-[10px] text-neutral-500 uppercase font-black tracking-[0.2em] mb-1">Estimation</p>
          <span className={cn(
            fontJoti.className,
            "text-xl md:text-2xl font-black text-neutral-100 italic"
          )}>
            {salary || "Exclusive"}
          </span>
        </div>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          whileHover={{ x: 5 }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[0.5px] border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold-gradient group-hover:text-black group-hover:border-transparent transition-all shadow-gold-inner group-hover:shadow-gold-glow"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      </div>

      {/* Dynamic Inner Glow */}
      <div className="absolute inset-0 bg-shimmer-gold opacity-0 group-hover:animate-shimmer pointer-events-none" />
    </motion.div>
  );
}
