import { redirect } from "next/navigation";

/**
 * src/app/[locale]/jobs/page.tsx
 * 
 * Legacy Jobs Route.
 * Redirects to the new centralized '/lowongan' portal.
 */

export default async function JobsLegacyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  redirect(`/${locale}/lowongan`);
}
