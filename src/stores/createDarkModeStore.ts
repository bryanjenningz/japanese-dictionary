import { type BoundStateCreator } from "~/hooks/useBoundStore";

export type DarkModeSlice = {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
};

export const createDarkModeStore: BoundStateCreator<DarkModeSlice> = (set) => ({
  isDarkMode: true,
  setIsDarkMode: (isDarkMode: boolean) => set({ isDarkMode }),
});
