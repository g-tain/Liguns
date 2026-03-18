import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Toaster } from "sonner";
import { Navbar } from "@/components/organisms/Navbar";
import { Footer } from "@/components/organisms/Footer";
import { PageTransition } from "@/components/PageTransition";
import { fontJost, fontPlayfair, fontJoti, fontInter } from "@/lib/fonts";
import { AgeGate } from "@/components/AgeGate";
import JSONLDScript from "@/components/SEO/JSONLD";
import { locales, type Locale } from "@/i18n";
import "@/app/globals.css";

// ── Static Param Generation ──────────────────────────────────────
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ── Viewport (browser chrome colours) ───────────────────────────
export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// ── Metadata ─────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages  = await getMessages({ locale });

  // Safe string access (messages is unknown from getMessages)
  const seo = (messages as Record<string, Record<string, string>>).seo ?? {};

  const title       = seo.title       ?? "Liguns — Platform Komunitas Eksklusif Indonesia";
  const description = seo.description ?? "Bergabunglah dengan Liguns, platform komunitas premium Indonesia.";
  const siteName    = seo.siteName    ?? "Liguns";
  const siteUrl     = "https://ligunsentertainment.agency";

  // High-intent keywords for Nightlife Industry
  const primaryKeywords = "Agency Entertainment Bandung, Loker Nightlife Indonesia, Manajemen Talent Hiburan";
  const secondaryKeywords = "Terapis Spa Professional, Guest Relation Officer Bandung, Kerjasama Venue Hiburan";

  return {
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [primaryKeywords, secondaryKeywords],
    metadataBase: new URL(siteUrl),

    // ── OpenGraph ──
    openGraph: {
      type:        "website",
      locale:      "id_ID",
      url:         `${siteUrl}/${locale}`,
      siteName,
      title,
      description,
      images: [
        {
          url:    `${siteUrl}/og-image.jpg`,
          width:  1200,
          height: 630,
          alt:    siteName,
        },
      ],
    },

    // ── Twitter Card ──
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      images:      [`${siteUrl}/og-image.jpg`],
      creator:     "@ligunsid",
      site:        "@ligunsid",
    },

    // ── Alternate locale hreflang ──
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        "id-ID": `${siteUrl}/id`,
      },
    },

    // ── App / Icons ──
    icons: {
      icon:     "/favicon.ico",
      apple:    "/apple-touch-icon.png",
      shortcut: "/favicon-32x32.png",
    },

    robots: {
      index:          true,
      follow:         true,
      googleBot: {
        index:             true,
        follow:            true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet":       -1,
      },
    },
  };
}

// ── Root Layout ──────────────────────────────────────────────────
interface LocaleLayoutProps {
  children:  React.ReactNode;
  params:    Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as Locale)) notFound();

  // Enable static rendering with i18n
  setRequestLocale(locale);

  // Preload locale messages for client components
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      dir="ltr"
      className={`${fontJost.variable} ${fontPlayfair.variable} ${fontJoti.variable} ${fontInter.variable}`}
    >
      <head>
        <JSONLDScript schema="all" />
      </head>
      <body className="font-jost bg-ink text-white antialiased min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="flex-1 flex flex-col pt-20">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <AgeGate />
          <Footer />
          <Toaster 
            position="top-right" 
            toastOptions={{
              className: "glass-card !border-gold/20 !bg-ink/80 !text-white !font-jost",
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
