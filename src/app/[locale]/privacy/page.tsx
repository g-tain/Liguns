"use client";

/**
 * src/app/[locale]/privacy/page.tsx
 * 
 * Minimalist Privacy Policy page.
 */
import React from "react";
import { useTranslations } from "next-intl";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  const t = useTranslations("terms");

  return (
    <div className="relative min-h-screen bg-black pt-32 pb-24">
      <div className="section-container max-w-4xl mx-auto px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-gold-light hover:text-white transition-colors mb-12 group">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
           <span className="font-jost text-xs font-black uppercase tracking-widest">Kembali</span>
        </Link>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gold/5 border border-gold/10 flex items-center justify-center text-gold mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className={cn(fontJoti.className, "text-5xl md:text-7xl text-neutral-100 italic")}>
              Kebijakan Privasi
            </h1>
            <p className="font-jost text-neutral-500 italic uppercase tracking-widest text-xs">
              Terakhir diperbarui: 18 Maret 2026
            </p>
          </div>

          <div className="prose prose-invert max-w-none font-jost text-lg text-neutral-300 leading-relaxed md:leading-premium tracking-premium-body flex flex-col gap-8">
            <p>
              {t("sections.privacy.content")}
            </p>
            <p>
              Kami hanya mengumpulkan data yang Anda berikan secara sukarela untuk kepentingan rekrutmen. Data ini meliputi Nama, Usia, Berat Badan, Tinggi Badan, serta foto/video yang Anda kirimkan melalui tim administrasi WhatsApp resmi kami.
            </p>
            <p>
              Kami tidak akan pernah menjual atau memberikan data pribadi Anda kepada pihak ketiga tanpa persetujuan eksplisit dari Anda, kecuali diwajibkan oleh hukum yang berlaku di Republik Indonesia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
