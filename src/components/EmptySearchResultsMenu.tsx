const emptySearchResultsMenu = [
  { label: "Browse Entries" },
  { label: "History" },
  { label: "Search Tips" },
  { label: "Instruction Manual" },
];

export const EmptySearchResultsMenu = () => {
  return (
    <ul>
      {emptySearchResultsMenu.map(({ label }) => {
        return (
          <li key={label}>
            <button className="w-full border-b border-slate-700 p-4 text-left text-lg">
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
