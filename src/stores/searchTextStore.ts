import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SearchTextState = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

export const DEFAULT_SEARCH_TEXT = "ro-maji";

export const useSearchTextStore = create<SearchTextState>()(
  persist(
    (set) => ({
      searchText: DEFAULT_SEARCH_TEXT,
      setSearchText: (searchText: string) => set({ searchText }),
    }),
    { name: "search-text" },
  ),
);
