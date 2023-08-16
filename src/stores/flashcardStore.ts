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

export type Flashcard = {
  wordEntry: WordEntry;
  searchText: string;
  resultIndex: number;
};

type FlashcardTest = {
  flashcards: FlashcardTestResult[];
  index: number;
};

type FlashcardTestResult = {
  flashcard: Flashcard;
  status: FlashcardTestResultStatus;
};

type FlashcardTestResultStatus = "Unseen" | "Seen" | "Pass" | "Fail";

export type FlashcardState = {
  flashcards: Flashcard[];
  saveFlashcard: (flashcard: Flashcard) => void;
  deleteFlashcard: (flashcard: Flashcard) => void;
  isWordEntryAFlashcard: (wordEntry: WordEntry) => boolean;

  flashcardTestMaxCards: FlashcardTestMaxCards;
  setFlashcardTestMaxCards: (
    flashcardTestMaxCards: FlashcardTestMaxCards
  ) => void;
  flashcardTest: FlashcardTest | null;
  startNewFlashcardTest: () => void;
  setCurrentFlashcardStatus: (status: FlashcardTestResultStatus) => void;
  deleteCurrentFlashcardTest: () => void;
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
      flashcardTest: null,
      startNewFlashcardTest: () =>
        set({
          flashcardTest: {
            flashcards: shuffle(get().flashcards.slice()).map((flashcard) => ({
              flashcard,
              status: "Unseen",
            })),
            index: 0,
          },
        }),
      setCurrentFlashcardStatus: (status: FlashcardTestResultStatus) => {
        const flashcardTest = get().flashcardTest;
        if (!flashcardTest) return;

        set({
          flashcardTest: {
            ...flashcardTest,
            flashcards: flashcardTest.flashcards.map((flashcard, i) => {
              if (flashcardTest.index !== i) return flashcard;
              return { ...flashcard, status };
            }),
          },
        });
      },
      deleteCurrentFlashcardTest: () => set({ flashcardTest: null }),
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

const shuffle = <T>(values: T[]): T[] => {
  for (let i = 0; i < values.length - 1; i++) {
    const j = i + Math.floor(Math.random() * (values.length - i));
    [values[i], values[j]] = [values[j] as T, values[i] as T];
  }
  return values;
};
