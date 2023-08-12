import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type WordEntry } from "~/dictionary/search";
import { equals } from "~/utils/equals";

type Lookup = {
  time: number;
  searchText: string;
  resultIndex: number;
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
  clearDictionaryHistory: () => void;

  addClipReaderLookup: (lookup: Lookup) => void;
  removeClipReaderLookup: (lookup: Lookup) => void;
  clearClipReaderHistory: () => void;

  addOcrLookup: (lookup: Lookup) => void;
  removeOcrLookup: (lookup: Lookup) => void;
  clearOcrHistory: () => void;

  addSearch: (search: Search) => void;
  removeSearch: (search: Search) => void;
  clearSearchHistory: () => void;
};

export const useHistory = create<HistoryState>()(
  persist(
    (set, get) => ({
      dictionaryLookups: [],
      clipReaderLookups: [],
      ocrLookups: [],
      searches: [],

      addDictionaryLookup: (lookup: Lookup) =>
        set({
          dictionaryLookups: [
            lookup,
            ...get().dictionaryLookups.filter(
              (x) => x.wordEntry.word !== lookup.wordEntry.word
            ),
          ],
        }),
      removeDictionaryLookup: (lookup: Lookup) =>
        set({
          dictionaryLookups: get().dictionaryLookups.filter(
            (x) => !equals(x, lookup)
          ),
        }),
      clearDictionaryHistory: () => set({ dictionaryLookups: [] }),

      addClipReaderLookup: (lookup: Lookup) =>
        set({ clipReaderLookups: [lookup, ...get().clipReaderLookups] }),
      removeClipReaderLookup: (lookup: Lookup) =>
        set({
          clipReaderLookups: get().clipReaderLookups.filter(
            (x) => !equals(x, lookup)
          ),
        }),
      clearClipReaderHistory: () => set({ clipReaderLookups: [] }),

      addOcrLookup: (lookup: Lookup) =>
        set({ ocrLookups: [lookup, ...get().ocrLookups] }),
      removeOcrLookup: (lookup: Lookup) =>
        set({ ocrLookups: get().ocrLookups.filter((x) => !equals(x, lookup)) }),
      clearOcrHistory: () => set({ ocrLookups: [] }),

      addSearch: (search: Search) =>
        set({
          searches: [
            search,
            ...get().searches.filter((x) => x.searchText !== search.searchText),
          ],
        }),
      removeSearch: (search: Search) =>
        set({ searches: get().searches.filter((x) => !equals(x, search)) }),
      clearSearchHistory: () => set({ searches: [] }),
    }),
    { name: "history" }
  )
);
