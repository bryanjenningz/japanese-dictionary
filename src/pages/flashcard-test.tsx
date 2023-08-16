import { useState } from "react";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { FlashcardTestHeader } from "~/components/FlashcardTestHeader";
import {
  type FlashcardState,
  useFlashcardStore,
  type FlashcardTestCard,
} from "~/stores/flashcardStore";
import { VisibilityIcon } from "~/icons/VisibilityIcon";
import { DoneIcon } from "~/icons/DoneIcon";
import { CloseIcon } from "~/icons/CloseIcon";

export default function FlashcardTest() {
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );

  const flashcardTestCard = useStore<FlashcardState, FlashcardTestCard | null>(
    useFlashcardStore,
    (x) => x.getCurrentTestFlashcard()
  );
  const setCurrentFlashcardStatus = useFlashcardStore(
    (x) => x.setCurrentFlashcardStatus
  );

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <FlashcardTestHeader openSideMenu={() => setIsSideMenuOpen(true)} />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
      />

      {flashcardTestCard && (
        <div className="flex w-full max-w-2xl grow flex-col">
          <div className="grow p-4 text-4xl">
            {flashcardTestCard.flashcard.wordEntry.word}
          </div>

          {flashcardTestCard.status === "Unseen" ? (
            <button
              className={classNames(
                "flex h-36 flex-col items-center justify-center gap-5 border-t text-sm font-semibold",
                isDarkMode
                  ? "border-slate-500 bg-black text-white"
                  : "border-slate-400 bg-slate-200 text-slate-600"
              )}
              onClick={() => setCurrentFlashcardStatus("Seen")}
            >
              <VisibilityIcon />
              reveal entire card
            </button>
          ) : flashcardTestCard.status === "Seen" ? (
            <div
              className={classNames(
                "flex h-36 border-t text-sm font-semibold",
                isDarkMode
                  ? "border-slate-500 bg-black text-white"
                  : "border-slate-400 bg-slate-200 text-slate-600"
              )}
            >
              <button
                className="flex h-full grow basis-1 flex-col items-center justify-center gap-5"
                onClick={() => setCurrentFlashcardStatus("Unseen")}
              >
                <DoneIcon />
                mark correct
              </button>
              <div
                className={classNames(
                  "h-full w-[1px]",
                  isDarkMode ? "bg-slate-500" : "bg-slate-400"
                )}
              ></div>
              <button
                className="flex h-full grow basis-1 flex-col items-center justify-center gap-5"
                onClick={() => setCurrentFlashcardStatus("Unseen")}
              >
                <CloseIcon />
                mark incorrect
              </button>
            </div>
          ) : null}
        </div>
      )}
    </main>
  );
}
