"use client";

/**
 * src/components/molecules/ServiceCard.tsx
 * 
 * Luxury Service Card with Glassmorphism and Lucide icons.
 */
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { fontJoti } from "@/lib/fonts";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export function ServiceCard({ title, description, icon: Icon, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -12 }}
      whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      className={cn(
        "group relative p-6 md:p-12 rounded-2xl md:rounded-[3rem] overflow-hidden transition-all duration-700",
        "bg-white/[0.03] backdrop-blur-xxl border-[0.5px] border-gold/10 hover:border-gold/30 shadow-glass"
      )}
    >
      {/* Premium Shimmer Background */}
      <div className="absolute inset-0 bg-shimmer-gold opacity-0 group-hover:animate-shimmer pointer-events-none" />
      
      {/* Icon with Glowing Foundation */}
      <div className="w-20 h-20 rounded-3xl bg-gold/5 flex items-center justify-center mb-10 border border-gold/10 group-hover:bg-gold/10 group-hover:rotate-6 group-hover:border-gold/40 transition-all duration-500 shadow-gold-inner">
        <Icon className="w-10 h-10 text-gold-light transition-transform duration-500 group-hover:scale-110" />
      </div>

      <h3 className={cn(
        fontJoti.className,
        "text-lg lg:text-3xl font-black text-neutral-100 group-hover:text-gold-light transition-colors mb-4 md:mb-6 leading-tight uppercase tracking-widest-caps"
      )}>
        {title}
      </h3>
      
      <p className="font-jost text-neutral-400 text-fluid-body leading-relaxed md:leading-premium group-hover:text-neutral-200 transition-colors tracking-premium-body">
        {description}
      </p>

      {/* Interactive Bottom Bar */}
      <div className="mt-12 flex items-center gap-4 group/btn">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-light opacity-50 group-hover:opacity-100 transition-opacity">
          Pelajari Lebih Lanjut
        </span>
        <div className="flex-1 h-px bg-gold/10 group-hover:bg-gold/30 transition-colors" />
        <motion.div 
          whileHover={{ x: 5 }}
          className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold-gradient group-hover:text-black transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
