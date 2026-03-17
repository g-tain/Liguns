"use client";

/**
 * src/components/organisms/Footer.tsx
 * 
 * Luxury minimalist footer with:
 * - Gold gradient accents
 * - Responsive grid layout
 * - Pure rem/Tailwind spacing
 * - Translucent glassmorphism base
 */
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Instagram, Twitter, MessageSquare, ShieldCheck, Globe } from "lucide-react";
import { fontJoti, fontJost } from "@/lib/fonts";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-white/5 bg-neutral-950 pt-24 pb-12 overflow-hidden">
      {/* Cinematic Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl aspect-[2/1] bg-gold/5 blur-[120px] rounded-full pointer-events-none opacity-50" />

      <div className="section-container relative z-10 px-6 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">

          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col gap-8">
            <Link href="/" className="inline-block relative">
              <Image
                src="/assets/img/Logo Liguns.png"
                alt="Liguns Entertainment"
                width={40}
                height={15}
                className="object-contain filter drop-shadow-gold invert"
              />
            </Link>
            <p className="font-jost text-neutral-500 max-w-md text-lg leading-relaxed">
              Platform rekrutmen dan pengembangan talent hiburan Malam. </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Instagram className="w-5 h-5" />} label="Instagram" />
              <SocialIcon icon={<Twitter className="w-5 h-5" />} label="Twitter" />
              <SocialIcon icon={<MessageSquare className="w-5 h-5" />} label="WhatsApp" />
            </div>
          </div>

          {/* Quick Links Group */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {/* Nav Links */}
            <div className="flex flex-col gap-8">
              <h4 className={cn(fontJoti.className, "text-xl text-gold-gradient tracking-wide")}>
                Platform
              </h4>
              <nav className="flex flex-col gap-4">
                <FooterLink href="/lowongan">{t("jobs")}</FooterLink>
                <FooterLink href="/layanan">{t("services")}</FooterLink>
                <FooterLink href="/about">Tentang Kami</FooterLink>
              </nav>
            </div>

            {/* Support/Legal */}
            <div className="flex flex-col gap-8">
              <h4 className={cn(fontJoti.className, "text-xl text-gold-gradient tracking-wide")}>
                Legalitas
              </h4>
              <nav className="flex flex-col gap-4">
                <FooterLink href="/terms">{t("terms")}</FooterLink>
                <FooterLink href="/privacy">Privasi Data</FooterLink>
                <FooterLink href="/help">Pusat Bantuan</FooterLink>
              </nav>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col gap-8 col-span-2 md:col-span-1">
              <h4 className={cn(fontJoti.className, "text-xl text-gold-gradient tracking-wide")}>
                Keamanan
              </h4>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-neutral-400 group cursor-default">
                  <ShieldCheck className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors" />
                  <span className="text-xs font-jost uppercase tracking-[0.2em] font-medium">Verified 19+</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400 group cursor-default">
                  <Globe className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors" />
                  <span className="text-xs font-jost uppercase tracking-[0.2em] font-medium">Digital Hub</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[10px] md:text-xs font-jost text-neutral-600 tracking-wide font-medium uppercase italic">
              &copy; {currentYear} Liguns Entertainment. Segala hak cipta dilindungi undang-undang.
            </p>
          </div>
        </div>
      </div>
    </footer >
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm md:text-base font-jost text-neutral-500 hover:text-white hover:translate-x-1 transition-all duration-300 font-medium inline-block"
    >
      {children}
    </Link>
  );
}

function SocialIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-neutral-400 hover:text-gold hover:bg-gold/5 hover:border-gold/20 transition-all duration-300 group shadow-lg"
      aria-label={label}
    >
      {icon}
    </motion.button>
  );
}
