import { useState } from "react";
import { MenuIcon } from "~/icons/MenuIcon";
import { MoreVerticalIcon } from "~/icons/MoreVerticalIcon";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";

type HistoryHeaderTab = (typeof historyHeaderTabs)[number];

const DEFAULT_HISTORY_HEADER_TAB: HistoryHeaderTab = "Dict";

const historyHeaderTabs = ["Dict", "Reader", "OCR", "Search", "Cards"] as const;

export const HistoryHeader = ({
  openSideMenu,
}: {
  openSideMenu: () => void;
}) => {
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode);

  const [historyHeaderTab, setHistoryHeaderTab] = useState<HistoryHeaderTab>(
    DEFAULT_HISTORY_HEADER_TAB
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
          {historyHeaderTabs.map((tab) => {
            return (
              <button
                key={tab}
                className={classNames(
                  "flex h-full grow basis-1 items-center justify-center uppercase",
                  historyHeaderTab === tab && "border-b-2 border-white"
                )}
                onClick={() => setHistoryHeaderTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </section>
      </div>
    </header>
  );
};
