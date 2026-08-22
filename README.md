# Nomor Cantik — Dummy / Prototype

Prototype website marketplace nomor cantik untuk keperluan presentasi ke calon customer.
Dibangun dengan **Next.js 14 (App Router) + TypeScript + Tailwind CSS**, seluruh data adalah
dummy/mock yang disimpan di memori (React state), tanpa backend maupun Firebase.

Login admin: **admin / admin123**

## Struktur Folder

```
nomor-cantik/
├── app/
│   ├── layout.tsx              # Root layout (font, metadata)
│   ├── page.tsx                # Homepage
│   ├── globals.css
│   ├── not-found.tsx
│   ├── numbers/
│   │   ├── page.tsx             # Katalog /numbers (search, filter, sort)
│   │   └── [id]/page.tsx        # Detail nomor /numbers/[id]
│   └── admin/
│       ├── layout.tsx           # Bungkus AdminDataProvider (state global admin)
│       ├── login/page.tsx       # /admin/login (dummy auth)
│       └── (protected)/         # Route group — perlu login
│           ├── layout.tsx       # Sidebar + topbar + auth guard
│           ├── dashboard/page.tsx
│           ├── numbers/page.tsx    # CRUD nomor + ubah status
│           ├── vendors/page.tsx
│           └── providers/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── NumberCard.tsx
│   ├── PhoneDigits.tsx          # Tampilan digit nomor bergaya kartu SIM
│   ├── Badges.tsx               # Status / kategori / provider badge
│   └── NumberFormModal.tsx      # Form tambah/edit nomor (admin)
├── lib/
│   ├── data.ts                  # Tipe data + dummy data (vendor, provider, nomor)
│   └── admin-store.tsx          # React Context untuk CRUD nomor di admin
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

## Cara Menjalankan

Pastikan Node.js 18+ terpasang, lalu dari dalam folder `nomor-cantik/`:

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser.

- Website customer: `/`, `/numbers`, `/numbers/[id]`
- Admin dashboard: `/admin/login` → login dengan `admin` / `admin123`

## Catatan

- Semua data (vendor, provider, nomor) adalah dummy dan disimpan di `lib/data.ts`.
- Perubahan data di admin (tambah/edit/hapus/ubah status nomor) menggunakan React state
  melalui `AdminDataProvider`, sehingga akan tersimpan selama sesi berjalan (hilang saat
  refresh browser) — sesuai kebutuhan dummy/prototype.
- Business rule "maksimal 3 nomor aktif per provider per vendor" divalidasi saat
  menambah/mengedit nomor dengan status "Tersedia".
- Tombol "Pesan via WhatsApp" membuka `wa.me` dengan pesan otomatis berisi nomor dan harga.
  Nomor tujuan WhatsApp (`6281234567890`) adalah nomor dummy — ganti di `lib/data.ts`
  (fungsi `whatsappLink`) dan di `Navbar.tsx` / `Footer.tsx` sebelum presentasi.
- Ini adalah prototype tampilan (bukan sistem produksi): tidak ada payment gateway,
  autentikasi nyata, atau backend.
