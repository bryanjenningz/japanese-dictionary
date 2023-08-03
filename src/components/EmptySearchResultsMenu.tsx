import { classNames } from "~/utils/classNames";

const emptySearchResultsMenu = [
  { label: "Browse Entries" },
  { label: "History" },
  { label: "Search Tips" },
  { label: "Instruction Manual" },
];

export const EmptySearchResultsMenu = ({
  isDarkMode,
}: {
  isDarkMode: boolean;
}) => {
  return (
    <ul>
      {emptySearchResultsMenu.map(({ label }) => {
        return (
          <li key={label}>
            <button
              className={classNames(
                "w-full border-b p-4 text-left text-lg",
                isDarkMode ? "border-slate-700" : "border-slate-300"
              )}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
