"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AuthCard() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlMessage = searchParams.get("message");
    if (urlMessage) {
      setMessage(urlMessage);
    }
  }, [searchParams]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const supabase = createClient();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Signup successful. Check your email and click the confirmation link.");
      }
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      router.replace("/dashboard");
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <section className="card">
      <div className="tabs">
        <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")} type="button">Login</button>
        <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")} type="button">Sign up</button>
      </div>
      <h1>{mode === "login" ? "Welcome back" : "Create account"}</h1>
      <form className="form" onSubmit={onSubmit}>
        {mode === "signup" && (
          <input
            placeholder="Full name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        )}
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {message && <p className="message">{message}</p>}
        <button className="form-btn" type="submit" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign up"}
        </button>
      </form>
    </section>
  );
}
