import { AdminDataProvider } from "@/lib/admin-store";

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminDataProvider>{children}</AdminDataProvider>;
}
