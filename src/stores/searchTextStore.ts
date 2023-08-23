import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SearchTextState = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

export const useSearchTextStore = create<SearchTextState>()(
  persist(
    (set) => ({
      searchText: "ro-maji",
      setSearchText: (searchText: string) => set({ searchText }),
    }),
    { name: "search-text" }
  )
);
