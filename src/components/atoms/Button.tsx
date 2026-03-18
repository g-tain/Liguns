"use client";

/**
 * src/components/atoms/Button.tsx
 *
 * Reusable Button atom with:
 * - Framer Motion whileTap scale(0.95) press feedback
 * - Shimmer sweep animation on `primary` variant
 * - Glassmorphism style on `ghost` variant
 * - No fixed pixel values — uses rem/Tailwind spacing
 */
import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";
type Size    = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: Variant;
  size?:    Size;
  children: React.ReactNode;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    "btn-shimmer",                    // shimmer pseudo-element (globals.css)
    "bg-gold text-ink font-semibold",
    "hover:bg-gold-light",
    "shadow-gold-glow",
    "border border-gold-dark/40",
  ].join(" "),

  ghost: [
    "glass-card",                     // glassmorphism (globals.css)
    "text-gold-light font-medium",
    "hover:border-gold/30",
    "border border-gold/10",
  ].join(" "),

  outline: [
    "border border-gold/40 text-gold font-medium",
    "hover:bg-gold/10 hover:border-gold/60",
    "transition-colors duration-200",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-2xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant  = "primary",
      size     = "md",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center gap-2",
          "font-jost tracking-wide cursor-pointer",
          "transition-all duration-300 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
          // Variant + size
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
