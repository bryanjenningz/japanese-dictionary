import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type WordEntry } from "~/dictionary/search";
import { equals } from "~/utils/equals";

export type SavedWordLookupState = {
  savedWordLookups: WordLookup[];
  saveWordLookup: (wordLookup: WordLookup) => void;
  removeWordLookup: (wordLookup: WordLookup) => void;
};

export type WordLookup = {
  wordEntry: WordEntry;
  searchText: string;
  resultIndex: number;
};

export const useSavedWordLookupStore = create<SavedWordLookupState>()(
  persist(
    (set, get) => ({
      savedWordLookups: [],
      saveWordLookup: (wordLookup) =>
        set({
          savedWordLookups: [
            wordLookup,
            ...removeWordLookup(get().savedWordLookups, wordLookup),
          ],
        }),
      removeWordLookup: (word) =>
        set({
          savedWordLookups: removeWordLookup(get().savedWordLookups, word),
        }),
    }),
    { name: "saved-word-lookups" }
  )
);

const removeWordLookup = (
  savedWordLookups: WordLookup[],
  removed: WordLookup
): WordLookup[] => {
  return savedWordLookups.filter(
    (wordLookup) => !equals(wordLookup.wordEntry, removed.wordEntry)
  );
};
