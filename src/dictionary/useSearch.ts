import { useCallback, useEffect } from "react";
import { loadDeinflectionData } from "~/dictionary/deinflect";
import { loadPitchData } from "~/dictionary/getPitchAccents";
import { loadWordDict, searchWord } from "~/dictionary/search";
import { useDictionariesStore } from "~/stores/useDictionariesStore";

export const useSearch = () => {
  const dictionaries = useDictionariesStore((x) => x.dictionaries);
  const setDictionaries = useDictionariesStore((x) => x.setDictionaries);

  useEffect(() => {
    void (async () => {
      const startTime = performance.now();

      if (!dictionaries) {
        const [
          { wordDict, wordDictIndex },
          { difReasons, difRules },
          pitchData,
        ] = await Promise.all([
          loadWordDict(),
          loadDeinflectionData(),
          loadPitchData(),
        ]);

        setDictionaries({
          wordDict,
          wordDictIndex,
          difReasons,
          difRules,
          pitchData,
        });
      }

      const endTime = performance.now();
      console.log(`Finished loading data in ${endTime - startTime}ms`);
    })();
  }, [dictionaries, setDictionaries]);

  const search = useCallback(
    (text: string) => {
      return searchWord(
        dictionaries ?? {
          wordDict: "",
          wordDictIndex: "",
          difReasons: [],
          difRules: [],
          pitchData: [],
        },
        removeUnusedChars(text),
      );
    },
    [dictionaries],
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
