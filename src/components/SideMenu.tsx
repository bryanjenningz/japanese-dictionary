import Link from "next/link";
import { useRouter } from "next/router";
import { type MouseEvent, useState } from "react";
import { FuriganaIcon } from "~/icons/FuriganaIcon";
import { MoonIcon } from "~/icons/MoonIcon";
import { SmallClipboardIcon } from "~/icons/SmallClipboardIcon";
import { SmallHistoryIcon } from "~/icons/SmallHistoryIcon";
import { SmallLearnIcon } from "~/icons/SmallLearnIcon";
import { SmallRocketLaunchIcon } from "~/icons/SmallRocketLaunchIcon";
import { SmallSearchIcon } from "~/icons/SmallSearchIcon";
import { SmallSettingsIcon } from "~/icons/SmallSettingsIcon";
import { SunIcon } from "~/icons/SunIcon";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import {
  type FlashcardState,
  useFlashcardStore,
} from "~/stores/flashcardStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";
import { Modal } from "~/components/Modal";

export const SideMenu = ({
  isSideMenuOpen,
  closeSideMenu,
}: {
  isSideMenuOpen: boolean;
  closeSideMenu: () => void;
}) => {
  const router = useRouter();

  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );
  const setIsDarkMode = useDarkModeStore((x) => x.setIsDarkMode);

  const hasFlashcardTest = useStore<FlashcardState, boolean>(
    useFlashcardStore,
    (x) => !!x.flashcardTest
  );
  const deleteCurrentFlashcardTest = useFlashcardStore(
    (x) => x.deleteCurrentFlashcardTest
  );

  const [isModalShown, setIsModalShown] = useState(false);

  const sideMenuOptionGroups = [
    {
      label: "Dictionary",
      options: [
        { label: "Dictionary", icon: <SmallSearchIcon />, href: "/" },
        { label: "History", icon: <SmallHistoryIcon />, href: "/history" },
      ],
    },
    {
      label: "Reader",
      options: [
        {
          label: "Clip Reader",
          icon: <SmallClipboardIcon />,
          href: "/clip-reader",
        },
      ],
    },
    {
      label: "Flashcards",
      options: [
        ...(hasFlashcardTest
          ? [
              {
                label: "Continue Test",
                icon: <SmallRocketLaunchIcon />,
                href: "/flashcard-test",
              },
            ]
          : []),
        {
          label: "New Test",
          icon: <SmallLearnIcon />,
          href: "/new-flashcard-test",
          onClick: hasFlashcardTest
            ? (event: MouseEvent) => {
                event.preventDefault();
                setIsModalShown(true);
              }
            : undefined,
        },
      ],
    },
    {
      label: "Settings",
      options: [{ label: "Settings", icon: <SmallSettingsIcon /> }],
    },
  ];

  return (
    <>
      <div
        className={classNames(
          "fixed inset-0 z-10 bg-black opacity-40",
          !isSideMenuOpen && "hidden"
        )}
        onClick={closeSideMenu}
      ></div>

      <div className="z-30">
        <Modal isShown={isModalShown} onClose={() => setIsModalShown(false)}>
          <div className="flex flex-col gap-3">
            <h2 className="text-xl">New Test</h2>
            <p>{`Cancel your in-progress flashcard test and start a new one? (any card scores already recorded will be preserved)`}</p>
            <div className="flex items-center justify-between">
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
                  void router.push("/new-flashcard-test");
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <aside
        className={classNames(
          "fixed bottom-0 top-0 z-10 min-w-[200px] transition-[left] duration-300",
          isDarkMode ? "bg-black text-white" : "bg-white text-black",
          isSideMenuOpen ? "left-0" : "-left-64"
        )}
        aria-hidden={!isSideMenuOpen}
      >
        <section
          className={classNames(
            "flex text-white",
            isDarkMode ? "" : "bg-blue-600"
          )}
        >
          <button
            className="flex grow basis-1 items-center justify-center py-4"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <>
                <span className="sr-only">Dark mode</span>
                <MoonIcon />
              </>
            ) : (
              <>
                <span className="sr-only">Light mode</span>
                <SunIcon />
              </>
            )}
          </button>

          <button className="flex grow basis-1 items-center justify-center py-4">
            <span className="sr-only">Furigana mode</span>
            <FuriganaIcon />
          </button>
        </section>

        {sideMenuOptionGroups.map(({ label, options }) => {
          return (
            <section key={label}>
              <h2
                className={classNames(
                  "px-4 py-2 text-xs uppercase",
                  isDarkMode ? "bg-slate-900" : "bg-slate-200"
                )}
              >
                {label}
              </h2>
              <ul>
                {options.map((option) => {
                  const key = `${label}-${option.label}`;
                  return (
                    <li key={key}>
                      {"href" in option ? (
                        <Link
                          className={classNames(
                            "flex w-full items-center gap-2 px-4 py-2 text-left text-lg",
                            router.pathname === option.href &&
                              (isDarkMode
                                ? "bg-blue-900 text-white"
                                : "bg-blue-300 text-black")
                          )}
                          href={option.href}
                          onClick={
                            "onClick" in option ? option.onClick : undefined
                          }
                        >
                          {option.icon} {option.label}
                        </Link>
                      ) : (
                        <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-lg">
                          {option.icon} {option.label}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </aside>
    </>
  );
};
