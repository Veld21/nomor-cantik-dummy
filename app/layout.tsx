import type { Metadata } from "next";
import { Sora, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nomor Cantik ID — Temukan Nomor Cantik Impianmu",
  description:
    "Marketplace nomor cantik dari Telkomsel, Indosat, XL, Axis, dan Tri. Pilih dari ratusan nomor pilihan, pesan langsung via WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${sora.variable} ${inter.variable} ${plexMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
