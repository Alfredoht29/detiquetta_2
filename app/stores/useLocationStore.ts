import { create } from 'zustand';
import { Location } from '../interfaces/location'

interface LocationStore {
  selectedLocation: Location | null;
  setSelectedLocation: (location: Location) => void;
  locations: Location[];
  setLocations: (locations: Location[]) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  locations: [],
  setLocations: (locations) => set({ locations }),
}));
