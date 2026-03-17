import { redirect } from "next/navigation";

/**
 * src/app/page.tsx — Root redirect
 * Redirects bare `/` to the default locale `/id`
 */
export default function RootPage() {
  redirect("/id");
}
