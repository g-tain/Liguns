import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AuthCard } from "@/components/molecules/AuthCard";
import { AuthForm } from "@/components/organisms/AuthForm";
import { Navbar } from "@/components/organisms/Navbar";

/**
 * src/app/[locale]/login/page.tsx
 * 
 * The Authentication Page.
 * Renders the AuthForm inside a premium AuthCard.
 */
interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  
  // Static rendering support
  setRequestLocale(locale);

  return (
    <main className="relative min-h-screen flex flex-col pt-24 md:pt-32 pb-16 bg-ink overflow-hidden">
      <Navbar />
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-gold-gradient blur-[120px] opacity-[0.03] pointer-events-none" />
      
      <div className="section-container relative z-10 flex-1 flex items-center justify-center">
        <AuthCard 
          title="Liguns" 
          subtitle="Akses komunitas eksklusif dan mulai berjejaring hari ini."
        >
          <AuthForm />
        </AuthCard>
      </div>
    </main>
  );
}
