import { type WordEntry } from "~/dictionary/search";
import { Pronunciation } from "~/components/Pronunciation";

export const WordEntryList = ({
  selectedTextElementBottom,
  wordEntries,
}: {
  selectedTextElementBottom: number | undefined;
  wordEntries: WordEntry[];
}) => {
  return selectedTextElementBottom !== undefined && wordEntries.length > 0 ? (
    <div
      className="absolute left-1 right-1 flex justify-center"
      style={{ top: selectedTextElementBottom }}
    >
      <ul
        className="no-scrollbar flex max-h-48 w-full flex-col overflow-y-scroll border border-cyan-300 bg-black md:max-w-2xl"
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
}: WordEntry) => {
  return (
    <li className="flex w-full flex-col border-b border-cyan-300 p-3">
      <div className="flex flex-wrap gap-3">
        <div className="text-xl">{word}</div>
        <Pronunciation
          word={word}
          pronunciation={pronunciation}
          pitchAccents={pitchAccents}
        />
      </div>

      <div>{definitions.join(", ")}</div>
    </li>
  );
};
