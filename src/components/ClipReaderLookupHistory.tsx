import { classNames } from "~/utils/classNames";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { useHistoryStore, type WordSearch } from "~/stores/historyStore";
import { useFlashcardStore, type Flashcard } from "~/stores/flashcardStore";
import { Pronunciation } from "~/components/Pronunciation";
import Link from "next/link";
import { createWordLink } from "~/utils/createWordLink";
import { formatTime } from "~/utils/formatTime";
import { type LongPressMenu } from "~/utils/useLongPressMenu";
import { equals } from "~/utils/equals";
import { useRouter } from "next/router";
import { useTimeGroups } from "~/utils/groupByTime";

export const ClipReaderLookupHistory = ({
  longPress,
}: {
  longPress: LongPressMenu<Flashcard | WordSearch>;
}) => {
  const router = useRouter();
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;
  const clipReaderLookups = useStore(
    useHistoryStore,
    (x) => x.clipReaderLookups,
  );
  const clipReaderLookupsGroupedByTime = useTimeGroups(clipReaderLookups);
  const removeClipReaderLookup = useHistoryStore(
    (x) => x.removeClipReaderLookup,
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
                isDarkMode ? "bg-slate-700" : "bg-slate-500",
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
                  equals(x.wordEntry, lookup.wordEntry),
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
                          }),
                        );
                      }}
                      className={classNames(
                        "flex w-full select-none flex-col border-b p-2 text-left",
                        isDarkMode ? "border-slate-500" : "border-slate-300",
                      )}
                      onContextMenu={(event) => {
                        event.preventDefault();
                        longPress.onLongPress(lookup);
                      }}
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
                          isDarkMode ? "text-slate-400" : "text-slate-700",
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
                              : "bg-white text-black",
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
