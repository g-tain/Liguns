"use client";

/**
 * src/components/atoms/LocaleSwitcher.tsx
 *
 * Locale switcher atom — cycles between /id and /en.
 * Reads the current locale from next-intl and navigates to the other.
 */
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
  className?: string;
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const next    = locale === "id" ? "en" : "id";
    // pathname already has /[locale]/... prefix; replace it
    const newPath = pathname.replace(`/${locale}`, `/${next}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLocale}
      aria-label="Toggle language"
      className={cn(
        "text-xs font-semibold tracking-widest-caps uppercase",
        "border border-gold/20 rounded-lg px-3 py-1.5",
        "text-gold hover:text-gold-light hover:border-gold/40",
        "transition-all duration-200",
        className
      )}
    >
      {locale === "id" ? "EN" : "ID"}
    </button>
  );
}
