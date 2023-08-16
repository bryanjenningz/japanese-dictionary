import { useEffect, useMemo, useState } from "react";
import { Header } from "~/components/Header";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { useSearch } from "~/dictionary/useSearch";
import { SearchResults } from "~/components/SearchResults";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { useHistoryStore } from "~/stores/historyStore";
import {
  type SearchTextState,
  useSearchTextStore,
} from "~/stores/searchTextStore";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const addSearch = useHistoryStore((x) => x.addSearch);
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const searchText = useStore<SearchTextState, SearchTextState["searchText"]>(
    useSearchTextStore,
    (x) => x.searchText
  );
  const setSearchText = useSearchTextStore((x) => x.setSearchText);
  useEffect(() => {
    const searchText = router.query.search;
    if (!searchText || typeof searchText !== "string") return;
    setSearchText(searchText);
    addSearch({ time: Date.now(), searchText });
  }, [addSearch, setSearchText, router.query.search]);
  const search = useSearch();
  const { wordEntries } = useMemo(
    () => search(searchText?.trim() ?? ""),
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
        searchText={searchText ?? ""}
        setSearchText={setSearchText}
      />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
      />

      <div className="flex w-full max-w-2xl flex-col">
        <SearchResults wordEntries={wordEntries} />
      </div>
    </main>
  );
}
