import { katakanaToHiragana } from "~/dictionary/katakanaToHiragana";

export const loadPitchData = async (): Promise<string[]> => {
  return (
    await fetch("/dictionaries/pitch-accents.txt").then((res) => res.text())
  ).split("\n");
};

export const getPitchAccents = (
  pitchData: string[],
  word: string,
  pronunciation: string
): number[] => {
  pronunciation = pronunciation || word;
  let lo = 0;
  let hi = pitchData.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const line = pitchData[mid];
    if (!line) {
      console.log(`Invalid pitch-accents.txt line #${mid}`);
      return [];
    }
    const [pitchWord, pitchPronunciationKatakana, accentsString] =
      line.split("\t");
    const accents = accentsString?.split(",").map(Number);
    if (
      !pitchWord ||
      !pitchPronunciationKatakana ||
      !accents ||
      accents.some(isNaN)
    ) {
      console.log(`Invalid pitch-accents.txt line: "${line}"`);
      return [];
    }
    const pitchPronunciation = katakanaToHiragana(pitchPronunciationKatakana);
    if (word === pitchWord) {
      if (
        pronunciation === pitchPronunciation ||
        pronunciation === pitchPronunciationKatakana
      ) {
        return accents;
      } else if (pronunciation < pitchPronunciation) {
        hi = mid - 1;
      } else {
        lo = mid + 1;
      }
    } else if (word < pitchWord) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  return [];
};
