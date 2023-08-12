import { useRouter } from "next/router";
import { useState } from "react";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";
import { Pronunciation } from "~/components/Pronunciation";
import { ArrowBackIcon } from "~/icons/ArrowBack";
import { AddIcon } from "~/icons/AddIcon";
import {
  type SavedWordsState,
  useSavedWordsStore,
  type SavedWord,
} from "~/stores/savedWordsStore";
import { equals } from "~/utils/equals";
import { AddBoxIcon } from "~/icons/AddBoxIcon";

type WordHeaderTab = (typeof wordHeaderTabs)[number];

const DEFAULT_WORD_HEADER_TAB: WordHeaderTab = "Dict";

const wordHeaderTabs = ["Dict", "Stroke", "Chars", "Words", "Sents"] as const;

export const WordHeader = ({ word }: { word: SavedWord }) => {
  const router = useRouter();

  const saveWord = useSavedWordsStore((x) => x.saveWord);
  const removeWord = useSavedWordsStore((x) => x.removeWord);
  const savedWords = useStore<SavedWordsState, SavedWordsState["savedWords"]>(
    useSavedWordsStore,
    (x) => x.savedWords
  );
  const isWordSaved = !!savedWords?.find((savedWord) =>
    equals(savedWord, word)
  );

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
                if (isWordSaved) {
                  removeWord(word);
                } else {
                  saveWord(word);
                }
              }}
            >
              {isWordSaved ? (
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
              <div>{word.wordEntry.word}</div>
              <Pronunciation
                word={word.wordEntry.word}
                pronunciation={word.wordEntry.pronunciation}
                pitchAccents={word.wordEntry.pitchAccents}
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
                        : "border-b-2 border-blue-700 text-blue-700"
                      : isDarkMode
                      ? "text-blue-300"
                      : "text-blue-500"
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
