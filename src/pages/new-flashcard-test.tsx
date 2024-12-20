import { useState } from "react";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { SimpleHeader } from "~/components/SimpleHeader";
import {
  useFlashcardStore,
  flashcardTestMaxCardsOptions,
} from "~/stores/flashcardStore";
import { Modal } from "~/components/Modal";
import { useRouter } from "next/router";

export default function NewFlashcardTest() {
  const router = useRouter();
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const cardCount = useStore(useFlashcardStore, (x) => x.flashcards.length);

  const flashcardTestMaxCards = useStore(
    useFlashcardStore,
    (x) => x.flashcardTestMaxCards,
  );
  const setFlashcardTestMaxCards = useFlashcardStore(
    (x) => x.setFlashcardTestMaxCards,
  );
  const startNewFlashcardTest = useFlashcardStore(
    (x) => x.startNewFlashcardTest,
  );

  const [isModalShown, setIsModalShown] = useState(false);

  const newFlashcardTestOptions = [
    {
      heading: "Start",
      buttonContent:
        cardCount === 0 ? (
          <>{`You don't have any flashcards saved`}</>
        ) : (
          <>Begin Test Session</>
        ),
      onClick: () => {
        if (cardCount === 0) return;
        startNewFlashcardTest();
        void router.replace("/flashcard-test");
      },
    },
    {
      heading: "Basic Settings",
      buttonContent: (
        <>
          Max # of cards
          <span
            className={classNames(
              isDarkMode ? "text-slate-400" : "text-slate-500",
            )}
          >
            {flashcardTestMaxCards}
          </span>
        </>
      ),
      onClick: () => setIsModalShown(true),
    },
  ];

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black",
      )}
    >
      <SimpleHeader
        title="Flashcard Test"
        openSideMenu={() => setIsSideMenuOpen(true)}
      />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
      />

      <div className="flex w-full max-w-2xl flex-col gap-3 p-4">
        {newFlashcardTestOptions.map(({ heading, buttonContent, onClick }) => {
          return (
            <article key={heading} className="flex flex-col">
              <h2
                className={classNames(
                  "text-sm",
                  isDarkMode ? "text-blue-500" : "text-blue-600",
                )}
              >
                {heading}
              </h2>
              <button
                className={classNames(
                  "flex flex-col py-3 text-left",
                  isDarkMode ? "text-white" : "text-black",
                )}
                onClick={onClick}
              >
                {buttonContent}
              </button>
            </article>
          );
        })}

        <Modal isShown={isModalShown} onClose={() => setIsModalShown(false)}>
          <div className="flex flex-col gap-5">
            <h2 className="text-xl">Max # of cards</h2>

            <ul className="flex w-64 flex-col gap-3">
              {flashcardTestMaxCardsOptions.map((option) => {
                return (
                  <li key={option}>
                    <label className="flex items-center gap-5 text-lg">
                      <input
                        type="radio"
                        className="h-5 w-5 accent-blue-500"
                        onChange={() => {
                          setFlashcardTestMaxCards(option);
                          setIsModalShown(false);
                        }}
                        checked={option === flashcardTestMaxCards}
                      />
                      {option}
                    </label>
                  </li>
                );
              })}
            </ul>

            <button
              className={classNames(
                "self-end px-4 py-2 uppercase",
                isDarkMode ? "text-blue-500" : "text-black",
              )}
              onClick={() => setIsModalShown(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </main>
  );
}
