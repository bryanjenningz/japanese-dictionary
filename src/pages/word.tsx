import { useEffect, useMemo, useState } from "react";
import { classNames } from "~/utils/classNames";
import { useSearch } from "~/dictionary/useSearch";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { WordHeader } from "~/components/WordHeader";
import { useHistoryStore } from "~/stores/historyStore";
import { useRouter } from "next/router";

export default function Word() {
  const router = useRouter();
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode);
  const addDictionaryLookup = useHistoryStore((x) => x.addDictionaryLookup);

  const [searchText, setSearchText] = useState("");
  const [resultIndex, setResultIndex] = useState(0);
  useEffect(() => {
    const searchText =
      typeof router.query.search === "string" ? router.query.search : "";
    const resultIndex = isNaN(Number(router.query.index))
      ? 0
      : Number(router.query.index);
    if (!searchText) return;
    setSearchText(searchText);
    setResultIndex(resultIndex);
  }, [router.query.index, router.query.search]);
  const search = useSearch();
  const { wordEntries } = useMemo(
    () => search(searchText.trim()),
    [searchText, search]
  );
  const wordEntry = wordEntries[resultIndex];

  useEffect(() => {
    if (wordEntry) {
      addDictionaryLookup({
        time: Date.now(),
        searchText,
        resultIndex,
        wordEntry,
      });
    }
  }, [wordEntry, addDictionaryLookup, searchText, resultIndex]);

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {wordEntry && (
        <WordHeader
          wordLookup={{ time: Date.now(), searchText, resultIndex, wordEntry }}
          wordEntries={wordEntries}
        />
      )}

      <div className="w-full max-w-2xl">
        <p className="flex flex-col gap-3 p-4">
          {wordEntry?.definitions.join(", ")}
        </p>
      </div>
    </main>
  );
}
