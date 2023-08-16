import { useState } from "react";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { FlashcardTestHeader } from "~/components/FlashcardTestHeader";
import {
  type FlashcardState,
  useFlashcardStore,
} from "~/stores/flashcardStore";
import { VisibilityIcon } from "~/icons/VisibilityIcon";

export default function FlashcardTest() {
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );

  const flashcardTest = useStore<
    FlashcardState,
    FlashcardState["flashcardTest"]
  >(useFlashcardStore, (x) => x.flashcardTest);

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

      <div className="flex w-full max-w-2xl grow flex-col">
        <div className="grow p-4 text-4xl">
          {
            flashcardTest?.flashcards[flashcardTest.index ?? 0]?.flashcard
              .wordEntry.word
          }
        </div>

        <button
          className={classNames(
            "flex flex-col items-center gap-6 border-t p-8 text-sm font-semibold",
            isDarkMode
              ? "border-slate-500 bg-black text-white"
              : "border-slate-400 bg-slate-200 text-slate-600"
          )}
        >
          <VisibilityIcon />
          reveal entire card
        </button>
      </div>
    </main>
  );
}
