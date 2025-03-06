import { create } from 'zustand';

interface PromoStore {
  promoIds: number[];
  addPromoId: (id: number) => void;
  removePromoId: (id: number) => void;
  clearPromoIds: () => void;
}

const useSavePromoStore = create<PromoStore>((set) => ({
  promoIds: [],
  addPromoId: (id) => {
    console.log(`Adding promo ID: ${id}`); // Logs the promo ID when it's added
    set((state) => ({
      promoIds: [...state.promoIds, id],
    }));
  },
  removePromoId: (id) =>
    set((state) => ({
      promoIds: state.promoIds.filter((promoId) => promoId !== id),
    })),
  clearPromoIds: () => set({ promoIds: [] }),
}));

export default useSavePromoStore;
