import { useState } from "react";
import { classNames } from "~/utils/classNames";
import { SearchTipsModal } from "~/components/SearchTipsModal";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";

export const EmptySearchResultsMenu = () => {
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode);
  const [isSearchTipsModalShown, setIsSearchTipsModalShown] = useState(false);

  const emptySearchResultsMenu = [
    { label: "Browse Entries" },
    { label: "History" },
    { label: "Search Tips", onClick: () => setIsSearchTipsModalShown(true) },
  ];

  return (
    <>
      <ul>
        {emptySearchResultsMenu.map(({ label, onClick }) => {
          return (
            <li key={label}>
              <button
                className={classNames(
                  "w-full border-b p-4 text-left text-lg",
                  isDarkMode ? "border-slate-700" : "border-slate-300"
                )}
                onClick={onClick}
              >
                {label}
              </button>
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
