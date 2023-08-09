import { useState } from "react";
import { MenuIcon } from "~/icons/MenuIcon";
import { MoreVerticalIcon } from "~/icons/MoreVerticalIcon";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";

type HeaderTabId = (typeof headerTabs)[number]["id"];

const DEFAULT_HEADER_TAB_ID: HeaderTabId = 1;

const headerTabs = [
  { id: 1, label: "Dict" },
  { id: 2, label: "Reader" },
  { id: 3, label: "OCR" },
  { id: 4, label: "Search" },
  { id: 5, label: "Cards" },
] as const;

export const HistoryHeader = ({
  openSideMenu,
}: {
  openSideMenu: () => void;
}) => {
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode);

  const [headerTabId, setHeaderTabId] = useState<HeaderTabId>(
    DEFAULT_HEADER_TAB_ID
  );

  return (
    <header
      className={classNames(
        "flex w-full justify-center text-white shadow",
        isDarkMode ? "bg-black" : "bg-blue-600"
      )}
    >
      <div className="w-full max-w-2xl">
        <section className="flex h-14 items-center">
          <button className="h-full px-6" onClick={openSideMenu}>
            <span className="sr-only">Open side menu</span>
            <MenuIcon />
          </button>

          <div className="relative flex grow">
            <h1 className="text-lg font-semibold">History</h1>
          </div>

          <button className="flex h-full items-center justify-center px-4">
            <span className="sr-only">More options</span>
            <MoreVerticalIcon />
          </button>
        </section>

        <section className="flex h-14 items-center">
          {headerTabs.map(({ id, label }) => {
            return (
              <button
                key={id}
                className={classNames(
                  "flex h-full grow basis-1 items-center justify-center uppercase",
                  headerTabId === id && "border-b-2 border-white"
                )}
                onClick={() => setHeaderTabId(id)}
              >
                {label}
              </button>
            );
          })}
        </section>
      </div>
    </header>
  );
};
