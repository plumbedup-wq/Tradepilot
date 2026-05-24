import { Suspense } from "react";
import { AuthCard } from "@/components/auth-card";

export default function LoginPage() {
  return (
    <main className="shell">
      <Suspense fallback={null}>
        <AuthCard />
      </Suspense>
    </main>
  );
}
