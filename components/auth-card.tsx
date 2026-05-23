"use client";

import { useState } from "react";

export function AuthCard() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <section className="card">
      <div className="tabs">
        <button className={mode === "login" ? "active" : ""} onClick={() => setMode("login")} type="button">Login</button>
        <button className={mode === "signup" ? "active" : ""} onClick={() => setMode("signup")} type="button">Sign up</button>
      </div>
      <h1>{mode === "login" ? "Welcome back" : "Create account"}</h1>
      <form className="form">
        {mode === "signup" && <input placeholder="Full name" type="text" />}
        <input placeholder="Email" type="email" />
        <input placeholder="Password" type="password" />
        <button type="submit">{mode === "login" ? "Login" : "Sign up"}</button>
      </form>
    </section>
  );
}
