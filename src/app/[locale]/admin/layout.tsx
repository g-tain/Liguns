import { AdminGuard } from "@/components/admin/AdminGuard";

/**
 * src/app/[locale]/admin/layout.tsx
 * 
 * Root layout for the Admin section.
 * Wraps all admin pages with the AdminGuard (password protection).
 */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminGuard>{children}</AdminGuard>;
}
