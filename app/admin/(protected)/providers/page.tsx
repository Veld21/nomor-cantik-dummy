"use client";

import { useAdminStore } from "@/lib/admin-store";

const colorMap: Record<string, string> = {
  sapphire: "bg-sapphire-gradient",
  gold: "bg-gradient-to-br from-gold-500 to-gold-300",
  emerald: "bg-gradient-to-br from-emerald-600 to-emerald-500",
};

export default function ManageProvidersPage() {
  const { providers, numbers } = useAdminStore();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Kelola Provider</h1>
      <p className="mt-1 text-sm text-slate-500">{providers.length} provider tersedia di katalog.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {providers.map((p) => {
          const activeCount = numbers.filter((n) => n.providerId === p.id && n.status === "available").length;
          const totalCount = numbers.filter((n) => n.providerId === p.id).length;
          return (
            <div key={p.id} className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-card">
              <div className="flex items-center gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-full font-display text-lg font-bold text-white ${colorMap[p.color] ?? colorMap.sapphire}`}>
                  {p.logoInitial}
                </span>
                <h2 className="font-display text-base font-bold text-ink">{p.name}</h2>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-mist p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Nomor Aktif</p>
                  <p className="mt-1 font-display text-xl font-bold text-emerald-600">{activeCount}</p>
                </div>
                <div className="rounded-xl bg-mist p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Total Nomor</p>
                  <p className="mt-1 font-display text-xl font-bold text-ink">{totalCount}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
