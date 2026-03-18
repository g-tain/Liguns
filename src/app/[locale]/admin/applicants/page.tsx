import { redirect } from "next/navigation";

/**
 * src/app/[locale]/admin/applicants/page.tsx
 * 
 * Legacy Applicants Route.
 * Redirects to the new centralized Admin Dashboard.
 */

export default async function AdminApplicantsLegacyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  redirect(`/${locale}/admin/dashboard`);
}
