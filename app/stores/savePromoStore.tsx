"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PromoStore {
  promoIds: number[];
  addPromoId: (id: number) => void;
  removePromoId: (id: number) => void;
  clearPromoIds: () => void;
}

const useSavePromoStore = create<PromoStore>()(
  persist(
    (set, get) => ({
      promoIds: [],
      addPromoId: (id) => {
        const current = get().promoIds;
        if (!current.includes(id)) {
          set({ promoIds: [...current, id] });
        }
      },
      removePromoId: (id) => {
        set((state) => ({
          promoIds: state.promoIds.filter((promoId) => promoId !== id),
        }));
      },
      clearPromoIds: () => set({ promoIds: [] }),
    }),
    {
      name: "saved-promos", // Clave en sessionStorage
      storage: {
        getItem: (key) => {
          const stored = sessionStorage.getItem(key);
          return stored ? JSON.parse(stored) : null;
        },
        setItem: (key, value) => {
          sessionStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (key) => {
          sessionStorage.removeItem(key);
        },
      },
    }
  )
);

export default useSavePromoStore;
