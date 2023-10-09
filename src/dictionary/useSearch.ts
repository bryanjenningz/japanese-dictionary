import { useCallback, useEffect, useState } from "react";
import {
  type DeinflectionRuleGroup,
  loadDeinflectionData,
} from "~/dictionary/deinflect";
import { loadPitchData } from "~/dictionary/getPitchAccents";
import { loadWordDict, searchWord } from "~/dictionary/search";

export const useSearch = () => {
  const [wordDict, setWordDict] = useState("");
  const [wordDictIndex, setWordDictIndex] = useState("");
  const [difReasons, setDifReasons] = useState<string[]>([]);
  const [difRules, setDifRules] = useState<DeinflectionRuleGroup[]>([]);
  const [pitchData, setPitchData] = useState<string[]>([]);

  useEffect(() => {
    void (async () => {
      const startTime = performance.now();

      const [{ wordDict, wordDictIndex }, { difReasons, difRules }, pitchData] =
        await Promise.all([
          loadWordDict(),
          loadDeinflectionData(),
          loadPitchData(),
        ]);
      setWordDict(wordDict);
      setWordDictIndex(wordDictIndex);
      setDifReasons(difReasons);
      setDifRules(difRules);
      setPitchData(pitchData);

      const endTime = performance.now();
      console.log(`Finished loading data in ${endTime - startTime}ms`);
    })();
  }, []);

  const search = useCallback(
    (text: string) => {
      return searchWord(
        wordDict,
        wordDictIndex,
        difReasons,
        difRules,
        pitchData,
        removeUnusedChars(text)
      );
    },
    [wordDict, wordDictIndex, difReasons, difRules, pitchData]
  );

  return search;
};

const removeUnusedChars = (text: string): string => {
  // Sometimes there are invisible characters that aren't useful for dictionary
  // searches, so these characters can be safely removed.
  text = text.replace(/\s/g, "");

  // Sometimes kanji have their pronunciation placed in parens directly after.
  // This pronunciation gets in the way and isn't useful for dictionary
  // searches, so it can be safely removed.
  const openParenIndex = text.indexOf("（");
  const closedParenIndex = text.indexOf("）");
  if (
    openParenIndex >= 0 &&
    closedParenIndex >= 0 &&
    openParenIndex < closedParenIndex
  ) {
    text = text.slice(0, openParenIndex) + text.slice(closedParenIndex + 1);
  }

  return text;
};
