import { create } from "zustand";
import { persist } from "zustand/middleware";

type DarkModeState = {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
};

export const useDarkModeStore = create<DarkModeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
    }),
    { name: "dark-mode" }
  )
);
