import { create } from "zustand";
import { persist } from "zustand/middleware";

export type HistoryTabState = {
  historyTab: HistoryHeaderTab;
  setHistoryTab: (historyTab: HistoryHeaderTab) => void;
};

type HistoryHeaderTab = (typeof historyHeaderTabs)[number];

const DEFAULT_HISTORY_HEADER_TAB: HistoryHeaderTab = "Dict";

export const historyHeaderTabs = [
  "Dict",
  "Reader",
  "OCR",
  "Search",
  "Cards",
] as const;

export const useHistoryTabStore = create<HistoryTabState>()(
  persist(
    (set) => ({
      historyTab: DEFAULT_HISTORY_HEADER_TAB,
      setHistoryTab: (historyTab: HistoryHeaderTab) => set({ historyTab }),
    }),
    { name: "history-tab" }
  )
);
