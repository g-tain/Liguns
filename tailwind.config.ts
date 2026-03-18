import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── Color System ──────────────────────────────────────────────
      // Focusing on OLED-friendly darks and WCAG AA compliant golds
      colors: {
        gold: {
          DEFAULT: "#bb9a30", // Primary Accent
          light:   "#e6c35c", // Highlights
          dark:    "#8d7224", // Borders/Shadows
        },
        ink: {
          DEFAULT:  "#050505", // Deepest OLED black
          elevated: "#0A0A0A", // Card Backgrounds
          muted:    "#121212", // Subtle Sections
        },
      },

      // ── Typography (Global Unicorn Standard) ──────────────────────
      fontFamily: {
        jost:     ["var(--font-jost)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
        joti:     ["var(--font-joti)", "cursive"],
      },

      fontSize: {
        "display-large": ["clamp(2.5rem, 10vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-medium": ["clamp(2rem, 8vw, 5rem)", { lineHeight: "1.0", letterSpacing: "-0.015em" }],
        "fluid-h1": ["clamp(1.5rem, 5vw + 1rem, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "fluid-body": ["clamp(0.875rem, 0.5vw + 0.8rem, 1rem)", { lineHeight: "1.6", letterSpacing: "0.01em" }],
      },

      lineHeight: {
        premium: "1.6",
      },

      letterSpacing: {
        "tight-display": "-0.02em",
        "premium-body":  "0.01em",
        "widest-caps":   "0.15em",
      },

      // ── Spacing (Strict Rule of 8) ────────────────────────────────
      // Note: Tailwind default spacing 1-12 uses 4px increments (Rule of 4)
      // Custom semantic spacing for clarity
      spacing: {
        "18": "4.5rem", // 72px
        "22": "5.5rem", // 88px
        "page-m": "1.5rem", // px-6 for mobile (24px)
      },
      borderWidth: {
        DEFAULT: "1px",
        "0.5": "0.5px",
      },

      // ── Shadows & Depth ───────────────────────────────────────────
      boxShadow: {
        "gold-glow":    "0 0 30px 2px rgba(187, 154, 48, 0.12)",
        "gold-glow-lg": "0 0 60px 8px rgba(187, 154, 48, 0.18)",
        "glass":        "0 8px 32px 0 rgba(0, 0, 0, 0.6)",
        "gold-inner":   "inset 0 1px 0 0 rgba(187, 154, 48, 0.15)",
      },

      // ── Background Image Gradients ────────────────────────────────
      backgroundImage: {
        "gold-gradient":     "linear-gradient(135deg, #8d7224 0%, #bb9a30 45%, #e6c35c 50%, #bb9a30 55%, #8d7224 100%)",
        "ink-gradient":      "linear-gradient(180deg, #0A0A0A 0%, #050505 100%)",
        "shimmer-gold":      "linear-gradient(90deg, transparent 0%, rgba(187,154,48,0.1) 50%, transparent 100%)",
      },

      // ── Animations ────────────────────────────────────────────────
      keyframes: {
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
      animation: {
        shimmer:        "shimmer 3s linear infinite",
        "fade-up":      "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "float-slow":   "float-subtle 6s ease-in-out infinite",
      },

      // ── Interaction States ────────────────────────────────────────
      scale: {
        "102": "1.02",
      },

      // ── Backdrop Blur ─────────────────────────────────────────────
      backdropBlur: {
        "xxl": "40px",
      },
    },
  },
  plugins: [],
};

export default config;
