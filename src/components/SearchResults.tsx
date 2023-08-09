import { classNames } from "~/utils/classNames";
import { type WordEntry } from "~/dictionary/search";
import { Pronunciation } from "~/components/Pronunciation";

export const SearchResults = ({
  wordEntries,
  isDarkMode,
}: {
  wordEntries: WordEntry[];
  isDarkMode: boolean;
}) => {
  return (
    <ul>
      {wordEntries.map((wordEntry) => {
        const { word, pronunciation, pitchAccents, definitions } = wordEntry;
        const key = `${word}-${pronunciation}`;
        return (
          <li
            key={key}
            className={classNames(
              "border-b p-4",
              isDarkMode ? "border-slate-600" : "border-slate-300"
            )}
          >
            <div className="flex items-center gap-3">
              <h2 className="text-xl">{word}</h2>
              <Pronunciation
                word={word}
                pronunciation={pronunciation}
                pitchAccents={pitchAccents}
                isDarkMode={isDarkMode}
              />
            </div>
            <p className={isDarkMode ? "text-slate-400" : "text-slate-700"}>
              {definitions.join(", ")}
            </p>
          </li>
        );
      })}
    </ul>
  );
};
