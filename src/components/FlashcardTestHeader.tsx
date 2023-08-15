import { useState } from "react";
import { CloseIcon } from "~/icons/CloseIcon";
import { MenuIcon } from "~/icons/MenuIcon";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";
import { Modal } from "~/components/Modal";
import { useFlashcardStore } from "~/stores/flashcardStore";
import { useRouter } from "next/router";
import { ArrowOutBoxIcon } from "~/icons/ArrowOutBoxIcon";

export const FlashcardTestHeader = ({
  openSideMenu,
}: {
  openSideMenu: () => void;
}) => {
  const router = useRouter();
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );

  const deleteCurrentFlashcardTest = useFlashcardStore(
    (x) => x.deleteCurrentFlashcardTest
  );

  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <>
      <Modal isShown={isModalShown} onClose={() => setIsModalShown(false)}>
        <div className="flex flex-col gap-3">
          <h2 className="text-xl">Exit Session</h2>

          <p>{`Exit this session? (any card scores already recorded will be preserved)`}</p>

          <div className="flex items-center justify-end">
            <button
              className={classNames(
                "px-4 py-2 uppercase",
                isDarkMode ? "text-blue-500" : "text-black"
              )}
              onClick={() => setIsModalShown(false)}
            >
              No
            </button>

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
              Yes
            </button>
          </div>
        </div>
      </Modal>

      <header
        className={classNames(
          "flex w-full justify-center text-white shadow",
          isDarkMode ? "bg-black" : "bg-blue-600"
        )}
      >
        <div className="w-full max-w-2xl">
          <section className="flex h-14 items-center">
            <button className="h-full px-4" onClick={openSideMenu}>
              <span className="sr-only">Open side menu</span>
              <MenuIcon />
            </button>

            <div className="relative flex grow">
              <h1 className="text-lg font-semibold">Pleco</h1>
            </div>

            <button
              className="h-full px-4"
              onClick={() => setIsModalShown(true)}
            >
              <span className="sr-only">End session</span>
              <CloseIcon />
            </button>

            <button
              className="h-full px-4"
              onClick={() => setIsModalShown(true)}
            >
              <span className="sr-only">View in Dictionary</span>
              <ArrowOutBoxIcon />
            </button>
          </section>
        </div>
      </header>
    </>
  );
};
