import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type WordEntry } from "~/dictionary/search";
import { equals } from "~/utils/equals";

type Lookup = {
  time: number;
  wordEntry: WordEntry;
};

type Search = {
  time: number;
  searchText: string;
};

export type HistoryState = {
  dictionaryLookups: Lookup[];
  clipReaderLookups: Lookup[];
  ocrLookups: Lookup[];
  searches: Search[];
  addDictionaryLookup: (lookup: Lookup) => void;
  removeDictionaryLookup: (lookup: Lookup) => void;
  addClipReaderLookup: (lookup: Lookup) => void;
  removeClipReaderLookup: (lookup: Lookup) => void;
  addOcrLookup: (lookup: Lookup) => void;
  removeOcrLookup: (lookup: Lookup) => void;
  addSearch: (search: Search) => void;
  removeSearch: (search: Search) => void;
  removeAllSearch: () => void;
};

export const useHistory = create<HistoryState>()(
  persist(
    (set, get) => ({
      dictionaryLookups: [],
      clipReaderLookups: [],
      ocrLookups: [],
      searches: [],
      addDictionaryLookup: (lookup: Lookup) =>
        set({ dictionaryLookups: [lookup, ...get().dictionaryLookups] }),
      removeDictionaryLookup: (lookup: Lookup) =>
        set({
          dictionaryLookups: get().dictionaryLookups.filter(
            (x) => !equals(x, lookup)
          ),
        }),
      addClipReaderLookup: (lookup: Lookup) =>
        set({ clipReaderLookups: [lookup, ...get().clipReaderLookups] }),
      removeClipReaderLookup: (lookup: Lookup) =>
        set({
          clipReaderLookups: get().clipReaderLookups.filter(
            (x) => !equals(x, lookup)
          ),
        }),
      addOcrLookup: (lookup: Lookup) =>
        set({ ocrLookups: [lookup, ...get().ocrLookups] }),
      removeOcrLookup: (lookup: Lookup) =>
        set({ ocrLookups: get().ocrLookups.filter((x) => !equals(x, lookup)) }),
      addSearch: (search: Search) =>
        set({
          searches: [
            search,
            ...get().searches.filter((x) => x.searchText !== search.searchText),
          ],
        }),
      removeSearch: (search: Search) =>
        set({ searches: get().searches.filter((x) => !equals(x, search)) }),
      removeAllSearch: () => set({ searches: [] }),
    }),
    { name: "history" }
  )
);
