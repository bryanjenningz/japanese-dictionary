import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useDarkModeStore = create()(
  persist(
    (set) => ({
      isDarkMode: true,
      setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
    }),
    { name: "dark-mode" }
  )
);
