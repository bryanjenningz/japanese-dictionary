import { classNames } from "~/utils/classNames";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { type WordSearch } from "~/stores/historyStore";
import { useFlashcardStore, type Flashcard } from "~/stores/flashcardStore";
import { Pronunciation } from "~/components/Pronunciation";
import Link from "next/link";
import { createWordLink } from "~/utils/createWordLink";
import { type LongPressMenu } from "~/utils/useLongPressMenu";
import { useRouter } from "next/router";

export const FlashcardList = ({
  longPress,
}: {
  longPress: LongPressMenu<Flashcard | WordSearch>;
}) => {
  const router = useRouter();
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;
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
                isDarkMode ? "border-slate-500" : "border-slate-300",
              )}
              onContextMenu={(event) => {
                event.preventDefault();
                longPress.onLongPress(lookup);
              }}
            >
              <div className="flex flex-wrap gap-3">
                <div>{word}</div>
                <Pronunciation
                  word={word}
                  pronunciation={pronunciation}
                  pitchAccents={pitchAccents}
                />
              </div>
              <p
                className={classNames(
                  isDarkMode ? "text-slate-300" : "text-slate-600",
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
