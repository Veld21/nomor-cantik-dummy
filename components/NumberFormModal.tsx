"use client";

import { FormEvent, useEffect, useState } from "react";
import { categories, NumberCategory, NumberStatus, PhoneNumber, Provider, Vendor } from "@/lib/data";
import { NewNumberInput } from "@/lib/data-store";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: NewNumberInput) => Promise<{ ok: boolean; error?: string }>;
  initial?: PhoneNumber | null;
  providers: Provider[];
  vendors: Vendor[];
}

function buildEmptyForm(providers: Provider[], vendors: Vendor[]): NewNumberInput {
  return {
    number: "",
    providerId: providers[0]?.id ?? "",
    vendorId: vendors[0]?.id ?? "",
    price: 1000000,
    category: categories[0],
    status: "available",
    description: "",
  };
}

export default function NumberFormModal({ open, onClose, onSubmit, initial, providers, vendors }: Props) {
  const [form, setForm] = useState<NewNumberInput>(buildEmptyForm(providers, vendors));
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initial) {
      const { id, ...rest } = initial;
      setForm(rest);
    } else {
      setForm(buildEmptyForm(providers, vendors));
    }
    setError("");
  }, [initial, open, providers, vendors]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.number.trim()) {
      setError("Nomor tidak boleh kosong.");
      return;
    }
    setSubmitting(true);
    const result = await onSubmit(form);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error ?? "Gagal menyimpan nomor.");
      return;
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-surface p-6 shadow-card-hover">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-ink">
            {initial ? "Edit Nomor" : "Tambah Nomor Baru"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-ink" aria-label="Tutup">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Nomor</label>
            <input
              type="text"
              value={form.number}
              onChange={(e) => setForm((f) => ({ ...f, number: e.target.value }))}
              placeholder="0812-0000-0000"
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Provider</label>
              <select
                value={form.providerId}
                onChange={(e) => setForm((f) => ({ ...f, providerId: e.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Vendor</label>
              <select
                value={form.vendorId}
                onChange={(e) => setForm((f) => ({ ...f, vendorId: e.target.value }))}
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
              >
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Harga (Rp)</label>
              <input
                type="number"
                min={0}
                step={50000}
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as NumberStatus }))}
                className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
              >
                <option value="available">Tersedia</option>
                <option value="sold">Terjual</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Kategori</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as NumberCategory }))}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">Deskripsi Singkat</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-500">{error}</p>
          )}

          <p className="text-xs text-slate-400">
            Maksimal 3 nomor berstatus tersedia untuk kombinasi vendor + provider yang sama.
          </p>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-mist"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-sapphire-600 px-5 py-2 text-sm font-semibold text-white hover:bg-sapphire-700 disabled:opacity-60"
            >
              {submitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
