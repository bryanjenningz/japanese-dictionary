import { useRouter } from "next/router";
import { useState } from "react";
import { type WordEntry } from "~/dictionary/search";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";
import { Pronunciation } from "~/components/Pronunciation";
import { ArrowBackIcon } from "~/icons/ArrowBack";

type WordHeaderTab = (typeof wordHeaderTabs)[number];

const DEFAULT_WORD_HEADER_TAB: WordHeaderTab = "Dict";

const wordHeaderTabs = ["Dict", "Stroke", "Chars", "Words", "Sents"] as const;

export const WordHeader = ({ wordEntry }: { wordEntry: WordEntry }) => {
  const router = useRouter();

  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );

  const [wordHeaderTab, setWordHeaderTab] = useState<WordHeaderTab>(
    DEFAULT_WORD_HEADER_TAB
  );

  return (
    <header
      className={classNames(
        "flex w-full justify-center text-white shadow",
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
        </section>

        <section className="flex h-14 items-center">
          {wordHeaderTabs.map((tab) => {
            return (
              <button
                key={tab}
                className={classNames(
                  "flex h-full grow items-center justify-center uppercase",
                  wordHeaderTab === tab && "border-b-2 border-white"
                )}
                onClick={() => setWordHeaderTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </section>

        <div className="p-4">
          <div className="flex gap-3">
            <div>{wordEntry.word}</div>
            <Pronunciation
              word={wordEntry.word}
              pronunciation={wordEntry.pronunciation}
              pitchAccents={wordEntry.pitchAccents}
            />
          </div>
          <div>
            {wordEntry.definitions.map((definition) => {
              return <p key={definition}>{definition}</p>;
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
