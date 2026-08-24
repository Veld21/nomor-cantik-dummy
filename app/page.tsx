"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhoneDigits from "@/components/PhoneDigits";
import { StatusBadge, CategoryBadge, ProviderBadge } from "@/components/Badges";
import NumberCard from "@/components/NumberCard";
import { useDataStore } from "@/lib/data-store";
import { findById, formatRupiah, whatsappLink } from "@/lib/data";

export default function NumberDetailPage() {
  const params = useParams<{ id: string }>();
  const { numbers, providers, loading } = useDataStore();

  if (loading) {
    return (
      <main className="min-h-screen bg-mist">
        <Navbar />
        <div className="mx-auto max-w-4xl px-5 py-10">
          <div className="h-96 animate-pulse rounded-2xl bg-surface" />
        </div>
        <Footer />
      </main>
    );
  }

  const item = findById(numbers, params.id);

  if (!item) {
    return (
      <main className="min-h-screen bg-mist">
        <Navbar />
        <div className="mx-auto max-w-2xl px-5 py-24 text-center">
          <span className="font-display text-5xl font-extrabold text-sapphire-500">404</span>
          <h1 className="mt-4 font-display text-xl font-bold text-ink">Nomor tidak ditemukan</h1>
          <p className="mt-2 text-sm text-slate-500">
            Nomor yang kamu cari mungkin sudah dihapus atau tautannya salah.
          </p>
          <Link
            href="/numbers"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-sapphire-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sapphire-700"
          >
            Lihat Katalog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const provider = findById(providers, item.providerId);
  const isSold = item.status === "sold";

  const related = numbers
    .filter((n) => n.providerId === item.providerId && n.id !== item.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-mist">
      <Navbar />

      <section className="mx-auto max-w-4xl px-5 py-10">
        <nav className="text-sm text-slate-500">
          <Link href="/numbers" className="hover:text-sapphire-600">Nomor Cantik</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{item.number}</span>
        </nav>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-surface shadow-card">
          <div className="bg-sapphire-gradient px-8 py-10 text-center">
            <div className="flex items-center justify-center gap-2">
              {provider && <ProviderBadge name={provider.name} color={provider.color} />}
              <StatusBadge status={item.status} />
            </div>
            <div className="mt-6 text-white">
              <PhoneDigits number={item.number} size="lg" />
            </div>
          </div>

          <div className="grid gap-8 px-8 py-8 md:grid-cols-2">
            <div>
              <h1 className="font-display text-2xl font-bold text-ink">Detail Nomor</h1>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500">Provider</dt>
                  <dd className="font-medium text-ink">{provider?.name}</dd>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500">Kategori</dt>
                  <dd><CategoryBadge category={item.category} /></dd>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <dt className="text-slate-500">Status</dt>
                  <dd><StatusBadge status={item.status} /></dd>
                </div>
              </dl>

              <h2 className="mt-6 font-display text-sm font-semibold text-ink">Informasi Singkat</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.description}</p>
            </div>

            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-mist p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Harga</p>
                <p className="mt-1 font-display text-3xl font-extrabold text-ink">
                  {formatRupiah(item.price)}
                </p>
                <p className="mt-2 text-xs text-slate-400">Harga sudah termasuk biaya administrasi kartu perdana.</p>
              </div>

              {isSold ? (
                <button
                  disabled
                  className="mt-6 w-full cursor-not-allowed rounded-full bg-slate-200 px-6 py-3 text-sm font-semibold text-slate-500"
                >
                  Sudah Terjual
                </button>
              ) : (
                
                  href={whatsappLink(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-emerald-600"
                >
                  Pesan via WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-bold text-ink">
              Nomor Lain dari {provider?.name}
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((n) => (
                <NumberCard key={n.id} item={n} />
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}const featured = numbers.filter((n) => n.status === "available").slice(0, 8);