import { create } from "zustand";

export const useUIStore = create((set) => ({
  authModalOpen: false,
  openAuthModal:  () => set({ authModalOpen: true }),
  closeAuthModal: () => set({ authModalOpen: false }),
}));