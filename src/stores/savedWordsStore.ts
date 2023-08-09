import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type WordEntry } from "~/dictionary/search";

export type SavedWordsState = {
  savedWords: WordEntry[];
  saveWord: (word: WordEntry) => void;
  removeWord: (word: WordEntry) => void;
};

export const useSavedWordsStore = create<SavedWordsState>()(
  persist(
    (set, get) => ({
      savedWords: [] satisfies WordEntry[],
      saveWord: (word) =>
        set({
          savedWords: [...removeWord(get().savedWords, word), word],
        }),
      removeWord: (word) =>
        set({ savedWords: removeWord(get().savedWords, word) }),
    }),
    { name: "saved-words" }
  )
);

const removeWord = (
  savedWords: WordEntry[],
  removed: WordEntry
): WordEntry[] => {
  return savedWords.filter(
    (w) => w.word !== removed.word || w.pronunciation !== removed.pronunciation
  );
};
