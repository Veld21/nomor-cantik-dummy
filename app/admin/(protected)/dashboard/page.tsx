"use client";

import Link from "next/link";
import { useAdminStore } from "@/lib/admin-store";
import { formatRupiah, getProvider, getVendor } from "@/lib/data";
import { StatusBadge } from "@/components/Badges";

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent: "sapphire" | "emerald" | "gold" | "slate";
}) {
  const accentMap = {
    sapphire: "bg-sapphire-50 text-sapphire-600",
    emerald: "bg-emerald-100 text-emerald-600",
    gold: "bg-gold-100 text-gold-600",
    slate: "bg-slate-200 text-slate-500",
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-card">
      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${accentMap[accent]}`}>
        {label}
      </span>
      <p className="mt-3 font-display text-3xl font-extrabold text-ink">{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { numbers, vendors, providers } = useAdminStore();

  const totalNumbers = numbers.length;
  const available = numbers.filter((n) => n.status === "available").length;
  const sold = numbers.filter((n) => n.status === "sold").length;
  const totalValue = numbers.filter((n) => n.status === "available").reduce((sum, n) => sum + n.price, 0);

  const recent = [...numbers].slice(0, 6);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Ringkasan performa katalog nomor cantik.</p>
        </div>
        <Link
          href="/admin/numbers"
          className="rounded-full bg-sapphire-600 px-4 py-2 text-sm font-semibold text-white shadow-card hover:bg-sapphire-700"
        >
          + Tambah Nomor
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total Nomor" value={totalNumbers} accent="sapphire" />
        <StatCard label="Tersedia" value={available} accent="emerald" />
        <StatCard label="Terjual" value={sold} accent="slate" />
        <StatCard label="Total Vendor" value={vendors.length} accent="gold" />
        <StatCard label="Total Provider" value={providers.length} accent="sapphire" />
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-surface p-5 shadow-card">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Estimasi Nilai Stok Tersedia
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-ink">{formatRupiah(totalValue)}</p>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">Nomor Terbaru</h2>
          <Link href="/admin/numbers" className="text-sm font-semibold text-sapphire-600">
            Lihat semua &rarr;
          </Link>
        </div>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-surface shadow-card">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-mist text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-5 py-3">Nomor</th>
                <th className="px-5 py-3">Provider</th>
                <th className="px-5 py-3">Vendor</th>
                <th className="px-5 py-3">Harga</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((n) => (
                <tr key={n.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-5 py-3 font-mono font-medium text-ink">{n.number}</td>
                  <td className="px-5 py-3 text-slate-600">{getProvider(n.providerId)?.name}</td>
                  <td className="px-5 py-3 text-slate-600">{getVendor(n.vendorId)?.name}</td>
                  <td className="px-5 py-3 text-slate-600">{formatRupiah(n.price)}</td>
                  <td className="px-5 py-3"><StatusBadge status={n.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
