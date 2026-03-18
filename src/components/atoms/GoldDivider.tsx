/**
 * src/components/atoms/GoldDivider.tsx
 *
 * Thin horizontal decorator using the gold gradient.
 * Accepts an optional `className` for width/margin overrides.
 */
import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({ className }: GoldDividerProps) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={cn("divider-gold w-full", className)}
    />
  );
}
