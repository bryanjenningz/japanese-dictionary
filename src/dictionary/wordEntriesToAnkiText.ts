import { type WordEntry } from "./search";
import { wordEntryToText } from "./wordEntryToText";

export const wordEntriesToAnkiText = (wordEntries: WordEntry[]): string => {
  return wordEntries
    .map((wordEntry) => wordEntryToText(wordEntry).split("\n").join(";"))
    .join("\n");
};
