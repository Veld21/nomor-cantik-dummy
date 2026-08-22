import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-mist px-5 text-center">
      <span className="font-display text-6xl font-extrabold text-sapphire-500">404</span>
      <h1 className="mt-4 font-display text-xl font-bold text-ink">Halaman tidak ditemukan</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Nomor atau halaman yang kamu cari tidak tersedia. Coba kembali ke katalog nomor cantik.
      </p>
      <Link
        href="/numbers"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-sapphire-600 px-6 py-3 text-sm font-semibold text-white hover:bg-sapphire-700"
      >
        Lihat Katalog
      </Link>
    </main>
  );
}
