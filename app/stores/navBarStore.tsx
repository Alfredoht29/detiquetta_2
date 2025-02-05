'use client';
import { create } from 'zustand';
import React, { ReactNode } from 'react';

interface NavbarStore {
  showNavbar: boolean;
  setShowNavbar: (show: boolean) => void;
}

const useNavbarStore = create<NavbarStore>((set) => ({
  showNavbar: true,
  setShowNavbar: (show) => set({ showNavbar: show }),
}));

interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export const useNavbar = useNavbarStore;
