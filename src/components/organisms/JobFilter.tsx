"use client";

/**
 * src/components/organisms/JobFilter.tsx
 * 
 * Premium horizontal filter bar for cities.
 * Features:
 * - Smooth Framer Motion layout transitions
 * - Horizontal scrolling on mobile
 * - Gold gradient active states
 */
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface JobFilterProps {
  cities: { id: string; label: string }[];
  activeLocale: string;
  activeCity: string;
  onCityChange: (cityId: string) => void;
}

export function JobFilter({ cities, activeCity, onCityChange }: JobFilterProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
        {cities.map((city) => {
          const isActive = activeCity === city.id;
          
          return (
            <button
              key={city.id}
              onClick={() => onCityChange(city.id)}
              className="relative group flex-shrink-0"
            >
              <div
                className={cn(
                  "relative z-10 px-8 py-3.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase transition-all duration-700",
                  isActive 
                    ? "text-black bg-gold-gradient shadow-gold-glow" 
                    : "text-neutral-500 bg-white/5 border border-white/5 hover:text-white hover:bg-gold/5 hover:border-gold/20"
                )}
              >
                {city.label}
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="active-filter-glow"
                  className="absolute inset-0 bg-gold/30 blur-2xl rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
