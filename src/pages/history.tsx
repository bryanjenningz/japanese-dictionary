import { useMemo, useState } from "react";
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
import { groupByTime } from "~/utils/groupByTime";
import Link from "next/link";

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
  const searchesGroupedByTime = useMemo(() => {
    const maxTimeDiffBetweenGroupValues = 1000 * 60 * 15; // 15 minutes
    if (!searches) return;
    const groups = groupByTime(
      searches,
      (x) => x.time,
      maxTimeDiffBetweenGroupValues
    );
    // Sort search history groups from most recent to least recent
    groups.reverse();
    groups.forEach((group) => group.values.reverse());
    return groups;
  }, [searches]);
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
                  {searchesGroupedByTime?.map((searchGroup) => {
                    const { values: searches, minTime, maxTime } = searchGroup;
                    return (
                      <article key={`${minTime}-${maxTime}`}>
                        <time
                          className={classNames(
                            "block p-1 font-semibold text-white",
                            isDarkMode ? "bg-slate-700" : "bg-slate-500"
                          )}
                        >
                          {maxTime - minTime < 1000 * 60
                            ? formatTime(minTime)
                            : `${formatTime(minTime)} - ${formatTime(maxTime)}`}
                        </time>
                        <ul>
                          {searches.map((search) => {
                            const { searchText, time } = search;
                            return (
                              <li key={`${searchText}-${time}`}>
                                <Link
                                  href={`/?search=${searchText}`}
                                  className="block p-2 text-lg"
                                >
                                  {searchText}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </article>
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
