"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "admin123";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      localStorage.setItem("nc_admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Username atau password salah. Gunakan kredensial demo di bawah.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-sapphire-gradient px-5">
      <div className="w-full max-w-sm rounded-2xl bg-surface p-8 shadow-card-hover">
        <div className="text-center">
          <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-sapphire-gradient font-display text-sm font-bold text-white">
            NC
          </span>
          <h1 className="mt-4 font-display text-xl font-bold text-ink">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-500">Masuk untuk mengelola nomor cantik.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs font-medium text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-sapphire-600 px-4 py-2.5 text-sm font-semibold text-white shadow-card transition hover:bg-sapphire-700"
          >
            Masuk
          </button>
        </form>

        <div className="mt-5 rounded-lg bg-mist p-3 text-center text-xs text-slate-500">
          Demo: <span className="font-mono font-semibold text-ink">admin</span> /{" "}
          <span className="font-mono font-semibold text-ink">admin123</span>
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-slate-400 hover:text-sapphire-600">
            &larr; Kembali ke website
          </Link>
        </div>
      </div>
    </main>
  );
}
