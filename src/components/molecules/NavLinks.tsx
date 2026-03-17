"use client";

/**
 * src/components/molecules/NavLinks.tsx
 *
 * Array-driven navigation links with active state indicator.
 * Animated underline on hover/active using Framer Motion layout IDs.
 */
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  onLinkClick?: () => void;
  orientation?: "horizontal" | "vertical";
}

export function NavLinks({
  onLinkClick,
  orientation = "horizontal",
}: NavLinksProps) {
  const t        = useTranslations("nav");
  const pathname = usePathname();
  const locale   = useLocale();

  const links = [
    { href: `/${locale}`,            label: t("home")      },
    { href: `/${locale}/events`,     label: t("events")    },
    { href: `/${locale}/community`,  label: t("community") },
    { href: `/${locale}/about`,      label: t("about")     },
  ];

  const isActive = (href: string) =>
    href === `/${locale}` ? pathname === href : pathname.startsWith(href);

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "flex gap-1",
        orientation === "vertical" ? "flex-col" : "flex-row items-center"
      )}
    >
      {links.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={cn(
              "relative px-3 py-2 text-sm font-medium rounded-lg",
              "transition-colors duration-200",
              active
                ? "text-gold-light"
                : "text-white/60 hover:text-white/90"
            )}
          >
            {link.label}

            {/* Animated active underline */}
            {active && (
              <motion.span
                layoutId="nav-active-indicator"
                className="absolute bottom-0 left-3 right-3 h-px bg-gold-gradient"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
