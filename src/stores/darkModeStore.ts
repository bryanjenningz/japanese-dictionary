import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DarkModeState = {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
};

export const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set) => ({
      isDarkMode: true,
      setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
    }),
    { name: "dark-mode" },
  ),
);
