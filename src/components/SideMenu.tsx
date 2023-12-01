import Link from "next/link";
import { useRouter } from "next/router";
import { type MouseEvent, useState } from "react";
import { MoonIcon } from "~/icons/MoonIcon";
import { SmallClipboardIcon } from "~/icons/SmallClipboardIcon";
import { SmallHistoryIcon } from "~/icons/SmallHistoryIcon";
import { SmallLearnIcon } from "~/icons/SmallLearnIcon";
import { SmallRocketLaunchIcon } from "~/icons/SmallRocketLaunchIcon";
import { SmallSearchIcon } from "~/icons/SmallSearchIcon";
import { SmallSettingsIcon } from "~/icons/SmallSettingsIcon";
import { SunIcon } from "~/icons/SunIcon";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useFlashcardStore } from "~/stores/flashcardStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";
import { Modal } from "~/components/Modal";
import { SmallLocalLibraryIcon } from "~/icons/SmallLocalLibraryIcon";

type SideMenuOptionGroup = {
  label: string;
  options: SideMenuOption[];
};

type SideMenuOption = {
  label: string;
  icon: JSX.Element;
  href: string;
  onClick?: (event: MouseEvent) => void;
};

export const SideMenu = ({
  isSideMenuOpen,
  closeSideMenu,
}: {
  isSideMenuOpen: boolean;
  closeSideMenu: () => void;
}) => {
  const router = useRouter();

  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;
  const setIsDarkMode = useDarkModeStore((x) => x.setIsDarkMode);

  const hasFlashcardTest = useStore(
    useFlashcardStore,
    (x) => !!x.flashcardTest,
  );
  const deleteCurrentFlashcardTest = useFlashcardStore(
    (x) => x.deleteCurrentFlashcardTest,
  );

  const [isModalShown, setIsModalShown] = useState(false);

  const sideMenuOptionGroups: SideMenuOptionGroup[] = [
    {
      label: "Dictionary",
      options: [
        {
          label: "Dictionary",
          icon: (
            <span id="home-link">
              <SmallSearchIcon />
            </span>
          ),
          href: "/",
        },
        { label: "History", icon: <SmallHistoryIcon />, href: "/history" },
      ],
    },
    {
      label: "Reader",
      options: [
        {
          label: "Clip Reader",
          icon: (
            <span id="clip-reader-link">
              <SmallClipboardIcon />
            </span>
          ),
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
          icon: (
            <span id="new-flashcard-test-link">
              <SmallLearnIcon />
            </span>
          ),
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
      options: [
        { label: "Settings", icon: <SmallSettingsIcon />, href: "/settings" },
      ],
    },
    {
      label: "Other",
      options: [
        {
          label: "Tutorial",
          icon: <SmallLocalLibraryIcon />,
          href: "/tutorial",
        },
      ],
    },
  ];

  return (
    <>
      <div
        className={classNames(
          "fixed inset-0 z-10 bg-black opacity-40",
          !isSideMenuOpen && "hidden",
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
                  isDarkMode ? "text-blue-500" : "text-black",
                )}
                onClick={() => setIsModalShown(false)}
                tabIndex={isModalShown ? 0 : -1}
              >
                No
              </button>

              <button
                className={classNames(
                  "px-4 py-2 uppercase",
                  isDarkMode ? "text-blue-500" : "text-black",
                )}
                onClick={() => {
                  deleteCurrentFlashcardTest();
                  void router.push("/new-flashcard-test");
                }}
                tabIndex={isModalShown ? 0 : -1}
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
          isSideMenuOpen ? "left-0" : "-left-64",
        )}
        aria-hidden={!isSideMenuOpen}
      >
        <button
          className={classNames(
            "flex w-full items-center justify-center py-4 text-white",
            isDarkMode ? "bg-black" : "bg-blue-600",
          )}
          onClick={() => setIsDarkMode(!isDarkMode)}
          tabIndex={isSideMenuOpen ? 0 : -1}
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

        {sideMenuOptionGroups.map(({ label, options }) => {
          return (
            <section key={label}>
              <h2
                className={classNames(
                  "px-4 py-2 text-xs uppercase",
                  isDarkMode ? "bg-slate-900" : "bg-slate-200",
                )}
              >
                {label}
              </h2>
              <ul>
                {options.map((option) => {
                  const key = `${label}-${option.label}`;
                  return (
                    <li key={key}>
                      <Link
                        tabIndex={isSideMenuOpen ? 0 : -1}
                        className={classNames(
                          "flex w-full items-center gap-2 px-4 py-2 text-left text-lg",
                          router.pathname === option.href &&
                            (isDarkMode
                              ? "bg-blue-900 text-white"
                              : "bg-blue-300 text-black"),
                        )}
                        href={option.href}
                        onClick={option.onClick}
                      >
                        {option.icon} {option.label}
                      </Link>
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
