import { useState } from "react";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { HistoryHeader, useHistoryHeaderTab } from "~/components/HistoryHeader";
import { type HistoryState, useHistory } from "~/stores/historyStore";
import {
  type SavedWordsState,
  useSavedWordsStore,
} from "~/stores/savedWordsStore";
import { Pronunciation } from "~/components/Pronunciation";

export default function History() {
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );
  const dictionaryLookups = useStore<
    HistoryState,
    HistoryState["dictionaryLookups"]
  >(useHistory, (x) => x.dictionaryLookups);
  const searches = useStore<HistoryState, HistoryState["searches"]>(
    useHistory,
    (x) => x.searches
  );
  const clipReaderLookups = useStore<
    HistoryState,
    HistoryState["clipReaderLookups"]
  >(useHistory, (x) => x.clipReaderLookups);
  const ocrLookups = useStore<HistoryState, HistoryState["ocrLookups"]>(
    useHistory,
    (x) => x.ocrLookups
  );
  const savedWords = useStore<SavedWordsState, SavedWordsState["savedWords"]>(
    useSavedWordsStore,
    (x) => x.savedWords
  );
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [historyHeaderTab, setHistoryHeaderTab] = useHistoryHeaderTab();

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <HistoryHeader
        openSideMenu={() => setIsSideMenuOpen(true)}
        historyHeaderTab={historyHeaderTab}
        setHistoryHeaderTab={setHistoryHeaderTab}
      />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
      />

      <div className="flex w-full max-w-2xl flex-col">
        {((): JSX.Element => {
          switch (historyHeaderTab) {
            case "Dict":
              return (
                <div>
                  {dictionaryLookups?.map((lookup) => {
                    const key = `${lookup.wordEntry.word}-${lookup.time}`;
                    return (
                      <div key={key}>
                        <div>{lookup.time}</div>
                        <div>{lookup.wordEntry.word}</div>
                      </div>
                    );
                  })}
                </div>
              );

            case "Reader":
              return (
                <div>
                  {clipReaderLookups?.map((lookup) => {
                    const key = `${lookup.wordEntry.word}-${lookup.time}`;
                    return (
                      <div key={key}>
                        <div>{lookup.time}</div>
                        <div>{lookup.wordEntry.word}</div>
                      </div>
                    );
                  })}
                </div>
              );

            case "OCR":
              return (
                <div>
                  {ocrLookups?.map((lookup) => {
                    const key = `${lookup.wordEntry.word}-${lookup.time}`;
                    return (
                      <div key={key}>
                        <div>{lookup.time}</div>
                        <div>{lookup.wordEntry.word}</div>
                      </div>
                    );
                  })}
                </div>
              );

            case "Search":
              return (
                <div>
                  {searches?.map((search) => {
                    const key = `${search.searchText}-${search.time}`;
                    return (
                      <div key={key}>
                        <time
                          className={classNames(
                            "block p-1 font-semibold text-white",
                            isDarkMode ? "bg-slate-700" : "bg-slate-500"
                          )}
                        >
                          {formatTime(search.time)}
                        </time>
                        <div className="p-2 text-lg">{search.searchText}</div>
                      </div>
                    );
                  })}
                </div>
              );

            case "Cards":
              return (
                <div>
                  {savedWords?.map((wordEntry) => {
                    const { word, pronunciation, pitchAccents, definitions } =
                      wordEntry;
                    const key = `${word}-${pronunciation}`;
                    return (
                      <div
                        key={key}
                        className={classNames(
                          "border-b p-4",
                          isDarkMode ? "border-slate-500" : "border-slate-300"
                        )}
                      >
                        <div className="flex gap-3">
                          <div>{word}</div>
                          <Pronunciation
                            word={word}
                            pronunciation={pronunciation}
                            pitchAccents={pitchAccents}
                          />
                        </div>
                        <p
                          className={classNames(
                            isDarkMode ? "text-slate-300" : "text-slate-600"
                          )}
                        >
                          {definitions.join(", ")}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
          }
        })()}
      </div>
    </main>
  );
}

const formatTime = (time: number): string => {
  const date = new Date(time);
  return (
    date.toLocaleDateString() +
    " " +
    date.toLocaleTimeString(undefined, {
      timeStyle: "short",
      hourCycle: "h12",
    })
  );
};
