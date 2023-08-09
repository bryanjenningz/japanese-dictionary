import { useMemo, useState } from "react";
import { Header } from "~/components/Header";
import { EmptySearchResultsMenu } from "~/components/EmptySearchResultsMenu";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { useSearch } from "~/dictionary/useSearch";
import { SearchResults } from "~/components/SearchResults";

export default function Home() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchText, setSearchText] = useState("");
  const search = useSearch();
  const { wordEntries } = useMemo(
    () => search(searchText.trim()),
    [searchText, search]
  );

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <Header
        openSideMenu={() => setIsSideMenuOpen(true)}
        isDarkMode={isDarkMode}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div className="flex w-full max-w-2xl flex-col">
        {searchText.trim().length === 0 ? (
          <EmptySearchResultsMenu isDarkMode={isDarkMode} />
        ) : wordEntries.length === 0 ? (
          <p className="py-4 text-center text-lg">
            No search results <span aria-hidden>{`:(`}</span>
          </p>
        ) : (
          <SearchResults wordEntries={wordEntries} isDarkMode={isDarkMode} />
        )}
      </div>
    </main>
  );
}
