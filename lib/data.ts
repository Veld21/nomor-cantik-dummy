export type ProviderName = "Telkomsel" | "Indosat" | "XL" | "Axis" | "Tri";
export type NumberStatus = "available" | "sold";
export type NumberCategory =
  | "Seri Kembar"
  | "Palindrome"
  | "Angka Naik"
  | "Angka Turun"
  | "Panca (5 Digit Sama)"
  | "Tanggal Lahir"
  | "Kombinasi Premium";

export interface Provider {
  id: string;
  name: ProviderName;
  logoInitial: string;
  color: string; // tailwind class suffix for accent chip
}

export interface Vendor {
  id: string;
  name: string;
  city: string;
  joined: string; // year
  rating: number;
}

export interface PhoneNumber {
  id: string;
  number: string; // formatted with dashes
  providerId: string;
  vendorId: string;
  price: number;
  category: NumberCategory;
  status: NumberStatus;
  description: string;
}

export const providers: Provider[] = [
  { id: "prov-telkomsel", name: "Telkomsel", logoInitial: "T", color: "sapphire" },
  { id: "prov-indosat", name: "Indosat", logoInitial: "I", color: "gold" },
  { id: "prov-xl", name: "XL", logoInitial: "X", color: "emerald" },
  { id: "prov-axis", name: "Axis", logoInitial: "A", color: "sapphire" },
  { id: "prov-tri", name: "Tri", logoInitial: "3", color: "gold" },
];

export const vendors: Vendor[] = [
  { id: "vendor-a", name: "Vendor A - Prima Selular", city: "Jakarta", joined: "2018", rating: 4.9 },
  { id: "vendor-b", name: "Vendor B - Nomor Elite", city: "Surabaya", joined: "2019", rating: 4.8 },
  { id: "vendor-c", name: "Vendor B - Cantik Number Store", city: "Bandung", joined: "2020", rating: 4.7 },
  { id: "vendor-d", name: "Vendor D - Sultan SIM", city: "Medan", joined: "2021", rating: 4.9 },
  { id: "vendor-e", name: "Vendor E - Grosir Nomor VIP", city: "Semarang", joined: "2017", rating: 4.6 },
];

export const phoneNumbers: PhoneNumber[] = [
  { id: "num-01", number: "0812-8888-8888", providerId: "prov-telkomsel", vendorId: "vendor-a", price: 25000000, category: "Seri Kembar", status: "available", description: "Nomor 8 berjejer penuh, cocok untuk pengusaha yang percaya angka 8 membawa keberuntungan dan rezeki berlipat." },
  { id: "num-02", number: "0813-7777-7777", providerId: "prov-telkomsel", vendorId: "vendor-a", price: 18000000, category: "Seri Kembar", status: "available", description: "Deretan angka 7 yang jarang ditemukan, mudah diingat dan enak diucapkan saat bertransaksi bisnis." },
  { id: "num-03", number: "0857-1234-5678", providerId: "prov-indosat", vendorId: "vendor-b", price: 3500000, category: "Angka Naik", status: "available", description: "Urutan angka naik sempurna dari 1 sampai 8, favorit untuk nomor pribadi yang mudah dihafal." },
  { id: "num-04", number: "0819-1111-2222", providerId: "prov-xl", vendorId: "vendor-c", price: 4200000, category: "Seri Kembar", status: "sold", description: "Kombinasi dua seri kembar 1111 dan 2222, sudah terjual ke pelanggan korporat." },
  { id: "num-05", number: "0896-9999-9999", providerId: "prov-tri", vendorId: "vendor-e", price: 30000000, category: "Panca (5 Digit Sama)", status: "available", description: "Sembilan angka 9 berturut-turut, salah satu nomor termahal di katalog kami." },
  { id: "num-06", number: "0821-2323-2323", providerId: "prov-telkomsel", vendorId: "vendor-a", price: 2100000, category: "Palindrome", status: "available", description: "Pola berulang 2323 yang ritmis, enak diingat dan cocok untuk usaha kuliner atau toko online." },
  { id: "num-07", number: "0838-6565-6565", providerId: "prov-axis", vendorId: "vendor-d", price: 1800000, category: "Palindrome", status: "available", description: "Pola 6565 berulang, harga terjangkau untuk nomor dengan pola unik." },
  { id: "num-08", number: "0817-0102-2000", providerId: "prov-xl", vendorId: "vendor-c", price: 2750000, category: "Tanggal Lahir", status: "available", description: "Format tanggal 01-02-2000, pilihan populer untuk hadiah ulang tahun atau nomor kenangan." },
  { id: "num-09", number: "0812-0505-1995", providerId: "prov-telkomsel", vendorId: "vendor-b", price: 2500000, category: "Tanggal Lahir", status: "sold", description: "Format tanggal lahir 05-05-1995, sudah dipesan oleh pelanggan sebagai kado pernikahan." },
  { id: "num-10", number: "0851-9876-5432", providerId: "prov-indosat", vendorId: "vendor-b", price: 3200000, category: "Angka Turun", status: "available", description: "Urutan angka turun sempurna dari 9 ke 2, sangat mudah dihafal tanpa perlu dicatat." },
  { id: "num-11", number: "0877-4444-8888", providerId: "prov-xl", vendorId: "vendor-e", price: 6500000, category: "Kombinasi Premium", status: "available", description: "Kombinasi dua seri kembar 4444 dan 8888, melambangkan stabilitas dan keberuntungan." },
  { id: "num-12", number: "0895-3210-3210", providerId: "prov-tri", vendorId: "vendor-e", price: 1500000, category: "Palindrome", status: "available", description: "Pola berulang 3210 yang unik dan mudah diingat, cocok untuk nomor sehari-hari." },
  { id: "num-13", number: "0813-2222-1111", providerId: "prov-telkomsel", vendorId: "vendor-a", price: 4800000, category: "Seri Kembar", status: "sold", description: "Kombinasi seri kembar 2222 dan 1111, sudah terjual pekan lalu." },
  { id: "num-14", number: "0822-6666-7777", providerId: "prov-axis", vendorId: "vendor-d", price: 5200000, category: "Kombinasi Premium", status: "available", description: "Perpaduan dua seri kembar 6666 dan 7777, kombinasi premium yang mencolok." },
  { id: "num-15", number: "0857-8989-8989", providerId: "prov-indosat", vendorId: "vendor-c", price: 2300000, category: "Palindrome", status: "available", description: "Pola 8989 berulang, terdengar catchy dan mudah diingat rekan bisnis." },
  { id: "num-16", number: "0896-1212-1212", providerId: "prov-tri", vendorId: "vendor-e", price: 1750000, category: "Palindrome", status: "available", description: "Pola 1212 berulang, harga bersahabat dengan pola yang tetap eksklusif." },
  { id: "num-17", number: "0812-3000-3000", providerId: "prov-telkomsel", vendorId: "vendor-b", price: 3900000, category: "Palindrome", status: "available", description: "Pola bulat 3000 berulang, mudah diucapkan lewat telepon maupun pesan singkat." },
  { id: "num-18", number: "0838-5555-6666", providerId: "prov-axis", vendorId: "vendor-d", price: 4600000, category: "Kombinasi Premium", status: "sold", description: "Kombinasi seri kembar 5555 dan 6666, sudah dipesan pelanggan dari Medan." },
  { id: "num-19", number: "0817-2708-1990", providerId: "prov-xl", vendorId: "vendor-c", price: 2900000, category: "Tanggal Lahir", status: "available", description: "Format tanggal 27-08-1990, cocok dijadikan nomor utama yang bermakna personal." },
  { id: "num-20", number: "0851-0000-1234", providerId: "prov-indosat", vendorId: "vendor-b", price: 2200000, category: "Angka Naik", status: "available", description: "Diawali empat angka nol lalu ditutup urutan naik 1234, unik dan mudah dikenali." },
];

export const categories: NumberCategory[] = [
  "Seri Kembar",
  "Palindrome",
  "Angka Naik",
  "Angka Turun",
  "Panca (5 Digit Sama)",
  "Tanggal Lahir",
  "Kombinasi Premium",
];

export function getProvider(id: string): Provider | undefined {
  return providers.find((p) => p.id === id);
}

export function getVendor(id: string): Vendor | undefined {
  return vendors.find((v) => v.id === id);
}

export function getNumberById(id: string): PhoneNumber | undefined {
  return phoneNumbers.find((n) => n.id === id);
}

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function activeCountForVendor(vendorId: string): number {
  return phoneNumbers.filter((n) => n.vendorId === vendorId && n.status === "available").length;
}

export function activeCountForProvider(providerId: string): number {
  return phoneNumbers.filter((n) => n.providerId === providerId && n.status === "available").length;
}

export function whatsappLink(n: PhoneNumber): string {
  const message = `Halo, saya tertarik dengan nomor ${n.number} dengan harga ${formatRupiah(n.price)}.`;
  return `https://wa.me/6281284848246?text=${encodeURIComponent(message)}`;
}
