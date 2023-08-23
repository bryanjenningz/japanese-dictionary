import { classNames } from "~/utils/classNames";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { useHistoryStore, type WordSearch } from "~/stores/historyStore";
import { type Flashcard } from "~/stores/flashcardStore";
import Link from "next/link";
import { formatTime } from "~/utils/formatTime";
import { type LongPress } from "~/utils/useLongPress";
import { useRouter } from "next/router";
import { useTimeGroups } from "~/utils/groupByTime";

export const SearchHistory = ({
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
