import { classNames } from "~/utils/classNames";
import { type WordEntry } from "~/dictionary/search";
import { Pronunciation } from "~/components/Pronunciation";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import Link from "next/link";
import { useSearchTextStore } from "~/stores/searchTextStore";
import { createWordLink } from "~/utils/createWordLink";

export const SearchResults = ({
  wordEntries,
}: {
  wordEntries: WordEntry[];
}) => {
  const searchText = useStore(useSearchTextStore, (x) => x.searchText) ?? "";
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;

  return (
    <ul>
      {wordEntries.map((wordEntry, resultIndex) => {
        const { word, pronunciation, pitchAccents, definitions } = wordEntry;
        const key = `${word}-${pronunciation}-${resultIndex}}`;
        return (
          <li key={key}>
            <Link
              href={createWordLink({ searchText, resultIndex })}
              className={classNames(
                "block border-b p-4",
                isDarkMode ? "border-slate-600" : "border-slate-300",
              )}
            >
              <div className="flex items-center gap-3">
                <h2 className="text-xl">{word}</h2>
                <Pronunciation
                  word={word}
                  pronunciation={pronunciation}
                  pitchAccents={pitchAccents}
                />
              </div>
              <p className={isDarkMode ? "text-slate-400" : "text-slate-700"}>
                {definitions.join(", ")}
              </p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
