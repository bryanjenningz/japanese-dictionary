import { useEffect, useMemo, useState } from "react";
import { SearchHeader } from "~/components/SearchHeader";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { useSearch } from "~/dictionary/useSearch";
import { SearchResults } from "~/components/SearchResults";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { useHistoryStore } from "~/stores/historyStore";
import { useSearchTextStore } from "~/stores/searchTextStore";
import { useRouter } from "next/router";
import { debounce } from "~/utils/debounce";
import { Dynamic } from "~/components/Dynamic";

export default function Home() {
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { searchText, setSearchText } = useSearchText();
  const wordEntries = useWordEntries(searchText);

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black",
      )}
    >
      <SearchHeader
        openSideMenu={() => setIsSideMenuOpen(true)}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
      />

      <div className="flex w-full max-w-2xl flex-col">
        <Dynamic>
          <SearchResults wordEntries={wordEntries} />
        </Dynamic>
      </div>
    </main>
  );
}

const useSearchText = () => {
  const router = useRouter();
  const searchText = useSearchTextStore((x) => x.searchText);
  const setSearchText = useSearchTextStore((x) => x.setSearchText);
  const addSearch_ = useHistoryStore((x) => x.addSearch);
  const addSearch = useMemo(() => debounce(addSearch_, 1000), [addSearch_]);
  useEffect(() => {
    const searchText = router.query.search;
    if (!searchText || typeof searchText !== "string") return;
    setSearchText(searchText);
    addSearch({ time: Date.now(), searchText });
  }, [addSearch, setSearchText, router.query.search]);
  return { searchText, setSearchText };
};

const useWordEntries = (searchText: string | undefined) => {
  const search = useSearch();
  const { wordEntries } = useMemo(
    () => search(searchText?.trim() ?? ""),
    [searchText, search],
  );
  return wordEntries;
};
