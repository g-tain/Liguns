"use client";

/**
 * src/components/organisms/Navbar.tsx
 * 
 * Custom Box Navbar based on specific user code:
 * - Centered 440px wide header on desktop.
 * - 55px height with 35px bottom-only rounding.
 * - Complex shadow system (gold glow + inner highlights).
 * - Responsive: transitions to wider/flexible on mobile if needed, 
 *   but following the requested 440px spec for the primary view.
 */
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("nav");
  const pathname = usePathname();


  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
          "w-full max-w-[440px] h-[55px]",
          "bg-neutral-950 rounded-[0px_0px_35px_35px]",
          "shadow-[0px_4px_4px_#bb9a30,inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)]",
          "backdrop-blur-xl"
        )}
      >
        <div className="w-full h-full px-8 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="relative z-50 group flex items-center gap-3">
            <motion.div
              whileTap={{ scale: 0.96, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              className="relative w-20 h-8"
            >
              <Image 
                src="/assets/img/Logo Liguns.png" 
                alt="Liguns" 
                fill
                priority
                className="object-contain filter drop-shadow-gold"
              />
            </motion.div>
          </Link>

          {/* Combined Navigation & Hamburger */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation Links - Hidden on very small screens if width is 440px */}
            <div className="hidden sm:flex items-center gap-6">
              <NavLink href="/">{t("home")}</NavLink>
              <NavLink href="/lowongan">{t("jobs")}</NavLink>
              <NavLink href="/layanan">{t("services")}</NavLink>
            </div>

            {/* Mobile/Floating Hamburger Toggle */}
            <motion.button
              whileTap={{ scale: 0.9, transition: { type: "spring", stiffness: 400, damping: 17 } }}
              onClick={() => setMobileOpen((o) => !o)}
              className="w-10 h-10 flex flex-col items-center justify-center gap-1 focus:outline-none group z-50"
              aria-label="Toggle Navigation Menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1.5px] bg-gold-light rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                className="w-6 h-[1.5px] bg-gold/50 rounded-full"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                className="w-6 h-[1.5px] bg-gold-light rounded-full"
              />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 z-[49] bg-black/95 backdrop-blur-xxl flex flex-col pt-32 pb-12 px-8 overflow-y-auto"
            >
              <div className="flex flex-col gap-6">
                <MobileNavLink href="/" onClick={() => setMobileOpen(false)}>{t("home")}</MobileNavLink>
                <MobileNavLink href="/lowongan" onClick={() => setMobileOpen(false)}>{t("jobs")}</MobileNavLink>
                <MobileNavLink href="/layanan" onClick={() => setMobileOpen(false)}>{t("services")}</MobileNavLink>
                <MobileNavLink href="/about" onClick={() => setMobileOpen(false)}>{t("about")}</MobileNavLink>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 border-t border-white/5 pt-8"
              >
                <p className="text-center text-neutral-500 font-jost text-[10px] uppercase tracking-widest opacity-40">
                  &copy; {new Date().getFullYear()} Liguns Entertainment
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const strippedPath = pathname.replace(/^\/(id|en|ms)/, "") || "/";
  const isActive = strippedPath === href || (href !== "/" && strippedPath.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "relative text-[11px] font-jost font-black tracking-[0.15em] uppercase transition-all duration-300",
        isActive ? "text-gold" : "text-neutral-400 hover:text-white"
      )}
    >
      <motion.span
        whileHover={{ y: -2 }}
        className="inline-block"
      >
        {children}
      </motion.span>
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gold shadow-gold-glow"
        />
      )}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  const pathname = usePathname();
  const strippedPath = pathname.replace(/^\/(id|en|ms)/, "") || "/";
  const isActive = strippedPath === href || (href !== "/" && strippedPath.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-2xl md:text-3xl font-joti font-black tracking-[-0.02em] transition-all",
        isActive ? "text-gold translate-x-4" : "text-neutral-700 hover:text-white"
      )}
    >
      <motion.span
        whileTap={{ x: 10 }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </Link>
  );
}
