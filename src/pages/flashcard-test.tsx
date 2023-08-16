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
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";
import { Pronunciation } from "~/components/Pronunciation";

export default function FlashcardTest() {
  const router = useRouter();
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
  const goToNextFlashcard = useFlashcardStore((x) => x.goToNextFlashcard);
  const isLastFlashcard = useFlashcardStore((x) => x.isLastFlashcard());
  const deleteCurrentFlashcardTest = useFlashcardStore(
    (x) => x.deleteCurrentFlashcardTest
  );
  const flashcardTest = useStore<
    FlashcardState,
    FlashcardState["flashcardTest"]
  >(useFlashcardStore, (x) => x.flashcardTest);
  const flashcardsCorrect =
    flashcardTest?.flashcards.filter((x) => x.status === "Pass").length ?? 0;
  const flashcardsIncorrect =
    flashcardTest?.flashcards.filter((x) => x.status === "Fail").length ?? 0;
  const percentCorrect =
    Math.floor(
      (flashcardsCorrect / (flashcardsCorrect + flashcardsIncorrect)) * 100
    ) || 0;
  const percentIncorrect =
    Math.floor(
      (flashcardsIncorrect / (flashcardsCorrect + flashcardsIncorrect)) * 100
    ) || 0;

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const [isModalShown, setIsModalShown] = useState(false);

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

      <Modal
        isShown={isModalShown}
        onClose={() => {
          // Do nothing
        }}
      >
        <div className="flex w-64 flex-col gap-3">
          <h2 className="text-xl">Session Statistics</h2>

          <div>
            <div>{`Correct: ${flashcardsCorrect} (${percentCorrect}%)`}</div>
            <div>{`Incorrect: ${flashcardsIncorrect} (${percentIncorrect}%)`}</div>
          </div>

          <div className="flex items-center justify-end">
            <button
              className={classNames(
                "px-4 py-2 uppercase",
                isDarkMode ? "text-blue-500" : "text-black"
              )}
              onClick={() => {
                deleteCurrentFlashcardTest();
                void router.replace("/new-flashcard-test");
              }}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal>

      {flashcardTestCard && (
        <div className="flex w-full max-w-2xl grow flex-col">
          <div className="flex grow flex-col gap-3 p-4 text-4xl">
            <div>{flashcardTestCard.flashcard.wordEntry.word}</div>

            {flashcardTestCard.status !== "Unseen" && (
              <div className="flex flex-col gap-3 text-2xl">
                <Pronunciation
                  word={flashcardTestCard.flashcard.wordEntry.word}
                  pronunciation={
                    flashcardTestCard.flashcard.wordEntry.pronunciation
                  }
                  pitchAccents={
                    flashcardTestCard.flashcard.wordEntry.pitchAccents
                  }
                />

                <p>
                  {flashcardTestCard.flashcard.wordEntry.definitions.join(", ")}
                </p>
              </div>
            )}
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
                onClick={() => {
                  setCurrentFlashcardStatus("Pass");
                  if (isLastFlashcard) {
                    setIsModalShown(true);
                  } else {
                    goToNextFlashcard();
                  }
                }}
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
                onClick={() => {
                  setCurrentFlashcardStatus("Fail");
                  if (isLastFlashcard) {
                    setIsModalShown(true);
                  } else {
                    goToNextFlashcard();
                  }
                }}
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
