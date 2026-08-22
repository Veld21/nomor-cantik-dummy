import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NumberCard from "@/components/NumberCard";
import PhoneDigits from "@/components/PhoneDigits";
import { providers, phoneNumbers, activeCountForProvider, formatRupiah } from "@/lib/data";

export default function HomePage() {
  const featured = phoneNumbers.filter((n) => n.status === "available").slice(0, 6);
  const heroNumber = phoneNumbers[0];

  return (
    <main className="min-h-screen bg-mist">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-sapphire-gradient">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gold-300">
              Terpercaya sejak 2017 &middot; 500+ transaksi
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-white md:text-5xl">
              Temukan Nomor Cantik Impianmu
            </h1>
            <p className="mt-4 max-w-md text-sapphire-100">
              Ratusan pilihan nomor cantik dari Telkomsel, Indosat, XL, Axis, dan Tri.
              Cocok untuk personal branding, bisnis, maupun hadiah spesial.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/numbers"
                className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink shadow-card transition hover:bg-gold-300"
              >
                Lihat Nomor Cantik
              </Link>
              <a
                href="https://wa.me/6281284848246"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Chat Admin
              </a>
            </div>
          </div>

          {/* Signature: ticket-style SIM card visual */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="perforated relative rounded-2xl bg-surface p-6 shadow-card-hover">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-bold uppercase tracking-widest text-sapphire-500">
                  Nomor Unggulan
                </span>
                <span className="flex h-6 w-9 items-center justify-center rounded bg-gold-300/60 text-[10px] font-bold text-gold-600">
                  SIM
                </span>
              </div>
              <div className="my-6 border-t border-dashed border-slate-200" />
              <PhoneDigits number={heroNumber.number} size="lg" />
              <p className="mt-3 text-sm text-slate-500">Telkomsel &middot; Seri Kembar</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="font-display text-xl font-bold text-ink">
                  {formatRupiah(heroNumber.price)}
                </span>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                  Tersedia
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROVIDERS */}
      <section id="providers" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-2xl font-bold text-ink">Provider yang Tersedia</h2>
        <p className="mt-2 text-slate-500">Pilih nomor cantik dari provider kepercayaanmu.</p>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          {providers.map((p) => (
            <Link
              key={p.id}
              href={`/numbers?provider=${p.id}`}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-surface p-6 text-center shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sapphire-gradient font-display text-lg font-bold text-white">
                {p.logoInitial}
              </span>
              <span className="font-display text-sm font-semibold text-ink">{p.name}</span>
              <span className="text-xs text-slate-400">{activeCountForProvider(p.id)} nomor tersedia</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED NUMBERS */}
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">Nomor Unggulan</h2>
              <p className="mt-2 text-slate-500">Pilihan terbaik minggu ini, stok terbatas.</p>
            </div>
            <Link href="/numbers" className="hidden text-sm font-semibold text-sapphire-600 md:block">
              Lihat semua &rarr;
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((n) => (
              <NumberCard key={n.id} item={n} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/numbers" className="text-sm font-semibold text-sapphire-600">
              Lihat semua nomor &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CARA PEMBELIAN */}
      <section id="cara-beli" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-2xl font-bold text-ink">Cara Pembelian</h2>
        <p className="mt-2 text-slate-500">Tiga langkah sederhana, tanpa ribet.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { step: "Pilih Nomor", desc: "Jelajahi katalog dan pilih nomor cantik yang paling cocok untukmu." },
            { step: "Hubungi via WhatsApp", desc: "Klik tombol pesan, konfirmasi ketersediaan langsung dengan admin kami." },
            { step: "Transaksi Aman", desc: "Selesaikan pembayaran dan nomor siap diaktifkan atas namamu." },
          ].map((s, i) => (
            <div key={s.step} className="rounded-2xl border border-slate-200 bg-surface p-6 shadow-card">
              <span className="font-display text-3xl font-extrabold text-gold-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-ink">{s.step}</h3>
              <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="rounded-2xl bg-sapphire-gradient px-8 py-12 text-center shadow-card-hover">
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Siap Memiliki Nomor Cantik Sendiri?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sapphire-100">
            Tim kami siap membantu menemukan nomor yang paling sesuai dengan kebutuhanmu.
          </p>
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold-300"
          >
            Chat Sekarang di WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
