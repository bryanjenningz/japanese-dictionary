import { create } from "zustand";
import { type DeinflectionRuleGroup } from "~/dictionary/deinflect";

export type Dictionaries = {
  wordDict: string;
  wordDictIndex: string;
  difReasons: string[];
  difRules: DeinflectionRuleGroup[];
  pitchData: string[];
};

type DictionariesState = {
  dictionaries: Dictionaries | null;
  setDictionaries: (dictionaries: Dictionaries) => void;
};

export const useDictionariesStore = create<DictionariesState>()((set) => ({
  dictionaries: null,
  setDictionaries: (dictionaries: Dictionaries) => set({ dictionaries }),
}));
