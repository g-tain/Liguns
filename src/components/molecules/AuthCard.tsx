"use client";

/**
 * src/components/molecules/AuthCard.tsx
 * 
 * Premium glassmorphism card for Authentication flows.
 * Uses Framer Motion for entrance and layout transitions.
 */
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export function AuthCard({ children, title, subtitle, className }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "glass-card w-full max-w-md mx-auto p-8 md:p-10",
        "relative flex flex-col gap-8 overflow-hidden",
        "bg-noise", // design system noise texture
        className
      )}
    >
      {/* Glow Effect Corner */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-gold/10 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="flex flex-col gap-2 relative z-10">
        <h2 className="text-3xl font-playfair font-black text-white tracking-tight-display">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm font-jost text-white/40 leading-relaxed font-medium">
            {subtitle}
          </p>
        )}
      </div>

      <div className="relative z-10 flex flex-col gap-6">
        {children}
      </div>
    </motion.div>
  );
}
