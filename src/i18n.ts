/**
 * src/i18n.ts
 *
 * next-intl server configuration.
 * getRequestConfig runs once per request on the server and returns
 * the locale + preloaded messages for that locale.
 */
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = ["id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming locale is supported
  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale: locale as string,
    messages: (
      await import(`./dictionaries/${locale}.json`)
    ).default,
  };
});
