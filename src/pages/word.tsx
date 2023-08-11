import { useEffect, useMemo, useState } from "react";
import { classNames } from "~/utils/classNames";
import { useSearch } from "~/dictionary/useSearch";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { WordHeader } from "~/components/WordHeader";
import { useHistory } from "~/stores/historyStore";

export default function Word() {
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );
  const addDictionaryLookup = useHistory((x) => x.addDictionaryLookup);

  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const searchText = new URLSearchParams(window.location.search).get("word");
    if (!searchText) return;
    setSearchText(searchText);
  }, []);
  const search = useSearch();
  const { wordEntries } = useMemo(
    () => search(searchText.trim()),
    [searchText, search]
  );

  useEffect(() => {
    if (wordEntries[0]) {
      addDictionaryLookup({ time: Date.now(), wordEntry: wordEntries[0] });
    }
  }, [wordEntries, addDictionaryLookup]);

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {wordEntries[0] && <WordHeader wordEntry={wordEntries[0]} />}
    </main>
  );
}
