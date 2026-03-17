"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "gold";
}

export function Skeleton({ className, variant = "default" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        variant === "gold" ? "bg-gold/5" : "bg-white/5",
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-shimmer-gold opacity-50" />
    </div>
  );
}

export function SkeletonCircle({ className }: { className?: string }) {
  return <Skeleton className={cn("rounded-full", className)} />;
}

export function SkeletonText({ className }: { className?: string }) {
  return <Skeleton className={cn("h-4 w-full", className)} />;
}
