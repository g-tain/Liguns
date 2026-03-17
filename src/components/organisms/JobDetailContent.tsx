"use client";

/**
 * src/components/organisms/JobDetailContent.tsx
 * 
 * Structured job content section based on image_1.png:
 * - Deskripsi, Kualifikasi, Fasilitas, Noted.
 * - Premium gold bullets and markers.
 * - Solid gold "LAMAR SEKARANG" button with shimmer.
 */
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Sparkles, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { fontJoti } from "@/lib/fonts";
import { ApplyModal } from "./ApplyModal";

interface DetailSection {
  title: string;
  content: string | string[];
}

interface JobDetailContentProps {
  sections: DetailSection[];
}

export function JobDetailContent({ sections }: JobDetailContentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <section className="max-w-screen-xl mx-auto px-page-m pb-24 md:pb-48">
      <div className="max-w-4xl mx-auto flex flex-col gap-24">
        {/* Unified Modal Gateway */}
        <ApplyModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          initialJob="Spa Therapist (Venetian)"
        />

        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 1 }}
            className="flex flex-col gap-8 md:gap-10"
          >
            {/* Elite Section Heading */}
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4">
                  <div className="w-2 h-8 bg-gold-gradient rounded-full shadow-gold-glow" />
                  <h2 className={cn(
                    fontJoti.className,
                    "text-lg md:text-4xl font-black text-neutral-100 tracking-tight leading-none uppercase tracking-widest-caps"
                  )}>
                    {section.title}
                  </h2>
               </div>
               <div className="w-full h-px bg-white/5 mt-4" />
            </div>

            {/* Rich Content Body */}
            <div className="flex flex-col gap-6 relative">
              {Array.isArray(section.content) ? (
                <ul className="flex flex-col gap-6">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-6 group">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gold mt-2 md:mt-2.5 shadow-gold-glow flex-shrink-0 group-hover:scale-150 transition-transform duration-500" />
                      <p className="text-neutral-400 font-jost text-fluid-body leading-relaxed md:leading-premium group-hover:text-neutral-200 transition-colors tracking-premium-body">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-neutral-400 font-jost text-lg leading-premium tracking-premium-body">
                  {section.content}
                </p>
              )}
            </div>
          </motion.div>
        ))}

        {/* ── High-Impact Action Hub ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-10 pt-12"
        >
          {/* Main Action: Secure Application */}
          <motion.button
            whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            onClick={() => setIsModalOpen(true)}
            className={cn(
               "group relative w-full sm:w-auto px-16 py-6 rounded-full overflow-hidden transition-all duration-500",
               "bg-gold-gradient shadow-gold-glow flex items-center justify-center gap-4"
            )}
          >
            <Send className="w-6 h-6 text-black" />
            <span className="relative z-10 text-black font-jost font-black text-xs tracking-[0.3em] uppercase">
              Secure Application
            </span>
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
          </motion.button>

          {/* Secondary Action: Portal Return */}
          <Link href="/lowongan" className="w-full sm:w-auto">
            <motion.button
              whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className={cn(
                "w-full px-16 py-6 rounded-full border-[0.5px] border-gold/20 text-gold-light font-jost font-black text-xs tracking-[0.3em] uppercase transition-all duration-500",
                "hover:bg-gold/5 flex items-center justify-center gap-3 shadow-gold-inner"
              )}
            >
              <ChevronLeft className="w-5 h-5 translate-y-[-1px]" />
              Return to Jobs
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
