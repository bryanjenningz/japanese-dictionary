import { type DeinflectionRuleGroup, deinflect } from "~/dictionary/deinflect";
import { getPitchAccents } from "~/dictionary/getPitchAccents";
import { katakanaToHiragana } from "~/dictionary/katakanaToHiragana";
import { romajiToHiragana } from "~/dictionary/romajiToHiragana";

export type WordEntry = {
  word: string;
  pronunciation: string;
  definitions: string[];
  pitchAccents: number[];
};

export type WordSearchResult = {
  selectedTextLength: number;
  wordEntries: WordEntry[];
};

export const searchWord = (
  wordDict: string,
  wordDictIndex: string,
  difReasons: string[],
  difRules: DeinflectionRuleGroup[],
  pitchData: string[],
  text: string
): WordSearchResult => {
  const wordEntries: WordEntry[] = [];
  const searchedWords = new Set<string>();
  let selectedTextLength = 1;
  for (; text.length > 0; text = text.slice(0, -1)) {
    const deinflections = deinflect(difReasons, difRules, text);
    for (const { word } of deinflections) {
      if (searchedWords.has(word)) {
        continue;
      }
      searchedWords.add(word);
      let lo = 0;
      let hi = wordDictIndex.length - 1;
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const midLineIndex = wordDictIndex.lastIndexOf("\n", mid) + 1;
        const midLineEndIndex = wordDictIndex.indexOf("\n", midLineIndex);
        const midLine = wordDictIndex.slice(midLineIndex, midLineEndIndex);
        const [midWord, ...midIndexStrings] = midLine.split(",");
        if (!midWord) {
          console.log(`Invalid line in word-dict-index.txt: ${midLine}`);
          break;
        }
        const midIndexes = midIndexStrings.map(Number);
        if (midIndexes.some(isNaN)) {
          console.log(
            `Invalid indexes in word-dict-index.txt for line: ${midLine}`
          );
          break;
        }
        const wordHiragana = katakanaToHiragana(romajiToHiragana(word));
        if (midWord === wordHiragana) {
          const newEntries = midIndexes
            .map((wordDictIndex) =>
              wordDict.slice(
                wordDictIndex,
                wordDict.indexOf("\n", wordDictIndex)
              )
            )
            .map(parseWordDictLine)
            .filter(Boolean);

          for (const entry of newEntries) {
            entry.pitchAccents = getPitchAccents(
              pitchData,
              entry.word,
              entry.pronunciation
            );
          }

          wordEntries.push(...newEntries);
          selectedTextLength = Math.max(selectedTextLength, text.length);
          break;
        } else if (midWord < wordHiragana) {
          lo = midLineEndIndex + 1;
        } else {
          hi = midLineIndex - 1;
        }
      }
    }
  }
  return { selectedTextLength, wordEntries };
};

const WORD_DICT_ENTRY_REGEX = /^(.+?)\s+(?:\[(.*?)\])?\s*\/(.+)\//;

const parseWordDictLine = (line: string): WordEntry | null => {
  const [, word, pronunciation, definitions] =
    line.match(WORD_DICT_ENTRY_REGEX) ?? [];
  if (!word || !definitions) {
    console.log(`Improperly formatted word-dict line: ${line}`);
    return null;
  }
  return {
    word,
    pronunciation: pronunciation ?? "",
    definitions: definitions.split("/"),
    pitchAccents: [],
  };
};

export const loadWordDict = async (): Promise<{
  wordDict: string;
  wordDictIndex: string;
}> => {
  const [wordDict, wordDictIndex] = await Promise.all([
    fetch("/dictionaries/word-dict.txt").then((res) => res.text()),
    fetch("/dictionaries/word-dict-index.txt").then((res) => res.text()),
  ]);
  return { wordDict, wordDictIndex };
};
