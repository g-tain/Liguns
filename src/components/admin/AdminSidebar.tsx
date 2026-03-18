"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  Menu, 
  X,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  locale: string;
}

const navItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    description: "Statistik & Analytics"
  },
  {
    href: "/admin/jobs",
    label: "Kelola Lowongan",
    icon: Briefcase,
    description: "Tambah/Edit Lowongan"
  },
  {
    href: "/admin/applicants",
    label: "Daftar Pelamar",
    icon: Users,
    description: "Kelola Pelamar"
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
    description: "WhatsApp & Disclaimer"
  }
];

export function AdminSidebar({ locale }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === `/${locale}${href}`;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="md:hidden fixed top-20 left-4 z-50 p-3 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-gold"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-72 bg-black/95 backdrop-blur-xl border-r border-white/5 z-50",
        "transform transition-transform duration-300 ease-out",
        "md:translate-x-0 md:static",
        isMobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo & Brand */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20">
              <ShieldCheck className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h1 className="text-sm font-black text-white tracking-wider">ADMIN</h1>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Control Panel</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden p-2 text-white/40 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "group relative flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200",
                  active 
                    ? "bg-gold/10 border border-gold/20" 
                    : "hover:bg-white/5 border border-transparent"
                )}
              >
                {/* Active Indicator */}
                {active && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold rounded-r-full"
                  />
                )}

                <div className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center transition-colors",
                  active 
                    ? "bg-gold text-black" 
                    : "bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white"
                )}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1">
                  <p className={cn(
                    "text-sm font-black uppercase tracking-wider transition-colors",
                    active ? "text-gold" : "text-white/80 group-hover:text-white"
                  )}>
                    {item.label}
                  </p>
                  <p className="text-[10px] text-white/40">
                    {item.description}
                  </p>
                </div>

                <ChevronRight className={cn(
                  "w-4 h-4 transition-all duration-200",
                  active 
                    ? "text-gold opacity-100" 
                    : "text-white/20 opacity-0 group-hover:opacity-100"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">
              Status Sistem
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/60">Online & Aktif</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile FAB - Floating Action Button */}
      <Link
        href={`/${locale}/admin/jobs`}
        className="md:hidden fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-gold-glow"
      >
        <Briefcase className="w-6 h-6 text-black" />
      </Link>
    </>
  );
}
