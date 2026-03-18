"use client";

/**
 * src/components/atoms/Input.tsx
 * 
 * Luxury Input atom with:
 * - Floating label animation via Framer Motion
 * - Gold glow focus effect
 * - Responsive rem/Tailwind spacing
 * - Error message integration
 */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, value, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = String(value || "").length > 0;

    return (
      <div className="relative w-full flex flex-col gap-1.5 group">
        <div className="relative">
          <input
            {...props}
            id={id}
            ref={ref}
            value={value}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            className={cn(
              "peer w-full h-14 px-4 pt-5 pb-1",
              "bg-ink/40 text-white placeholder-transparent",
              "border border-white/10 rounded-xl",
              "outline-none transition-all duration-300",
              "focus:border-gold/50 focus:shadow-gold-glow focus:bg-ink/60",
              error && "border-red-500/50 focus:border-red-500/50 focus:shadow-red-500/10",
              className
            )}
            placeholder={label}
          />
          
          {/* Floating Label */}
          <motion.label
            htmlFor={id}
            initial={false}
            animate={{
              y: (isFocused || hasValue) ? -10 : 0,
              scale: (isFocused || hasValue) ? 0.8 : 1,
              x: (isFocused || hasValue) ? -4 : 0,
              color: isFocused ? "var(--gold)" : "rgba(255,255,255,0.4)"
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute left-4 top-4",
              "pointer-events-none origin-top-left",
              "font-jost text-base tracking-wide"
            )}
          >
            {label}
          </motion.label>
          
          {/* Subtle Focus Indicator */}
          <motion.div
            initial={false}
            animate={{ opacity: isFocused ? 1 : 0 }}
            className="absolute inset-x-4 -bottom-[1px] h-[2px] bg-gold-gradient blur-[0.5px]"
            aria-hidden="true"
          />
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs font-medium text-red-500/90 pl-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";
