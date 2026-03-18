import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/organisms/Navbar";
import { Button } from "@/components/atoms/Button";
import { signOut } from "@/app/[locale]/auth/actions";

/**
 * src/app/[locale]/dashboard/page.tsx
 * 
 * Protected Dashboard Page.
 * Only accessible to authenticated users.
 */
interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Middleware should handle this, but as a double-check:
  if (!user) {
    redirect(`/${locale}/login`);
  }

  const t = await getTranslations("auth");

  return (
    <main className="min-h-screen bg-ink flex flex-col">
      <Navbar />
      
      <div className="section-container pt-32 pb-16 flex-1 flex flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-playfair font-black text-white tracking-tight-display">
            Dashboard
          </h1>
          <p className="text-white/40 font-jost">
            Selamat datang, <span className="text-gold-light">{user.email}</span>
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dashboard Stats / Cards Placeholder */}
          <div className="glass-card p-6 flex flex-col gap-4">
            <h3 className="text-xl font-playfair font-bold text-white">Status Akun</h3>
            <p className="text-sm text-white/60">Sesi aktif hingga 24 jam ke depan.</p>
          </div>
          
          <div className="glass-card p-6 flex flex-col gap-4">
            <h3 className="text-xl font-playfair font-bold text-white">Aktivitas</h3>
            <p className="text-sm text-white/60">Belum ada aktivitas komunitas terbaru.</p>
          </div>

          <div className="glass-card p-6 flex flex-col gap-4">
            <h3 className="text-xl font-playfair font-bold text-white">Profil</h3>
            <form action={async () => {
              "use server";
              await signOut(locale);
            }}>
              <Button variant="outline" size="sm" className="w-full">
                {t("logout")}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
