import { NumberStatus } from "@/lib/data";

export function StatusBadge({ status }: { status: NumberStatus }) {
  if (status === "available") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Tersedia
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-500">
      <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
      Terjual
    </span>
  );
}

export function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-sapphire-50 px-3 py-1 text-xs font-medium text-sapphire-600">
      {category}
    </span>
  );
}

export function ProviderBadge({ name, color }: { name: string; color: string }) {
  const colorMap: Record<string, string> = {
    sapphire: "bg-sapphire-50 text-sapphire-600",
    gold: "bg-gold-100 text-gold-600",
    emerald: "bg-emerald-100 text-emerald-600",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${colorMap[color] ?? colorMap.sapphire}`}>
      {name}
    </span>
  );
}
