import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDarkModeStore = create()(
  persist(
    (set) => ({
      isDarkMode: false,
      setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
    }),
    { name: "dark-mode" }
  )
);
