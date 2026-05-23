import { AuthCard } from "@/components/auth-card";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="info-panel">
        <p className="eyebrow">TradePilot</p>
        <h1>Manage hiring in one focused workspace.</h1>
        <p>
          Start with secure authentication, then expand into jobs, applicants,
          and team workflows as your product grows.
        </p>
      </section>
      <AuthCard />
    </main>
  );
}
