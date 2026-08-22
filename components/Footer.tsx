import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-ink text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sapphire-gradient font-display text-sm font-bold text-white">
              NC
            </span>
            <span className="font-display text-lg font-bold text-white">
              Nomor<span className="text-gold-300">Cantik</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Marketplace nomor cantik terpercaya dari berbagai provider dan vendor pilihan di seluruh Indonesia.
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">Navigasi</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/numbers" className="hover:text-white">Nomor Cantik</Link></li>
            <li><Link href="/#cara-beli" className="hover:text-white">Cara Pembelian</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">Provider</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Telkomsel</li>
            <li>Indosat</li>
            <li>XL &middot; Axis &middot; Tri</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold text-white">Hubungi Kami</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>WhatsApp: 0812-8484-8246</li>
            <li>Email: halo@nomorcantik.id</li>
            <li>Jakarta, Indonesia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} NomorCantik.id — Dummy prototype untuk keperluan presentasi.
      </div>
    </footer>
  );
}
