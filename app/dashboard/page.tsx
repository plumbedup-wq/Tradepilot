import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/logout-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="shell">
      <section className="card">
        <h1>Dashboard</h1>
        <p>You are signed in as {user.email}.</p>
        <LogoutButton />
      </section>
    </main>
  );
}
