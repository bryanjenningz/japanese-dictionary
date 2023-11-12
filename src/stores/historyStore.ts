import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type WordEntry } from "~/dictionary/search";
import { equals } from "~/utils/equals";

export type WordLookup = {
  time: number;
  searchText: string;
  resultIndex: number;
  wordEntry: WordEntry;
};

export type WordSearch = {
  time: number;
  searchText: string;
};

export type HistoryState = {
  dictionaryLookups: WordLookup[];
  clipReaderLookups: WordLookup[];
  searches: WordSearch[];

  addDictionaryLookup: (lookup: WordLookup) => void;
  removeDictionaryLookup: (lookup: WordLookup) => void;
  clearDictionaryHistory: () => void;

  addClipReaderLookup: (lookup: WordLookup) => void;
  removeClipReaderLookup: (lookup: WordLookup) => void;
  clearClipReaderHistory: () => void;

  addSearch: (search: WordSearch) => void;
  removeSearch: (search: WordSearch) => void;
  clearSearchHistory: () => void;
};

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      dictionaryLookups: [],
      clipReaderLookups: [],
      searches: [],

      addDictionaryLookup: (lookup: WordLookup) =>
        set({
          dictionaryLookups: [
            lookup,
            ...get().dictionaryLookups.filter(
              (x) => x.wordEntry.word !== lookup.wordEntry.word,
            ),
          ],
        }),
      removeDictionaryLookup: (lookup: WordLookup) =>
        set({
          dictionaryLookups: get().dictionaryLookups.filter(
            (x) => !equals(x, lookup),
          ),
        }),
      clearDictionaryHistory: () => set({ dictionaryLookups: [] }),

      addClipReaderLookup: (lookup: WordLookup) =>
        set({ clipReaderLookups: [lookup, ...get().clipReaderLookups] }),
      removeClipReaderLookup: (lookup: WordLookup) =>
        set({
          clipReaderLookups: get().clipReaderLookups.filter(
            (x) => !equals(x, lookup),
          ),
        }),
      clearClipReaderHistory: () => set({ clipReaderLookups: [] }),

      addSearch: (search: WordSearch) =>
        set({
          searches: [
            search,
            ...get().searches.filter((x) => x.searchText !== search.searchText),
          ],
        }),
      removeSearch: (search: WordSearch) =>
        set({ searches: get().searches.filter((x) => !equals(x, search)) }),
      clearSearchHistory: () => set({ searches: [] }),
    }),
    { name: "history" },
  ),
);
