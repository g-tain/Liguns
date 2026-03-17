"use client";

/**
 * src/components/molecules/JobCardSkeleton.tsx
 * 
 * Luxury Gold-pulsing skeleton for Job Cards.
 * Maintains Cyberpunk aesthetic during content loading.
 */
import React from "react";
import { cn } from "@/lib/utils";

export function JobCardSkeleton() {
  return (
    <div className={cn(
      "glass-card p-6 rounded-2xl border border-gold/10 overflow-hidden relative",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-gold/5 before:to-transparent before:animate-shimmer"
    )}>
      {/* Header: Logo + Title */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl bg-white/5 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-white/5 rounded animate-pulse" />
        </div>
      </div>

      {/* Body: Meta info */}
      <div className="space-y-4 mb-6">
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-gold/5 rounded-full animate-pulse" />
          <div className="h-6 w-24 bg-white/5 rounded-full animate-pulse" />
        </div>
        <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
      </div>

      {/* Footer: Price + Button */}
      <div className="flex justify-between items-center pt-6 border-t border-white/5 mt-auto">
        <div className="h-6 w-28 bg-gold/10 rounded animate-pulse" />
        <div className="h-8 w-24 bg-white/5 rounded-full animate-pulse" />
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10px] right-[-10px] w-20 h-px bg-gold/20 rotate-45" />
      </div>
    </div>
  );
}
