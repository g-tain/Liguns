import React from "react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { JobDetailHeader } from "@/components/organisms/JobDetailHeader";
import { JobDetailContent } from "@/components/organisms/JobDetailContent";
import { JobDisclaimer } from "@/components/molecules/JobDisclaimer";
import { createClient } from "@/utils/supabase/server";

/**
 * src/app/[locale]/lowongan/[id]/page.tsx
 * 
 * Dynamic Job Detail Page - Supabase Integrated.
 * Fetches real-time data from the 'jobs' table.
 */

interface JobDetailPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { id } = await params;
  const supabase = createClient();
  
  const { data: job } = await supabase
    .from('jobs')
    .select('title, company_name')
    .eq('id', id)
    .single();

  return {
    title: job ? `Lowongan ${job.title} - ${job.company_name} | Liguns` : "Detail Lowongan | Liguns",
    description: "Bergabunglah dengan industri hiburan malam terbaik Indonesia melalui Liguns Entertainment.",
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const supabase = createClient();
  const { data: job, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !job) {
    // If UUID doesn't match, maybe it's a slug? 
    // For now, we use standard Supabase ID.
    notFound();
  }

  // Map database JSONB/Text to component structure
  const jobData = {
    title: job.title,
    company: job.company_name,
    address: job.location,
    sections: [
      {
        title: "Deskripsi Pekerjaan",
        content: job.description || "Hubungi admin untuk detail lebih lanjut."
      },
      {
        title: "Kualifikasi",
        content: Array.isArray(job.qualifications) ? job.qualifications : []
      },
      {
        title: "Fasilitas",
        content: Array.isArray(job.facilities) ? job.facilities : []
      }
    ]
  };

  return (
    <main className="flex-1 bg-black">
      {/* ── SEO JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": jobData.title,
            "hiringOrganization": {
              "@type": "Organization",
              "name": `${jobData.company} (Liguns Entertainment)`,
              "logo": "https://ligunsentertainment.agency/assets/img/Logo Liguns.png"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": jobData.address
              }
            }
          }),
        }}
      />

      <JobDetailHeader 
        title={jobData.title} 
        company={jobData.company} 
        address={jobData.address} 
      />
      
      <JobDetailContent 
        sections={jobData.sections} 
      />

      <JobDisclaimer />
    </main>
  );
}
