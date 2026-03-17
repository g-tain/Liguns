"use client";

/**
 * src/components/molecules/LegalSection.tsx
 * 
 * Standardized layout for legal document clauses.
 * Features:
 * - ID for TOC jump links
 * - Joti One accent typography
 * - High readability line-height (1.7)
 */
import React from "react";
import { motion } from "framer-motion";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";

interface LegalSectionProps {
  id: string;
  title: string;
  content: string;
}

export function LegalSection({ id, title, content }: LegalSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="scroll-mt-32 flex flex-col gap-6"
    >
      <h2 className={cn(
        fontJoti.className,
        "text-2xl md:text-3xl text-gold-gradient italic"
      )}>
        {title}
      </h2>
      <p className="font-jost text-lg text-neutral-400 leading-[1.8] tracking-premium-body">
        {content}
      </p>
    </motion.section>
  );
}
