import { useMemo, useState } from "react";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { HistoryHeader } from "~/components/HistoryHeader";
import { type HistoryState, useHistoryStore } from "~/stores/historyStore";
import {
  type SavedWordLookupState,
  useSavedWordLookupStore,
  type WordLookup,
} from "~/stores/savedWordLookupStore";
import { Pronunciation } from "~/components/Pronunciation";
import { groupByTime } from "~/utils/groupByTime";
import Link from "next/link";
import {
  type HistoryTabState,
  useHistoryTabStore,
} from "~/stores/historyTabStore";
import { Modal } from "~/components/Modal";
import { createWordLink } from "~/utils/createWordLink";
import { formatTime } from "~/utils/formatTime";
import { useLongPress } from "~/utils/useLongPress";

export default function History() {
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );

  const dictionaryLookups = useStore<
    HistoryState,
    HistoryState["dictionaryLookups"]
  >(useHistoryStore, (x) => x.dictionaryLookups);
  const dictionaryLookupsGroupedByTime = useMemo(() => {
    const maxTimeDiffBetweenGroupValues = 1000 * 60 * 15; // 15 minutes
    if (!dictionaryLookups) return;
    const groups = groupByTime(
      dictionaryLookups,
      (x) => x.time,
      maxTimeDiffBetweenGroupValues
    );
    // Sort clip reader lookup groups from most recent to least recent
    groups.reverse();
    groups.forEach((group) => group.values.reverse());
    return groups;
  }, [dictionaryLookups]);
  const clearDictionaryHistory = useHistoryStore(
    (x) => x.clearDictionaryHistory
  );

  const searches = useStore<HistoryState, HistoryState["searches"]>(
    useHistoryStore,
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
  const clearSearchHistory = useHistoryStore((x) => x.clearSearchHistory);

  const clipReaderLookups = useStore<
    HistoryState,
    HistoryState["clipReaderLookups"]
  >(useHistoryStore, (x) => x.clipReaderLookups);
  const clipReaderLookupsGroupedByTime = useMemo(() => {
    const maxTimeDiffBetweenGroupValues = 1000 * 60 * 15; // 15 minutes
    if (!clipReaderLookups) return;
    const groups = groupByTime(
      clipReaderLookups,
      (x) => x.time,
      maxTimeDiffBetweenGroupValues
    );
    // Sort clip reader lookup groups from most recent to least recent
    groups.reverse();
    groups.forEach((group) => group.values.reverse());
    return groups;
  }, [clipReaderLookups]);
  const clearClipReaderHistory = useHistoryStore(
    (x) => x.clearClipReaderHistory
  );

  const ocrLookups = useStore<HistoryState, HistoryState["ocrLookups"]>(
    useHistoryStore,
    (x) => x.ocrLookups
  );
  const clearOcrHistory = useHistoryStore((x) => x.clearOcrHistory);

  const savedWordLookups = useStore<
    SavedWordLookupState,
    SavedWordLookupState["savedWordLookups"]
  >(useSavedWordLookupStore, (x) => x.savedWordLookups);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const historyTab = useStore<HistoryTabState, HistoryTabState["historyTab"]>(
    useHistoryTabStore,
    (x) => x.historyTab
  );

  const [isModalShown, setIsModalShown] = useState(false);

  const longPress = useLongPress<WordLookup>();

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <HistoryHeader
        openSideMenu={() => setIsSideMenuOpen(true)}
        clearCurrentList={() => {
          switch (historyTab) {
            case "Dict":
              return clearDictionaryHistory();
            case "Reader":
              return clearClipReaderHistory();
            case "OCR":
              return clearOcrHistory();
            case "Search":
              return clearSearchHistory();
            case "Cards":
              return setIsModalShown(true);
          }
        }}
      />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
      />

      <div className="flex w-full max-w-2xl flex-col">
        {((): JSX.Element => {
          switch (historyTab) {
            case "Dict":
              return (
                <div>
                  {dictionaryLookupsGroupedByTime?.map(
                    (dictionaryLookupGroup) => {
                      const {
                        values: lookups,
                        minTime,
                        maxTime,
                      } = dictionaryLookupGroup;
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
                              : `${formatTime(minTime)} - ${formatTime(
                                  maxTime
                                )}`}
                          </time>
                          <ul>
                            {lookups.map((lookup) => {
                              const {
                                wordEntry: {
                                  word,
                                  pronunciation,
                                  pitchAccents,
                                  definitions,
                                },
                                searchText,
                                resultIndex,
                                time,
                              } = lookup;
                              return (
                                <li
                                  key={`${word}-${pronunciation}-${time}`}
                                  className="relative"
                                >
                                  <Link
                                    href={createWordLink({
                                      searchText,
                                      resultIndex,
                                    })}
                                    className={classNames(
                                      "flex flex-col border-b p-2",
                                      isDarkMode
                                        ? "border-slate-500"
                                        : "border-slate-300"
                                    )}
                                    onTouchStart={() =>
                                      longPress.onTouchStart(lookup)
                                    }
                                    onTouchEnd={longPress.onTouchEnd}
                                  >
                                    <span className="flex gap-3">
                                      <span className="text-lg">{word}</span>
                                      <Pronunciation
                                        word={word}
                                        pronunciation={pronunciation}
                                        pitchAccents={pitchAccents}
                                      />
                                    </span>
                                    <span
                                      className={classNames(
                                        isDarkMode
                                          ? "text-slate-400"
                                          : "text-slate-700"
                                      )}
                                    >
                                      {definitions.join(", ")}
                                    </span>
                                  </Link>
                                  {longPress.menu.type === "OPEN" &&
                                    longPress.menu.target === lookup && (
                                      <article className="absolute left-[calc(50%-100px)] top-[calc(100%-30px)] z-20 flex flex-col bg-slate-700 text-white">
                                        <Link
                                          href={createWordLink({
                                            searchText,
                                            resultIndex,
                                          })}
                                          className="px-4 py-3 text-left"
                                        >
                                          View Entry
                                        </Link>
                                        <button
                                          className="px-4 py-3 text-left"
                                          onClick={() => {
                                            void navigator.clipboard.writeText(
                                              word
                                            );
                                            longPress.closeMenu();
                                          }}
                                        >
                                          Copy Headword
                                        </button>
                                        <button className="px-4 py-3 text-left">
                                          Delete Flashcard
                                        </button>
                                        <button className="px-4 py-3 text-left">
                                          Remove from History
                                        </button>
                                      </article>
                                    )}
                                </li>
                              );
                            })}
                          </ul>
                        </article>
                      );
                    }
                  )}
                  {longPress.menu.type === "OPEN" && (
                    <div
                      className="fixed inset-0"
                      onClick={longPress.closeMenu}
                    ></div>
                  )}
                </div>
              );

            case "Reader":
              return (
                <div>
                  {clipReaderLookupsGroupedByTime?.map(
                    (clipReaderLookupGroup) => {
                      const {
                        values: lookups,
                        minTime,
                        maxTime,
                      } = clipReaderLookupGroup;
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
                              : `${formatTime(minTime)} - ${formatTime(
                                  maxTime
                                )}`}
                          </time>
                          <ul>
                            {lookups.map((lookup) => {
                              const {
                                wordEntry: {
                                  word,
                                  pronunciation,
                                  pitchAccents,
                                  definitions,
                                },
                                searchText,
                                resultIndex,
                                time,
                              } = lookup;
                              return (
                                <li key={`${word}-${pronunciation}-${time}`}>
                                  <Link
                                    href={createWordLink({
                                      searchText,
                                      resultIndex,
                                    })}
                                    className={classNames(
                                      "flex flex-col border-b p-2",
                                      isDarkMode
                                        ? "border-slate-500"
                                        : "border-slate-300"
                                    )}
                                  >
                                    <span className="flex gap-3">
                                      <span className="text-lg">{word}</span>
                                      <Pronunciation
                                        word={word}
                                        pronunciation={pronunciation}
                                        pitchAccents={pitchAccents}
                                      />
                                    </span>
                                    <span
                                      className={classNames(
                                        isDarkMode
                                          ? "text-slate-400"
                                          : "text-slate-700"
                                      )}
                                    >
                                      {definitions.join(", ")}
                                    </span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </article>
                      );
                    }
                  )}
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
                <ul>
                  {savedWordLookups?.map((savedWordLookup) => {
                    const {
                      searchText,
                      resultIndex,
                      wordEntry: {
                        word,
                        pronunciation,
                        pitchAccents,
                        definitions,
                      },
                    } = savedWordLookup;
                    const key = `${word}-${pronunciation}`;
                    return (
                      <li key={key}>
                        <Link
                          href={createWordLink({ searchText, resultIndex })}
                          className={classNames(
                            "block border-b p-4",
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
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              );

            case undefined:
              return <></>;
          }
        })()}
      </div>

      <Modal isShown={isModalShown} onClose={() => setIsModalShown(false)}>
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">{`Can't Clear Flashcards`}</h2>
          <p>{`This tab simply displays a list of your most recently modified flashcards - pulling that data directly from your flashcard database - so there's no way to "clear" it.`}</p>
          <p>{`However, you can tap-hold on an individual card and choose "Delete Card" from the popup menu to permanently delete it.`}</p>
          <button
            className={classNames(
              "self-start p-2",
              isDarkMode ? "text-blue-500" : "text-black"
            )}
            onClick={() => setIsModalShown(false)}
          >
            OK
          </button>
        </div>
      </Modal>
    </main>
  );
}
