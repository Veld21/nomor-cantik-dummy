import Link from "next/link";
import { PhoneNumber, formatRupiah, getProvider, getVendor } from "@/lib/data";
import PhoneDigits from "./PhoneDigits";
import { StatusBadge, CategoryBadge } from "./Badges";

export default function NumberCard({ item }: { item: PhoneNumber }) {
  const provider = getProvider(item.providerId);
  const vendor = getVendor(item.vendorId);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-surface p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {provider?.name}
        </span>
        <StatusBadge status={item.status} />
      </div>

      <div className="mt-4">
        <PhoneDigits number={item.number} size="sm" />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <CategoryBadge category={item.category} />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs text-slate-400">{vendor?.name}</p>
          <p className="font-display text-lg font-bold text-ink">{formatRupiah(item.price)}</p>
        </div>
        <Link
          href={`/numbers/${item.id}`}
          className="rounded-full border border-sapphire-500 px-4 py-2 text-xs font-semibold text-sapphire-600 transition group-hover:bg-sapphire-500 group-hover:text-white"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
