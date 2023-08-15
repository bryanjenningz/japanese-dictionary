import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type WordEntry } from "~/dictionary/search";
import { equals } from "~/utils/equals";

export type FlashcardState = {
  flashcards: Flashcard[];
  saveFlashcard: (flashcard: Flashcard) => void;
  deleteFlashcard: (flashcard: Flashcard) => void;
};

export type Flashcard = {
  wordEntry: WordEntry;
  searchText: string;
  resultIndex: number;
};

export const useFlashcardStore = create<FlashcardState>()(
  persist(
    (set, get) => ({
      flashcards: [],
      saveFlashcard: (flashcard) =>
        set({
          flashcards: [
            flashcard,
            ...deleteFlashcard(get().flashcards, flashcard),
          ],
        }),
      deleteFlashcard: (flashcard) =>
        set({
          flashcards: deleteFlashcard(get().flashcards, flashcard),
        }),
    }),
    { name: "flashcards" }
  )
);

const deleteFlashcard = (
  flashcards: Flashcard[],
  removedFlashcard: Flashcard
): Flashcard[] => {
  return flashcards.filter(
    (flashcard) => !equals(flashcard.wordEntry, removedFlashcard.wordEntry)
  );
};
