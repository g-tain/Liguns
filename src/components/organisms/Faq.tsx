"use client";

/**
 * src/components/organisms/Faq.tsx
 * 
 * Premium Animated Accordion for FAQ with:
 * - Framer Motion AnimatePresence
 * - Left-border gold glow on active items
 * - Responsive layout with high readability
 */
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { fontJoti } from "@/lib/fonts";

export function Faq() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: t("q1"), a: t("a1") },
    { q: t("q2"), a: t("a2") },
    { q: t("q3"), a: t("a3") },
    { q: t("q4"), a: t("a4") },
  ];

  return (
    <section className="max-w-screen-xl mx-auto px-page-m py-24 md:py-48">
      <div className="max-w-4xl mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20"
          >
            <span className="text-[10px] font-black text-gold uppercase tracking-[0.4em]">
              KNOWLEDGE HUB
            </span>
          </motion.div>
          <h2 className={cn(
            fontJoti.className,
            "text-mobile-h1 md:text-7xl font-black text-neutral-100 tracking-tight-display leading-[1.0] md:leading-[0.9]"
          )}>
            {t("title")}
          </h2>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-6">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === idx}
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ 
  question, 
  answer, 
  isOpen, 
  onClick 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean; 
  onClick: () => void;
}) {
  return (
    <div 
      className={cn(
        "group relative bg-ink-gradient border-[0.5px] border-white/5 rounded-2xl md:rounded-[2rem] overflow-hidden transition-all duration-500",
        isOpen ? "border-gold/30 shadow-gold-glow" : "hover:border-gold/20"
      )}
    >
      <motion.button
        whileTap={{ scale: 0.98, transition: { type: "spring", stiffness: 400, damping: 17 } }}
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 md:p-10 text-left focus:outline-none"
      >
        <span className={cn(
          "font-jost text-fluid-body font-black tracking-tight transition-colors duration-300",
          isOpen ? "text-gold-light" : "text-neutral-400 group-hover:text-white"
        )}>
          {question}
        </span>
        <div className={cn(
          "w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center transition-all duration-500",
          isOpen ? "bg-gold rotate-180 border-transparent shadow-gold-glow" : "bg-white/5 group-hover:border-gold/30"
        )}>
          <ChevronDown className={cn(
            "w-5 h-5 transition-colors",
            isOpen ? "text-black" : "text-gold"
          )} />
        </div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 md:px-10 pb-8 md:pb-10 pt-0 font-jost text-neutral-300 leading-relaxed md:leading-premium text-fluid-body">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
