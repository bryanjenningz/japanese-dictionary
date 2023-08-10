import { useState } from "react";
import { classNames } from "~/utils/classNames";
import { SearchTipsModal } from "~/components/SearchTipsModal";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import Link from "next/link";

export const EmptySearchResultsMenu = () => {
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );
  const [isSearchTipsModalShown, setIsSearchTipsModalShown] = useState(false);

  const emptySearchResultsMenu = [
    { label: "Browse Entries" },
    { label: "History", href: "/history" },
    { label: "Search Tips", onClick: () => setIsSearchTipsModalShown(true) },
  ];

  return (
    <>
      <ul>
        {emptySearchResultsMenu.map(({ label, onClick, href }) => {
          return (
            <li key={label}>
              {href ? (
                <Link
                  href={href}
                  className={classNames(
                    "block w-full border-b p-4 text-left text-lg",
                    isDarkMode ? "border-slate-700" : "border-slate-300"
                  )}
                >
                  {label}
                </Link>
              ) : (
                <button
                  className={classNames(
                    "block w-full border-b p-4 text-left text-lg",
                    isDarkMode ? "border-slate-700" : "border-slate-300"
                  )}
                  onClick={onClick}
                >
                  {label}
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <SearchTipsModal
        isShown={isSearchTipsModalShown}
        closeModal={() => setIsSearchTipsModalShown(false)}
      />
    </>
  );
};
