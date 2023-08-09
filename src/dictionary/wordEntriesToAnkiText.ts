import { type WordEntry } from "~/dictionary/search";
import { wordEntryToText } from "~/dictionary/wordEntryToText";

export const wordEntriesToAnkiText = (wordEntries: WordEntry[]): string => {
  return wordEntries
    .map((wordEntry) => wordEntryToText(wordEntry).split("\n").join(";"))
    .join("\n");
};
