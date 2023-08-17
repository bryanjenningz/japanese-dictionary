import { useRouter } from "next/router";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";
import { Pronunciation } from "~/components/Pronunciation";
import { ArrowBackIcon } from "~/icons/ArrowBackIcon";
import { AddIcon } from "~/icons/AddIcon";
import { useFlashcardStore } from "~/stores/flashcardStore";
import { AddBoxIcon } from "~/icons/AddBoxIcon";
import { ChevronRightIcon } from "~/icons/ChevronRightIcon";
import { type WordEntry } from "~/dictionary/search";
import { createWordLink } from "~/utils/createWordLink";
import { type WordLookup } from "~/stores/historyStore";

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
  const wordEntryIsFlashcard = useFlashcardStore((x) =>
    x.isWordEntryAFlashcard(wordLookup.wordEntry)
  );

  const hasPreviousResult = wordLookup.resultIndex > 0;
  const hasNextResult = wordLookup.resultIndex < wordEntries.length - 1;

  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode);

  return (
    <header className="w-full">
      <div
        className={classNames(
          "flex w-full flex-col items-center text-white",
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

            {wordEntryIsFlashcard ? (
              <button
                className="h-full px-4"
                onClick={() => deleteFlashcard(wordLookup)}
              >
                <span className="sr-only">Remove flashcard</span>
                <AddBoxIcon />
              </button>
            ) : (
              <button
                className="h-full px-4"
                onClick={() => saveFlashcard(wordLookup)}
              >
                <span className="sr-only">Add flashcard</span>
                <AddIcon />
              </button>
            )}

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
          "flex w-full flex-col items-center",
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
        </div>
      </div>
    </header>
  );
};
