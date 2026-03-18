import { AdminGuard } from "@/components/admin/AdminGuard";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

/**
 * src/app/[locale]/admin/layout.tsx
 * 
 * Root layout for the Admin section.
 * Wraps all admin pages with the AdminGuard (password protection).
 */

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  
  return (
    <AdminGuard>
      <div className="min-h-screen bg-black flex">
        <AdminSidebar locale={locale} />
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}
