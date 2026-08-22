"use client";

import { useMemo, useState } from "react";
import { useAdminStore, NewNumberInput } from "@/lib/admin-store";
import { getProvider, getVendor, formatRupiah, PhoneNumber } from "@/lib/data";
import { StatusBadge, CategoryBadge } from "@/components/Badges";
import NumberFormModal from "@/components/NumberFormModal";

export default function ManageNumbersPage() {
  const { numbers, addNumber, updateNumber, deleteNumber, setNumberStatus } = useAdminStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PhoneNumber | null>(null);
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<PhoneNumber | null>(null);

  const filtered = useMemo(
    () => numbers.filter((n) => n.number.replace(/-/g, "").includes(search.replace(/-/g, ""))),
    [numbers, search]
  );

  function openAddModal() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEditModal(n: PhoneNumber) {
    setEditing(n);
    setModalOpen(true);
  }

  function handleSubmit(input: NewNumberInput) {
    if (editing) return updateNumber(editing.id, input);
    return addNumber(input);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Kelola Nomor</h1>
          <p className="mt-1 text-sm text-slate-500">{numbers.length} nomor dalam katalog.</p>
        </div>
        <button
          onClick={openAddModal}
          className="rounded-full bg-sapphire-600 px-4 py-2 text-sm font-semibold text-white shadow-card hover:bg-sapphire-700"
        >
          + Tambah Nomor
        </button>
      </div>

      <div className="mt-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nomor..."
          className="w-full max-w-xs rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-surface shadow-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-mist text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3">Nomor</th>
              <th className="px-5 py-3">Provider</th>
              <th className="px-5 py-3">Vendor</th>
              <th className="px-5 py-3">Harga</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((n) => (
              <tr key={n.id} className="border-b border-slate-100 last:border-0">
                <td className="px-5 py-3 font-mono font-medium text-ink">{n.number}</td>
                <td className="px-5 py-3 text-slate-600">{getProvider(n.providerId)?.name}</td>
                <td className="px-5 py-3 text-slate-600">{getVendor(n.vendorId)?.name}</td>
                <td className="px-5 py-3 text-slate-600">{formatRupiah(n.price)}</td>
                <td className="px-5 py-3"><CategoryBadge category={n.category} /></td>
                <td className="px-5 py-3">
                  <button
                    onClick={() => setNumberStatus(n.id, n.status === "available" ? "sold" : "available")}
                    title="Klik untuk ubah status"
                  >
                    <StatusBadge status={n.status} />
                  </button>
                </td>
                <td className="px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => openEditModal(n)}
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-mist"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(n)}
                      className="rounded-full border border-red-200 px-3 py-1 text-xs font-semibold text-red-500 hover:bg-red-50"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-slate-400">
                  Tidak ada nomor yang cocok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <NumberFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initial={editing}
      />

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-card-hover">
            <h2 className="font-display text-lg font-bold text-ink">Hapus Nomor?</h2>
            <p className="mt-2 text-sm text-slate-500">
              Nomor <span className="font-mono font-semibold text-ink">{deleteTarget.number}</span> akan dihapus permanen dari katalog dummy ini.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-mist"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  deleteNumber(deleteTarget.id);
                  setDeleteTarget(null);
                }}
                className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
