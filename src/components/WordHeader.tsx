import { useRouter } from "next/router";
import { useState } from "react";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";
import { Pronunciation } from "~/components/Pronunciation";
import { ArrowBackIcon } from "~/icons/ArrowBack";
import { AddIcon } from "~/icons/AddIcon";
import {
  type FlashcardState,
  useFlashcardStore,
} from "~/stores/flashcardStore";
import { equals } from "~/utils/equals";
import { AddBoxIcon } from "~/icons/AddBoxIcon";
import { ChevronRightIcon } from "~/icons/ChevronRightIcon";
import { type WordEntry } from "~/dictionary/search";
import { createWordLink } from "~/utils/createWordLink";
import { type WordLookup } from "~/stores/historyStore";

type WordHeaderTab = (typeof wordHeaderTabs)[number];

const DEFAULT_WORD_HEADER_TAB: WordHeaderTab = "Dict";

const wordHeaderTabs = ["Dict", "Stroke", "Chars", "Words", "Sents"] as const;

export const WordHeader = ({
  wordLookup,
  wordEntries,
}: {
  wordLookup: WordLookup;
  wordEntries: WordEntry[];
}) => {
  const router = useRouter();

  const saveFlashcard = useFlashcardStore((x) => x.saveFlashcard);
  const deleteFlashcard = useFlashcardStore((x) => x.deleteFlashcard);
  const flashcards = useStore<FlashcardState, FlashcardState["flashcards"]>(
    useFlashcardStore,
    (x) => x.flashcards
  );
  const wordEntryIsFlashcard = !!flashcards?.find((flashcard) =>
    equals(flashcard.wordEntry, wordLookup.wordEntry)
  );

  const hasPreviousResult = wordLookup.resultIndex > 0;
  const hasNextResult = wordLookup.resultIndex < wordEntries.length - 1;

  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );

  const [wordHeaderTab, setWordHeaderTab] = useState<WordHeaderTab>(
    DEFAULT_WORD_HEADER_TAB
  );

  return (
    <header className="w-full">
      <div
        className={classNames(
          "flex w-full flex-col items-center text-white shadow",
          isDarkMode ? "bg-black" : "bg-blue-600"
        )}
      >
        <div className="w-full max-w-2xl">
          <section className="flex h-14 items-center">
            <button className="h-full px-4" onClick={() => router.back()}>
              <span className="sr-only">Go back</span>
              <ArrowBackIcon />
            </button>

            <h1 className="grow text-lg font-semibold">Pleco</h1>

            <button
              className="h-full px-4"
              onClick={() => {
                if (wordEntryIsFlashcard) {
                  deleteFlashcard(wordLookup);
                } else {
                  saveFlashcard(wordLookup);
                }
              }}
            >
              {wordEntryIsFlashcard ? (
                <>
                  <span className="sr-only">Remove flashcard</span>
                  <AddBoxIcon />
                </>
              ) : (
                <>
                  <span className="sr-only">Add flashcard</span>
                  <AddIcon />
                </>
              )}
            </button>

            <button
              className={classNames(
                "h-full px-4 text-white",
                isDarkMode
                  ? "disabled:text-slate-500"
                  : "disabled:text-blue-500"
              )}
              disabled={!hasPreviousResult}
              onClick={() => {
                void router.replace(
                  createWordLink({
                    searchText: wordLookup.searchText,
                    resultIndex: wordLookup.resultIndex - 1,
                  })
                );
              }}
            >
              <span className="sr-only">Previous result</span>
              <span className="block -rotate-90">
                <ChevronRightIcon />
              </span>
            </button>

            <button
              className={classNames(
                "h-full px-4 text-white",
                isDarkMode
                  ? "disabled:text-slate-500"
                  : "disabled:text-blue-500"
              )}
              disabled={!hasNextResult}
              onClick={() => {
                void router.replace(
                  createWordLink({
                    searchText: wordLookup.searchText,
                    resultIndex: wordLookup.resultIndex + 1,
                  })
                );
              }}
            >
              <span className="sr-only">Next result</span>
              <span className="block rotate-90">
                <ChevronRightIcon />
              </span>
            </button>
          </section>
        </div>
      </div>

      <div
        className={classNames(
          "flex w-full flex-col items-center shadow",
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        )}
      >
        <div className="w-full max-w-2xl">
          <section
            className={classNames(
              "p-4",
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            )}
          >
            <div className="flex gap-3 text-xl">
              <div>{wordLookup.wordEntry.word}</div>
              <Pronunciation
                word={wordLookup.wordEntry.word}
                pronunciation={wordLookup.wordEntry.pronunciation}
                pitchAccents={wordLookup.wordEntry.pitchAccents}
              />
            </div>
          </section>

          <section
            className={classNames(
              "flex h-10 items-center",
              isDarkMode ? "bg-black text-white" : "bg-white text-black"
            )}
          >
            {wordHeaderTabs.map((tab) => {
              return (
                <button
                  key={tab}
                  className={classNames(
                    "flex h-full grow items-center justify-center text-sm font-bold uppercase",
                    wordHeaderTab === tab
                      ? isDarkMode
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "border-b-2 border-blue-600 text-blue-600"
                      : isDarkMode
                      ? "text-blue-700"
                      : "text-blue-400"
                  )}
                  onClick={() => setWordHeaderTab(tab)}
                >
                  {tab}
                </button>
              );
            })}
          </section>
        </div>
      </div>
    </header>
  );
};
