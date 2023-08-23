import { useState } from "react";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { HistoryHeader } from "~/components/HistoryHeader";
import { useHistoryStore, type WordSearch } from "~/stores/historyStore";
import { useFlashcardStore, type Flashcard } from "~/stores/flashcardStore";
import { Pronunciation } from "~/components/Pronunciation";
import Link from "next/link";
import { useHistoryTabStore } from "~/stores/historyTabStore";
import { createWordLink } from "~/utils/createWordLink";
import { formatTime } from "~/utils/formatTime";
import { type LongPress, useLongPress } from "~/utils/useLongPress";
import { equals } from "~/utils/equals";
import { useRouter } from "next/router";
import { useTimeGroups } from "~/utils/groupByTime";

export default function History() {
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode);
  const clearDictionaryHistory = useHistoryStore(
    (x) => x.clearDictionaryHistory
  );
  const clearClipReaderHistory = useHistoryStore(
    (x) => x.clearClipReaderHistory
  );
  const clearSearchHistory = useHistoryStore((x) => x.clearSearchHistory);
  const clearAllFlashcards = useFlashcardStore((x) => x.clearAllFlashcards);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const historyTab = useStore(useHistoryTabStore, (x) => x.historyTab);
  const longPress = useLongPress<Flashcard | WordSearch>();

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
            case "Search":
              return clearSearchHistory();
            case "Cards":
              return clearAllFlashcards();
          }
        }}
      />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
      />

      {longPress.menu.type === "OPEN" && (
        <div
          className="fixed inset-0 z-10 opacity-0"
          onClick={longPress.closeMenu}
        ></div>
      )}

      <div className="flex w-full max-w-2xl flex-col">
        {((): JSX.Element => {
          switch (historyTab) {
            case "Dict":
              return <DictionaryLookupHistory longPress={longPress} />;
            case "Reader":
              return <ClipReaderLookupHistory longPress={longPress} />;
            case "Search":
              return <SearchHistory longPress={longPress} />;
            case "Cards":
              return <Flashcards longPress={longPress} />;
            case undefined:
              return <></>;
          }
        })()}
      </div>
    </main>
  );
}

const DictionaryLookupHistory = ({
  longPress,
}: {
  longPress: LongPress<Flashcard | WordSearch>;
}) => {
  const router = useRouter();
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode);
  const dictionaryLookups = useStore(
    useHistoryStore,
    (x) => x.dictionaryLookups
  );
  const dictionaryLookupsGroupedByTime = useTimeGroups(dictionaryLookups);
  const removeDictionaryLookup = useHistoryStore(
    (x) => x.removeDictionaryLookup
  );
  const flashcards = useStore(useFlashcardStore, (x) => x.flashcards);
  const saveFlashcard = useFlashcardStore((x) => x.saveFlashcard);
  const deleteFlashcard = useFlashcardStore((x) => x.deleteFlashcard);

  return (
    <div>
      {dictionaryLookupsGroupedByTime?.map((dictionaryLookupGroup) => {
        const { values: lookups, minTime, maxTime } = dictionaryLookupGroup;
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
              {lookups.map((lookup) => {
                const {
                  wordEntry: { word, pronunciation, pitchAccents, definitions },
                  searchText,
                  resultIndex,
                  time,
                } = lookup;

                const isSavedFlashcard = !!flashcards?.find((x) =>
                  equals(x.wordEntry, lookup.wordEntry)
                );

                return (
                  <li
                    key={`${word}-${pronunciation}-${time}`}
                    className="relative"
                  >
                    <button
                      onClick={() => {
                        void router.push(
                          createWordLink({
                            searchText,
                            resultIndex,
                          })
                        );
                      }}
                      className={classNames(
                        "flex w-full select-none flex-col border-b p-2 text-left",
                        isDarkMode ? "border-slate-500" : "border-slate-300"
                      )}
                      onTouchStart={() => longPress.onTouchStart(lookup)}
                      onTouchEnd={longPress.onTouchEnd}
                      onMouseDown={() => longPress.onTouchStart(lookup)}
                      onMouseUp={longPress.onTouchEnd}
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
                          isDarkMode ? "text-slate-400" : "text-slate-700"
                        )}
                      >
                        {definitions.join(", ")}
                      </span>
                    </button>

                    {longPress.menu.type === "OPEN" &&
                      longPress.menu.target === lookup && (
                        <article
                          className={classNames(
                            "absolute left-[calc(50%-100px)] top-[calc(100%-30px)] z-20 flex flex-col shadow-xl",
                            isDarkMode
                              ? "bg-slate-700 text-white"
                              : "bg-white text-black"
                          )}
                        >
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
                              void navigator.clipboard.writeText(word);
                              longPress.closeMenu();
                            }}
                          >
                            Copy Headword
                          </button>
                          <button
                            className="px-4 py-3 text-left"
                            onClick={() => {
                              if (isSavedFlashcard) {
                                deleteFlashcard(lookup);
                              } else {
                                saveFlashcard(lookup);
                              }
                              longPress.closeMenu();
                            }}
                          >
                            {isSavedFlashcard
                              ? "Delete Flashcard"
                              : "Add Flashcard"}
                          </button>
                          <button
                            className="px-4 py-3 text-left"
                            onClick={() => {
                              removeDictionaryLookup(lookup);
                              longPress.closeMenu();
                            }}
                          >
                            Delete from History
                          </button>
                        </article>
                      )}
                  </li>
                );
              })}
            </ul>
          </article>
        );
      })}
    </div>
  );
};

const ClipReaderLookupHistory = ({
  longPress,
}: {
  longPress: LongPress<Flashcard | WordSearch>;
}) => {
  const router = useRouter();
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode);
  const clipReaderLookups = useStore(
    useHistoryStore,
    (x) => x.clipReaderLookups
  );
  const clipReaderLookupsGroupedByTime = useTimeGroups(clipReaderLookups);
  const removeClipReaderLookup = useHistoryStore(
    (x) => x.removeClipReaderLookup
  );
  const flashcards = useStore(useFlashcardStore, (x) => x.flashcards);
  const saveFlashcard = useFlashcardStore((x) => x.saveFlashcard);
  const deleteFlashcard = useFlashcardStore((x) => x.deleteFlashcard);

  return (
    <div>
      {clipReaderLookupsGroupedByTime?.map((clipReaderLookupGroup) => {
        const { values: lookups, minTime, maxTime } = clipReaderLookupGroup;
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
              {lookups.map((lookup) => {
                const {
                  wordEntry: { word, pronunciation, pitchAccents, definitions },
                  searchText,
                  resultIndex,
                  time,
                } = lookup;

                const isSavedFlashcard = !!flashcards?.find((x) =>
                  equals(x.wordEntry, lookup.wordEntry)
                );

                return (
                  <li
                    key={`${word}-${pronunciation}-${time}`}
                    className="relative"
                  >
                    <button
                      onClick={() => {
                        void router.push(
                          createWordLink({
                            searchText,
                            resultIndex,
                          })
                        );
                      }}
                      className={classNames(
                        "flex w-full select-none flex-col border-b p-2 text-left",
                        isDarkMode ? "border-slate-500" : "border-slate-300"
                      )}
                      onTouchStart={() => longPress.onTouchStart(lookup)}
                      onTouchEnd={longPress.onTouchEnd}
                      onMouseDown={() => longPress.onTouchStart(lookup)}
                      onMouseUp={longPress.onTouchEnd}
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
                          isDarkMode ? "text-slate-400" : "text-slate-700"
                        )}
                      >
                        {definitions.join(", ")}
                      </span>
                    </button>

                    {longPress.menu.type === "OPEN" &&
                      longPress.menu.target === lookup && (
                        <article
                          className={classNames(
                            "absolute left-[calc(50%-100px)] top-[calc(100%-30px)] z-20 flex flex-col shadow-xl",
                            isDarkMode
                              ? "bg-slate-700 text-white"
                              : "bg-white text-black"
                          )}
                        >
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
                              void navigator.clipboard.writeText(word);
                              longPress.closeMenu();
                            }}
                          >
                            Copy Headword
                          </button>
                          <button
                            className="px-4 py-3 text-left"
                            onClick={() => {
                              if (isSavedFlashcard) {
                                deleteFlashcard(lookup);
                              } else {
                                saveFlashcard(lookup);
                              }
                              longPress.closeMenu();
                            }}
                          >
                            {isSavedFlashcard
                              ? "Delete Flashcard"
                              : "Add Flashcard"}
                          </button>
                          <button
                            className="px-4 py-3 text-left"
                            onClick={() => {
                              removeClipReaderLookup(lookup);
                              longPress.closeMenu();
                            }}
                          >
                            Delete from History
                          </button>
                        </article>
                      )}
                  </li>
                );
              })}
            </ul>
          </article>
        );
      })}
    </div>
  );
};

const SearchHistory = ({
  longPress,
}: {
  longPress: LongPress<Flashcard | WordSearch>;
}) => {
  const router = useRouter();
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode);
  const searches = useStore(useHistoryStore, (x) => x.searches);
  const searchesGroupedByTime = useTimeGroups(searches);
  const removeSearch = useHistoryStore((x) => x.removeSearch);

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
                  <li key={`${searchText}-${time}`} className="relative">
                    <button
                      onClick={() => {
                        void router.push(`/?search=${searchText}`);
                      }}
                      className="block w-full select-none p-2 text-left text-lg"
                      onTouchStart={() => longPress.onTouchStart(search)}
                      onTouchEnd={longPress.onTouchEnd}
                      onMouseDown={() => longPress.onTouchStart(search)}
                      onMouseUp={longPress.onTouchEnd}
                    >
                      {searchText}
                    </button>

                    {longPress.menu.type === "OPEN" &&
                      longPress.menu.target === search && (
                        <article
                          className={classNames(
                            "absolute left-[calc(50%-100px)] top-[calc(100%-30px)] z-20 flex flex-col shadow-xl",
                            isDarkMode
                              ? "bg-slate-700 text-white"
                              : "bg-white text-black"
                          )}
                        >
                          <Link
                            href={`/?search=${searchText}`}
                            className="px-4 py-3 text-left"
                          >
                            Search for
                          </Link>
                          <button
                            className="px-4 py-3 text-left"
                            onClick={() => {
                              void navigator.clipboard.writeText(searchText);
                              longPress.closeMenu();
                            }}
                          >
                            Copy
                          </button>
                          <button
                            className="px-4 py-3 text-left"
                            onClick={() => {
                              removeSearch(search);
                              longPress.closeMenu();
                            }}
                          >
                            Delete from History
                          </button>
                        </article>
                      )}
                  </li>
                );
              })}
            </ul>
          </article>
        );
      })}
    </div>
  );
};

const Flashcards = ({
  longPress,
}: {
  longPress: LongPress<Flashcard | WordSearch>;
}) => {
  const router = useRouter();
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode);
  const flashcards = useStore(useFlashcardStore, (x) => x.flashcards);
  const deleteFlashcard = useFlashcardStore((x) => x.deleteFlashcard);

  return (
    <ul>
      {flashcards?.map((lookup) => {
        const {
          searchText,
          resultIndex,
          wordEntry: { word, pronunciation, pitchAccents, definitions },
        } = lookup;
        const key = `${word}-${pronunciation}`;
        return (
          <li key={key} className="relative">
            <button
              onClick={() => {
                void router.push(createWordLink({ searchText, resultIndex }));
              }}
              className={classNames(
                "block w-full select-none border-b p-4 text-left",
                isDarkMode ? "border-slate-500" : "border-slate-300"
              )}
              onTouchStart={() => longPress.onTouchStart(lookup)}
              onTouchEnd={longPress.onTouchEnd}
              onMouseDown={() => longPress.onTouchStart(lookup)}
              onMouseUp={longPress.onTouchEnd}
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
            </button>

            {longPress.menu.type === "OPEN" &&
              longPress.menu.target === lookup && (
                <article
                  className={classNames(
                    "absolute left-[calc(50%-100px)] top-[calc(100%-30px)] z-20 flex flex-col shadow-xl",
                    isDarkMode
                      ? "bg-slate-700 text-white"
                      : "bg-white text-black"
                  )}
                >
                  <Link
                    href={createWordLink({
                      searchText,
                      resultIndex,
                    })}
                    className="px-4 py-3 text-left"
                  >
                    View Card
                  </Link>
                  <button
                    className="px-4 py-3 text-left"
                    onClick={() => {
                      void navigator.clipboard.writeText(word);
                      longPress.closeMenu();
                    }}
                  >
                    Copy Headword
                  </button>
                  <button
                    className="px-4 py-3 text-left"
                    onClick={() => {
                      deleteFlashcard(lookup);
                      longPress.closeMenu();
                    }}
                  >
                    Delete Card
                  </button>
                </article>
              )}
          </li>
        );
      })}
    </ul>
  );
};
