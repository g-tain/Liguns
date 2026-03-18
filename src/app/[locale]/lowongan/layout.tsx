import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "jobs" });

  const siteUrl = "https://ligunsentertainment.agency";

  return {
    title: t("title"),
    description: "Lowongan kerja hiburan malam terbaru di Indonesia. Liguns Entertainment membuka rekrutmen Guest Relation Officer, Terapis Spa, Hostess, dan posisi hiburan malam. Daftar sekarang di Bandung, Jakarta, Bali!",
    keywords: [
      "Loker Nightlife Indonesia",
      "Agency Entertainment Bandung",
      "Guest Relation Officer Bandung",
      "Manajemen Talent Hiburan",
      "Terapis Spa Professional",
      "Kerjasama Venue Hiburan",
      "lowongan hiburan malam",
      "recruitment nightclub",
      "loker bar",
      "GRO recruitment",
      "loker spa",
      "loker lc",
      "loker ladies companion",
      "loker bandung",
      "hostess job"
    ],
    
    // Canonical URL
    alternates: {
      canonical: `${siteUrl}/${locale}/lowongan`,
    },

    // OpenGraph
    openGraph: {
      title: t("title"),
      description: "Lowongan kerja hiburan malam terbaru di Indonesia. Liguns Entertainment membuka rekrutmen Guest Relation Officer, Terapis Spa, Hostess, dan posisi hiburan malam.",
      url: `${siteUrl}/${locale}/lowongan`,
      type: "website",
    },
  };
}

export default function LowonganLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
