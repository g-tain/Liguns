"use client";

/**
 * src/app/[locale]/terms/page.tsx
 * 
 * Professional Legal Document Page.
 * Features:
 * - Gold Scroll Progress Bar
 * - Sticky Table of Contents
 * - Narrow Layout for High Readability (max-w-3xl)
 * - 1.8 Line-height for document clarity
 */
import React from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useSpring } from "framer-motion";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { LegalSection } from "@/components/molecules/LegalSection";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function TermsPage() {
  const t = useTranslations("terms");
  
  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = [
    { id: "age", title: t("sections.age.title"), content: t("sections.age.content") },
    { id: "recruitment", title: t("sections.recruitment.title"), content: t("sections.recruitment.content") },
    { id: "ethics", title: t("sections.ethics.title"), content: t("sections.ethics.content") },
    { id: "privacy", title: t("sections.privacy.title"), content: t("sections.privacy.content") },
    { id: "liability", title: t("sections.liability.title"), content: t("sections.liability.content") },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-neutral-300 pb-32">
      {/* ── Scroll Progress Bar ── */}
      <motion.div 
        className="fixed top-20 left-0 right-0 h-1 bg-gold-gradient z-[60] origin-left"
        style={{ scaleX }}
      />

      <div className="max-w-screen-xl mx-auto px-6 pt-32 lg:pt-48">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* ── Sidebar (Sticky TOC) ── */}
          <aside className="hidden lg:block w-72 h-fit sticky top-48">
             <div className="flex flex-col gap-8">
                <h4 className="text-[10px] font-black text-gold/60 uppercase tracking-[0.4em] ml-2">
                   {t("toc.title")}
                </h4>
                <nav className="flex flex-col gap-2">
                   {sections.map((sec) => (
                     <a 
                       key={sec.id}
                       href={`#${sec.id}`}
                       className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gold/5 transition-all text-sm font-medium border border-transparent hover:border-gold/10"
                     >
                       <span className="w-1.5 h-1.5 rounded-full bg-gold/20 group-hover:bg-gold transition-colors" />
                       <span className="text-neutral-500 group-hover:text-neutral-200">{t(`toc.${sec.id}`)}</span>
                     </a>
                   ))}
                </nav>
             </div>
          </aside>

          {/* ── Main Document Content ── */}
          <main className="flex-1 max-w-3xl">
            <header className="flex flex-col gap-8 mb-24">
              <Link href="/lowongan" className="flex items-center gap-2 text-[10px] font-black text-neutral-500 uppercase tracking-widest hover:text-gold transition-colors group w-fit">
                 <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                 Back to Application
              </Link>

              <h1 className={cn(
                fontJoti.className,
                "text-5xl md:text-7xl text-white leading-none"
              )}>
                {t("title")}
              </h1>

              <div className="flex flex-col gap-4">
                <p className="text-gold/60 font-medium text-sm tracking-wide">
                  {t("lastUpdated")}
                </p>
                <p className="font-jost text-xl text-neutral-400 leading-relaxed italic border-l-2 border-gold/20 pl-8 py-2">
                  {t("description")}
                </p>
              </div>
            </header>

            <div className="flex flex-col gap-20">
               {sections.map((sec) => (
                 <LegalSection 
                   key={sec.id}
                   id={sec.id}
                   title={sec.title}
                   content={sec.content}
                 />
               ))}
            </div>

            {/* ── Footer Link ── */}
            <div className="mt-32 pt-16 border-t border-white/5 flex flex-col items-center">
               <Link href="/lowongan">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 px-10 py-5 rounded-full bg-gold/5 border border-gold/20 text-gold-light hover:bg-gold/10 transition-all cursor-pointer group shadow-gold-inner"
                  >
                    <span className="font-jost font-black text-xs uppercase tracking-[0.3em]">
                      {t("backToApply")}
                    </span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
               </Link>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
