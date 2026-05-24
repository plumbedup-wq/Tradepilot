import Link from "next/link";
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
        <div style={{display:"grid",gap:"0.5rem"}}><Link href="/settings/users" className="form-btn" style={{textAlign:"center",textDecoration:"none"}}>Manage Users</Link><LogoutButton /></div>
      </section>
    </main>
  );
}
