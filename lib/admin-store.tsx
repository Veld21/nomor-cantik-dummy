"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  PhoneNumber,
  Vendor,
  Provider,
  phoneNumbers as initialNumbers,
  vendors as initialVendors,
  providers as initialProviders,
  NumberCategory,
  NumberStatus,
} from "./data";

const MAX_ACTIVE_PER_PROVIDER_PER_VENDOR = 3;

export interface NewNumberInput {
  number: string;
  providerId: string;
  vendorId: string;
  price: number;
  category: NumberCategory;
  status: NumberStatus;
  description: string;
}

interface AdminStoreValue {
  numbers: PhoneNumber[];
  vendors: Vendor[];
  providers: Provider[];
  addNumber: (input: NewNumberInput) => { ok: boolean; error?: string };
  updateNumber: (id: string, input: NewNumberInput) => { ok: boolean; error?: string };
  deleteNumber: (id: string) => void;
  setNumberStatus: (id: string, status: NumberStatus) => void;
  countActiveForVendorProvider: (vendorId: string, providerId: string, excludeId?: string) => number;
}

const AdminStoreContext = createContext<AdminStoreValue | null>(null);

export function AdminDataProvider({ children }: { children: React.ReactNode }) {
  const [numbers, setNumbers] = useState<PhoneNumber[]>(initialNumbers);
  const [vendors] = useState<Vendor[]>(initialVendors);
  const [providers] = useState<Provider[]>(initialProviders);

  function countActiveForVendorProvider(vendorId: string, providerId: string, excludeId?: string) {
    return numbers.filter(
      (n) =>
        n.vendorId === vendorId &&
        n.providerId === providerId &&
        n.status === "available" &&
        n.id !== excludeId
    ).length;
  }

  function addNumber(input: NewNumberInput) {
    if (input.status === "available") {
      const activeCount = countActiveForVendorProvider(input.vendorId, input.providerId);
      if (activeCount >= MAX_ACTIVE_PER_PROVIDER_PER_VENDOR) {
        return {
          ok: false,
          error: `Vendor ini sudah memiliki ${MAX_ACTIVE_PER_PROVIDER_PER_VENDOR} nomor aktif untuk provider tersebut.`,
        };
      }
    }
    const id = `num-${Date.now()}`;
    setNumbers((prev) => [{ id, ...input }, ...prev]);
    return { ok: true };
  }

  function updateNumber(id: string, input: NewNumberInput) {
    if (input.status === "available") {
      const activeCount = countActiveForVendorProvider(input.vendorId, input.providerId, id);
      if (activeCount >= MAX_ACTIVE_PER_PROVIDER_PER_VENDOR) {
        return {
          ok: false,
          error: `Vendor ini sudah memiliki ${MAX_ACTIVE_PER_PROVIDER_PER_VENDOR} nomor aktif untuk provider tersebut.`,
        };
      }
    }
    setNumbers((prev) => prev.map((n) => (n.id === id ? { id, ...input } : n)));
    return { ok: true };
  }

  function deleteNumber(id: string) {
    setNumbers((prev) => prev.filter((n) => n.id !== id));
  }

  function setNumberStatus(id: string, status: NumberStatus) {
    setNumbers((prev) => prev.map((n) => (n.id === id ? { ...n, status } : n)));
  }

  const value = useMemo(
    () => ({
      numbers,
      vendors,
      providers,
      addNumber,
      updateNumber,
      deleteNumber,
      setNumberStatus,
      countActiveForVendorProvider,
    }),
    [numbers, vendors, providers]
  );

  return <AdminStoreContext.Provider value={value}>{children}</AdminStoreContext.Provider>;
}

export function useAdminStore() {
  const ctx = useContext(AdminStoreContext);
  if (!ctx) throw new Error("useAdminStore must be used within AdminDataProvider");
  return ctx;
}
