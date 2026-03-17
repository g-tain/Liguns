import { createClient } from "@/utils/supabase/server";
import { 
  Plus, Search, SlidersHorizontal, 
  Briefcase, ShieldCheck, Sparkles 
} from "lucide-react";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { JobTable } from "@/components/admin/JobTable";
import Link from "next/link";

/**
 * src/app/[locale]/admin/jobs/page.tsx
 * 
 * Job Management Administrative Portal.
 * Features:
 * - Direct CRUD operations for recruitment listings.
 * - Integration with Supabase 'jobs' table.
 * - Shared security via AdminGuard (root admin layout).
 */

export default async function AdminJobsPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const supabase = createClient();

  // Fetch initial jobs data
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Fetch jobs error:", error);
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <Link href={`/${locale}/admin/dashboard`} className="text-[10px] font-black text-white/40 hover:text-gold uppercase tracking-[0.3em] transition-colors">
                  Dashboard
               </Link>
               <span className="text-white/20">/</span>
               <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">Kelola Lowongan</span>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center border border-gold/20 shadow-gold-glow-sm">
                  <Briefcase className="w-7 h-7 text-gold" />
               </div>
               <h1 className={cn(fontJoti.className, "text-5xl text-gold-gradient")}>
                  Manage Jobs
               </h1>
            </div>
            <p className="text-neutral-500 font-jost text-sm md:text-base max-w-xl">
              Pusat kendali konten lowongan kerja. Tambah venue baru, edit kualifikasi, atau nonaktifkan lowongan yang sudah terisi.
            </p>
          </div>

          {/* Quick Stats Block */}
          <div className="flex items-center gap-8 bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 backdrop-blur-md">
             <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-black">Total Lowongan</span>
                <span className="text-2xl font-black text-white">{jobs?.length || 0}</span>
             </div>
             <div className="w-px h-10 bg-white/10" />
             <div className="flex flex-col">
                <span className="text-[9px] text-white/40 uppercase tracking-widest font-black">Status Aktif</span>
                <span className="text-2xl font-black text-green-400">{jobs?.filter(j => j.status === 'active').length || 0}</span>
             </div>
          </div>
        </div>

        {/* Action Center - The Table Component */}
        <JobTable initialJobs={jobs || []} />

      </div>
    </div>
  );
}
