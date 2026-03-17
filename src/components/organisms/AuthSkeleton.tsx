"use client";

/**
 * src/components/organisms/AuthSkeleton.tsx
 * 
 * Luxury fallback for Auth flows.
 * Provides a shimmering placeholder that matches the AuthCard layout.
 */
import React from "react";
import { motion } from "framer-motion";

export function AuthSkeleton() {
  return (
    <div className="glass-card w-full max-w-md mx-auto p-10 flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="h-10 w-32 bg-white/5 rounded-lg animate-pulse" />
        <div className="h-4 w-48 bg-white/5 rounded-lg animate-pulse" />
      </div>

      <div className="flex flex-col gap-6">
        {/* Social button skeleton */}
        <div className="h-12 w-full bg-white/5 rounded-xl animate-pulse" />
        
        {/* Divider skeleton */}
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-white/5" />
          <div className="h-4 w-8 bg-white/5 rounded" />
          <div className="h-px flex-1 bg-white/5" />
        </div>

        {/* Input skeletons */}
        <div className="h-14 w-full bg-white/5 rounded-xl animate-pulse" />
        <div className="h-14 w-full bg-white/5 rounded-xl animate-pulse" />
        
        {/* Button skeleton */}
        <div className="h-14 w-full bg-gold/5 rounded-xl animate-pulse" />
      </div>
    </div>
  );
}
