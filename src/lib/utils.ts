/**
 * src/lib/utils.ts
 *
 * Utility helpers for the entire app.
 * - cn(): Merges Tailwind class names safely, resolving conflicts.
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes without conflicts.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-gold", "hover:bg-gold-dark")
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
