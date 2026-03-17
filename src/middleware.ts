/**
 * src/middleware.ts
 *
 * next-intl middleware handles locale detection and routing.
 * - Redirects `/` → `/id` (default locale)
 * - Preserves locale prefix in all routes for SEO
 */
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "@/i18n";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/...)
  // - _next internals
  // - Static files (images, fonts, etc.)
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
