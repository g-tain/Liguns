/**
 * src/lib/fonts.ts
 *
 * Centralised font definitions using next/font/google.
 * This prevents FOIT (Flash of Invisible Text) and optimises CLS
 * by pre-calculating font metrics at build time.
 *
 * Usage: import { fontJost, fontPlayfair } from "@/lib/fonts"
 */
import { Jost, Playfair_Display, Joti_One, Inter } from "next/font/google";

/**
 * fontJost — Interface / Body Font
 */
export const fontJost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/**
 * fontInter — Alternative UI Font for high readability
 */
export const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * fontPlayfair — Display / Heading Font
 */
export const fontPlayfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
});

/**
 * fontJoti — Accented Luxury Heading
 */
export const fontJoti = Joti_One({
  subsets: ["latin"],
  variable: "--font-joti",
  weight: "400",
  display: "swap",
});

