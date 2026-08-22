"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NumberCard from "@/components/NumberCard";
import { phoneNumbers, providers, categories } from "@/lib/data";

type SortOption = "default" | "price-asc" | "price-desc";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialProvider = searchParams.get("provider") ?? "all";

  const [search, setSearch] = useState("");
  const [providerFilter, setProviderFilter] = useState(initialProvider);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [maxPrice, setMaxPrice] = useState(30000000);
  const [sort, setSort] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    let result = phoneNumbers.filter((n) => {
      const matchesSearch = n.number.replace(/-/g, "").includes(search.replace(/-/g, ""));
      const matchesProvider = providerFilter === "all" || n.providerId === providerFilter;
      const matchesCategory = categoryFilter === "all" || n.category === categoryFilter;
      const matchesPrice = n.price <= maxPrice;
      return matchesSearch && matchesProvider && matchesCategory && matchesPrice;
    });

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);

    return result;
  }, [search, providerFilter, categoryFilter, maxPrice, sort]);

  return (
    <main className="min-h-screen bg-mist">
      <Navbar />

      <section className="border-b border-slate-200 bg-sapphire-gradient px-5 py-14">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-3xl font-bold text-white">Katalog Nomor Cantik</h1>
          <p className="mt-2 max-w-xl text-sapphire-100">
            Cari dan filter nomor cantik berdasarkan provider, kategori, dan harga.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10">
        {/* Filters */}
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-surface p-5 shadow-card md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Cari Nomor
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Contoh: 8888 atau 0812"
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Provider
            </label>
            <select
              value={providerFilter}
              onChange={(e) => setProviderFilter(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
            >
              <option value="all">Semua Provider</option>
              {providers.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Kategori
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Harga Maksimal: Rp{maxPrice.toLocaleString("id-ID")}
            </label>
            <input
              type="range"
              min={500000}
              max={30000000}
              step={500000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-sapphire-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Urutkan
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-ink outline-none focus:border-sapphire-500 focus:ring-2 focus:ring-sapphire-100"
            >
              <option value="default">Paling Relevan</option>
              <option value="price-asc">Harga Termurah</option>
              <option value="price-desc">Harga Termahal</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">{filtered.length} nomor ditemukan</p>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((n) => (
              <NumberCard key={n.id} item={n} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-surface p-12 text-center">
            <p className="font-display text-lg font-semibold text-ink">Belum ada nomor yang cocok</p>
            <p className="mt-2 text-sm text-slate-500">
              Coba ubah kata kunci pencarian atau kendurkan filter yang digunakan.
            </p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

export default function NumbersPage() {
  return (
    <Suspense fallback={null}>
      <CatalogContent />
    </Suspense>
  );
}
