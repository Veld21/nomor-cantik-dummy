"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { whatsappGenericLink } from "@/lib/data";

const links = [
  { href: "/", label: "Home" },
  { href: "/numbers", label: "Nomor Cantik" },
  { href: "/#providers", label: "Provider" },
  { href: "/#cara-beli", label: "Cara Pembelian" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const waLink = whatsappGenericLink();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-surface/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sapphire-gradient font-display text-sm font-bold text-white">
            NC
          </span>
          <span className="font-display text-lg font-bold text-ink">
            Nomor<span className="text-gold-500">Cantik</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-sapphire-600 ${
                pathname === l.href ? "text-sapphire-600" : "text-slate-600"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={waLink === "#"}
          className="hidden items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-card transition hover:bg-emerald-600 md:inline-flex"
        >
          Chat WhatsApp
        </a>

        <button
          aria-label="Buka menu"
          className="rounded-md p-2 text-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-surface px-5 pb-4 md:hidden">
          <div className="flex flex-col gap-3 pt-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-slate-700"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
