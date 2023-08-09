import { create } from "zustand";
import { persist } from "zustand/middleware";

type DarkModeState = {
  isDarkMode: boolean;
};

type DarkModeActions = {
  setIsDarkMode: (isDarkMode: boolean) => void;
};

type DarkModeSlice = DarkModeState & DarkModeActions;

export const useDarkModeStore = create<DarkModeSlice>()(
  persist(
    (set) => ({
      isDarkMode: true,
      setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
    }),
    { name: "dark-mode" }
  )
);
