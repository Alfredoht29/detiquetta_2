import { create } from 'zustand';

interface LocationStore {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  selectedLocation: 'Veracruz Ver', // Default value
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));
