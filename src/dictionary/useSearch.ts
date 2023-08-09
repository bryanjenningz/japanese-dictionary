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
        text
      );
    },
    [wordDict, wordDictIndex, difReasons, difRules, pitchData]
  );

  return search;
};
