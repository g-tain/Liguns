import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { 
  Users, TrendingUp, Clock, 
  Briefcase, BarChart3, ShieldCheck
} from "lucide-react";
import { fontJoti } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { AdminTable } from "@/components/admin/AdminTable";

/**
 * src/app/[locale]/admin/dashboard/page.tsx
 * 
 * Central Cyberpunk Administrative Hub.
 * Features:
 * - Real-time statistics (Total, Recent, Pending).
 * - Integrated Applicant Management via AdminTable.
 * - Protected via AdminGuard (in layout.tsx).
 */

export default async function AdminDashboardPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const supabase = createClient();

  // 1. Fetch Applicants Data
  const { data: applicants, error } = await supabase
    .from('applicants')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Dashboard data fetch error:", error);
  }

  // 2. Calculate Stats
  const total = applicants?.length || 0;
  const pending = applicants?.filter(a => a.status === 'pending').length || 0;
  
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recent = applicants?.filter(a => new Date(a.created_at) > oneWeekAgo).length || 0;

  const stats = [
    { 
      label: "Total Pendaftar", 
      value: total, 
      icon: Users, 
      color: "text-gold", 
      bg: "bg-gold/10",
      desc: "Semua pendaftar di sistem"
    },
    { 
      label: "Pendaftar Minggu Ini", 
      value: recent, 
      icon: TrendingUp, 
      color: "text-green-400", 
      bg: "bg-green-400/10",
      desc: "Aktivitas 7 hari terakhir"
    },
    { 
      label: "Status Pending", 
      value: pending, 
      icon: Clock, 
      color: "text-amber-400", 
      bg: "bg-amber-400/10",
      desc: "Menunggu verifikasi admin"
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-gold/5 border border-gold/10 w-fit">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span className="text-[10px] font-black text-gold uppercase tracking-[0.3em]">Executive Control Center</span>
            </div>
            <h1 className={cn(fontJoti.className, "text-5xl md:text-6xl text-gold-gradient")}>
              LIGUNS ADMIN
            </h1>
            <p className="text-neutral-500 font-jost text-sm md:text-base max-w-xl">
              Selamat datang di pusat manajemen Liguns Entertainment. Pantau aktivitas recruitment dan kelola operasional agency dari satu dashboard.
            </p>
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-6 hidden lg:flex">
             <BarChart3 className="w-10 h-10 text-white/10" />
             <div className="text-right">
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">System Status</p>
                <p className="text-sm font-bold text-green-400 uppercase tracking-tighter">Operational Online</p>
             </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="glass-card p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-gold/20 transition-all">
              <div className="space-y-4">
                <p className="text-[11px] font-black text-white/40 uppercase tracking-widest">{stat.label}</p>
                <div className="space-y-1">
                  <p className={cn("text-4xl font-black tracking-tighter", stat.color)}>{stat.value}</p>
                  <p className="text-[10px] text-white/20 uppercase tracking-tighter font-medium">{stat.desc}</p>
                </div>
              </div>
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5", stat.bg)}>
                <stat.icon className={cn("w-8 h-8", stat.color)} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Management Section */}
        <div className="space-y-8">
           <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-gold/30" />
              <h2 className={cn(fontJoti.className, "text-2xl text-white/90 uppercase tracking-widest")}>
                Manajemen Pendaftar
              </h2>
           </div>
           
           <AdminTable initialData={applicants || []} />
        </div>

      </div>
    </div>
  );
}
