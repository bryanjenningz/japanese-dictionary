import { type WordEntry } from "~/dictionary/search";
import { Pronunciation } from "~/components/Pronunciation";
import { classNames } from "~/utils/classNames";

export const WordEntryList = ({
  isDarkMode,
  selectedTextElementBottom,
  wordEntries,
}: {
  isDarkMode: boolean;
  selectedTextElementBottom: number | undefined;
  wordEntries: WordEntry[];
}) => {
  return selectedTextElementBottom !== undefined && wordEntries.length > 0 ? (
    <div
      className="absolute left-1 right-1 flex justify-center"
      style={{ top: selectedTextElementBottom }}
    >
      <ul
        className={classNames(
          "no-scrollbar flex max-h-48 w-full flex-col overflow-y-scroll rounded-lg border shadow md:max-w-2xl",
          isDarkMode
            ? "border-white bg-black text-white"
            : "border-black bg-white text-black"
        )}
        // Click events outside the reading text cause the selected text to be
        // unselected. The word entry list is outside the reading text so click
        // events inside the the word entry list will cause the selected text to
        // be unselected.
        // Since we don't want click events inside the word entry list to cause
        // the selected text to be unselected, we stop the click event from
        // propagating.
        onClick={(e) => e.stopPropagation()}
      >
        {wordEntries.map(
          ({ word, pronunciation, definitions, pitchAccents }, i) => {
            return (
              <WordEntryItem
                key={`${word}-${i}`}
                word={word}
                pronunciation={pronunciation}
                definitions={definitions}
                pitchAccents={pitchAccents}
                isDarkMode={isDarkMode}
              />
            );
          }
        )}
      </ul>
    </div>
  ) : (
    <></>
  );
};

const WordEntryItem = ({
  word,
  pronunciation,
  definitions,
  pitchAccents,
  isDarkMode,
}: WordEntry & { isDarkMode: boolean }) => {
  return (
    <li
      className={classNames(
        "flex w-full flex-col border-b p-3 last:border-b-0",
        isDarkMode ? "border-white" : "border-black"
      )}
    >
      <div className="flex flex-wrap gap-3">
        <div className="text-xl">{word}</div>
        <Pronunciation
          word={word}
          pronunciation={pronunciation}
          pitchAccents={pitchAccents}
          isDarkMode={isDarkMode}
        />
      </div>

      <div>{definitions.join(", ")}</div>
    </li>
  );
};
