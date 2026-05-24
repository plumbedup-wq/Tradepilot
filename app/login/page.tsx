import { Suspense } from "react";
import { AuthCard } from "@/components/auth-card";
import { BrandHeader } from "@/components/brand-header";

export default function LoginPage() {
  return (
    <main className="shell">
      <BrandHeader />
      <Suspense fallback={null}>
        <AuthCard />
      </Suspense>
    </main>
  );
}
