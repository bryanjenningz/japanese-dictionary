import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type WordEntry } from "~/dictionary/search";
import { equals } from "~/utils/equals";

export type SavedWordsState = {
  savedWords: SavedWord[];
  saveWord: (word: SavedWord) => void;
  removeWord: (word: SavedWord) => void;
};

export type SavedWord = {
  wordEntry: WordEntry;
  searchText: string;
  resultIndex: number;
};

export const useSavedWordsStore = create<SavedWordsState>()(
  persist(
    (set, get) => ({
      savedWords: [],
      saveWord: (word) =>
        set({
          savedWords: [word, ...removeWord(get().savedWords, word)],
        }),
      removeWord: (word) =>
        set({ savedWords: removeWord(get().savedWords, word) }),
    }),
    { name: "saved-words" }
  )
);

const removeWord = (
  savedWords: SavedWord[],
  removed: SavedWord
): SavedWord[] => {
  return savedWords.filter((w) => !equals(w, removed));
};
