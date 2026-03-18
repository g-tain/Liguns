/**
 * src/app/[locale]/page.tsx
 * 
 * Main landing page for Liguns.
 * High-fidelity sequential assembly of premium organisms.
 */
import { Hero } from "@/components/organisms/Hero";
import { Features } from "@/components/organisms/Features";
import { TrustSection } from "@/components/organisms/TrustSection";
import { Faq } from "@/components/organisms/Faq";
import { CallToAction } from "@/components/organisms/CallToAction";
import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Required for static rendering with next-intl
  setRequestLocale(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <TrustSection />
      <Features />
      <CallToAction />
      <Faq />
    </div>
  );
}
