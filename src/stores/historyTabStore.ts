import { create } from "zustand";
import { persist } from "zustand/middleware";

export type HistoryTabState = {
  historyTab: HistoryTab;
  setHistoryTab: (historyTab: HistoryTab) => void;
};

type HistoryTab = (typeof historyTabs)[number];

const DEFAULT_HISTORY_TAB: HistoryTab = "Dict";

export const historyTabs = ["Dict", "Reader", "Search", "Cards"] as const;

export const useHistoryTabStore = create<HistoryTabState>()(
  persist(
    (set) => ({
      historyTab: DEFAULT_HISTORY_TAB,
      setHistoryTab: (historyTab: HistoryTab) => set({ historyTab }),
    }),
    { name: "history-tab" },
  ),
);
