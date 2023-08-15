import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type WordEntry } from "~/dictionary/search";
import { equals } from "~/utils/equals";

type FlashcardTestMaxCards = (typeof flashcardTestMaxCardsOptions)[number];

export const flashcardTestMaxCardsOptions = [
  5,
  10,
  15,
  20,
  30,
  40,
  50,
  75,
  100,
  200,
  "All",
  "Endless",
] as const;

const DEFAULT_FLASHCARD_TEST_MAX_CARDS: FlashcardTestMaxCards = 5;

export type FlashcardState = {
  flashcards: Flashcard[];
  saveFlashcard: (flashcard: Flashcard) => void;
  deleteFlashcard: (flashcard: Flashcard) => void;
  isWordEntryAFlashcard: (wordEntry: WordEntry) => boolean;

  flashcardTestMaxCards: FlashcardTestMaxCards;
  setFlashcardTestMaxCards: (
    flashcardTestMaxCards: FlashcardTestMaxCards
  ) => void;
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
      isWordEntryAFlashcard: (wordEntry: WordEntry) =>
        !!get().flashcards.find((flashcard) =>
          equals(flashcard.wordEntry, wordEntry)
        ),

      flashcardTestMaxCards: DEFAULT_FLASHCARD_TEST_MAX_CARDS,
      setFlashcardTestMaxCards: (
        flashcardTestMaxCards: FlashcardTestMaxCards
      ) => set({ flashcardTestMaxCards }),
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
