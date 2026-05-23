"use client";

import { useState } from "react";

type Mode = "login" | "signup";

export function AuthCard() {
  const [mode, setMode] = useState<Mode>("login");

  return (
    <section className="auth-card" aria-label="Authentication form">
      <div className="mode-switch" role="tablist" aria-label="Form mode">
        <button
          className={mode === "login" ? "active" : ""}
          onClick={() => setMode("login")}
          role="tab"
          aria-selected={mode === "login"}
        >
          Login
        </button>
        <button
          className={mode === "signup" ? "active" : ""}
          onClick={() => setMode("signup")}
          role="tab"
          aria-selected={mode === "signup"}
        >
          Sign up
        </button>
      </div>

      <h2>{mode === "login" ? "Welcome back" : "Create your account"}</h2>
      <p className="muted">
        {mode === "login"
          ? "Access your hiring dashboard in seconds."
          : "Get started with your first team workspace."}
      </p>

      <form className="auth-form">
        {mode === "signup" && (
          <label>
            Full name
            <input type="text" name="name" placeholder="Alex Morgan" />
          </label>
        )}

        <label>
          Work email
          <input type="email" name="email" placeholder="you@company.com" />
        </label>

        <label>
          Password
          <input type="password" name="password" placeholder="••••••••" />
        </label>

        {mode === "signup" && (
          <label>
            Company
            <input type="text" name="company" placeholder="Acme Inc." />
          </label>
        )}

        <button type="submit" className="primary-btn">
          {mode === "login" ? "Login" : "Create account"}
        </button>
      </form>
    </section>
  );
}
