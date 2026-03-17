"use client";

/**
 * src/app/[locale]/help/page.tsx
 * 
 * Luxury Help Center / FAQ Redirect.
 */
import React from "react";
import { useTranslations } from "next-intl";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, HelpCircle, MessageSquare } from "lucide-react";

export default function HelpPage() {
  const t = useTranslations("faq");

  return (
    <div className="relative min-h-screen bg-black pt-32 pb-24">
      <div className="section-container max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        <Link href="/" className="inline-flex items-center gap-2 text-gold-light hover:text-white transition-colors mb-24 group self-start">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
           <span className="font-jost text-xs font-black uppercase tracking-widest">Kembali</span>
        </Link>

        <div className="flex flex-col items-center gap-8 mb-24">
          <div className="w-20 h-20 rounded-3xl bg-gold/5 border border-gold/10 flex items-center justify-center text-gold mb-4 shadow-gold-inner">
            <HelpCircle className="w-10 h-10" />
          </div>
          <h1 className={cn(fontJoti.className, "text-5xl md:text-[8rem] text-neutral-100 leading-[0.9] tracking-tight-display")}>
            Pusat <br />
            <span className="text-gold-gradient">Bantuan</span>
          </h1>
          <p className="font-jost text-neutral-400 max-w-md text-lg leading-relaxed md:leading-premium tracking-premium-body">
            Butuh bantuan mendesak atau memiliki pertanyaan spesifik? Tim kami siap melayani Anda 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl text-left">
           <div className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col gap-6">
              <h3 className={cn(fontJoti.className, "text-2xl text-gold-light")}>Pertanyaan Umum</h3>
              <p className="font-jost text-neutral-500 text-sm">
                 Silakan baca halaman FAQ di beranda kami untuk jawaban atas pertanyaan yang paling sering diajukan.
              </p>
              <Link href="/#faq" className="mt-4 text-xs font-black text-white uppercase tracking-widest hover:text-gold transition-colors">
                BACA FAQ &rarr;
              </Link>
           </div>

           <div className="p-10 rounded-[2.5rem] bg-gold/[0.03] border border-gold/10 flex flex-col gap-6 shadow-gold-inner">
              <h3 className={cn(fontJoti.className, "text-2xl text-gold-light")}>Kontak Person</h3>
              <p className="font-jost text-neutral-500 text-sm">
                 Hubungi admin resmi kami untuk konsultasi langsung atau kendala teknis pendaftaran.
              </p>
              <Link href="https://wa.me/6289669094929" target="_blank" className="flex items-center gap-3 mt-4 text-xs font-black text-white uppercase tracking-widest hover:text-gold transition-colors">
                <MessageSquare className="w-4 h-4" />
                WHATSAPP KAMI &rarr;
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
