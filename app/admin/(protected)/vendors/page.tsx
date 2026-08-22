"use client";

import { useAdminStore } from "@/lib/admin-store";

export default function ManageVendorsPage() {
  const { vendors, numbers } = useAdminStore();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink">Kelola Vendor</h1>
      <p className="mt-1 text-sm text-slate-500">{vendors.length} vendor terdaftar dalam sistem.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {vendors.map((v) => {
          const activeCount = numbers.filter((n) => n.vendorId === v.id && n.status === "available").length;
          const totalCount = numbers.filter((n) => n.vendorId === v.id).length;
          return (
            <div key={v.id} className="rounded-2xl border border-slate-200 bg-surface p-5 shadow-card">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-display text-base font-bold text-ink">{v.name}</h2>
                  <p className="mt-1 text-xs text-slate-400">{v.city} &middot; sejak {v.joined}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-2.5 py-1 text-xs font-semibold text-gold-600">
                  ★ {v.rating}
                </span>
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
