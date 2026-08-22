"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "grid" },
  { href: "/admin/numbers", label: "Nomor", icon: "hash" },
  { href: "/admin/vendors", label: "Vendor", icon: "store" },
  { href: "/admin/providers", label: "Provider", icon: "signal" },
];

function Icon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none" as const, stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "grid":
      return <svg {...common}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>;
    case "hash":
      return <svg {...common}><line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" /><line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" /></svg>;
    case "store":
      return <svg {...common}><path d="M3 9l1-5h16l1 5" /><path d="M3 9a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0 2 2 0 004 0" /><path d="M5 9v10h14V9" /></svg>;
    case "signal":
      return <svg {...common}><line x1="4" y1="20" x2="4" y2="14" /><line x1="10" y1="20" x2="10" y2="10" /><line x1="16" y1="20" x2="16" y2="6" /><line x1="22" y1="20" x2="22" y2="3" /></svg>;
    default:
      return null;
  }
}

export default function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const isAuthed = typeof window !== "undefined" && localStorage.getItem("nc_admin_auth") === "true";
    if (!isAuthed) {
      router.replace("/admin/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("nc_admin_auth");
    router.push("/admin/login");
  }

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mist">
        <p className="text-sm text-slate-400">Memuat...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mist md:flex">
      {/* Sidebar */}
      <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-surface md:flex md:flex-col">
        <div className="flex items-center gap-2 px-5 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sapphire-gradient font-display text-sm font-bold text-white">
            NC
          </span>
          <span className="font-display text-sm font-bold text-ink">Admin Panel</span>
        </div>

        <nav className="mt-4 flex-1 space-y-1 px-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active ? "bg-sapphire-50 text-sapphire-600" : "text-slate-600 hover:bg-mist"
                }`}
              >
                <Icon name={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 hover:bg-mist hover:text-red-500"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1">
        {/* Topbar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-surface px-5 py-4 md:px-8">
          <div className="flex items-center gap-2 md:hidden">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sapphire-gradient font-display text-xs font-bold text-white">
              NC
            </span>
            <span className="font-display text-sm font-bold text-ink">Admin</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm text-slate-400">Selamat datang kembali,</p>
            <p className="font-display text-sm font-semibold text-ink">Admin NomorCantik</p>
          </div>
          <Link href="/" className="text-xs font-medium text-sapphire-600 hover:underline">
            Lihat Website &rarr;
          </Link>
        </header>

        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-surface px-3 py-2 md:hidden">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                  active ? "bg-sapphire-500 text-white" : "bg-mist text-slate-500"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="px-5 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
