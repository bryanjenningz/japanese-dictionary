import { getMoras } from "~/dictionary/getMoras";
import { type WordEntry } from "~/dictionary/search";

export const wordEntryToText = ({
  word,
  pronunciation,
  pitchAccents,
  definitions,
}: WordEntry): string => {
  pronunciation = pronunciation || word;
  const moras = getMoras(pronunciation);
  return [
    word,
    pitchAccents
      .map((pitchAccent) => insertPitchAccent(moras, pitchAccent))
      .join(", ") || pronunciation,
    definitions.join(", "),
  ].join("\n");
};

const insertPitchAccent = (moras: string[], pitchAccent: number): string => {
  if (pitchAccent === 0) {
    return moras.slice(0, 1).join("") + "↑" + moras.slice(1).join("");
  }
  if (pitchAccent === 1) {
    return moras.slice(0, 1).join("") + "↓" + moras.slice(1).join("");
  }
  return (
    moras.slice(0, 1).join("") +
    "↑" +
    moras.slice(1, pitchAccent).join("") +
    "↓" +
    moras.slice(pitchAccent).join("")
  );
};
