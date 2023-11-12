import { create } from "zustand";
import { persist } from "zustand/middleware";
import { equals } from "~/utils/equals";

export type ClipReaderTextState = {
  selectedClipReaderText: ClipReaderText | null;
  clipReaderTexts: ClipReaderText[];
  setSelectedClipReaderText: (
    selectedClipReaderText: ClipReaderText | null,
  ) => void;
  addClipReaderText: (clipReaderText: ClipReaderText) => void;
  removeClipReaderText: (clipReaderText: ClipReaderText) => void;
  clearAllClipReaderTexts: () => void;
};

export type ClipReaderText = {
  text: string;
  time: number;
};

export const useClipReaderTextStore = create<ClipReaderTextState>()(
  persist(
    (set, get) => ({
      selectedClipReaderText: null,
      clipReaderTexts: [],
      setSelectedClipReaderText: (
        selectedClipReaderText: ClipReaderText | null,
      ) => set({ selectedClipReaderText }),
      addClipReaderText: (clipReaderText: ClipReaderText) =>
        set({
          selectedClipReaderText: clipReaderText,
          clipReaderTexts: [clipReaderText, ...get().clipReaderTexts],
        }),
      removeClipReaderText: (clipReaderText: ClipReaderText) =>
        set({
          selectedClipReaderText: equals(
            get().selectedClipReaderText,
            clipReaderText,
          )
            ? null
            : get().selectedClipReaderText,
          clipReaderTexts: removeClipReaderText(
            get().clipReaderTexts,
            clipReaderText,
          ),
        }),
      clearAllClipReaderTexts: () => set({ clipReaderTexts: [] }),
    }),
    { name: "clip-reader-texts" },
  ),
);

const removeClipReaderText = (
  clipReaderTexts: ClipReaderText[],
  removed: ClipReaderText,
): ClipReaderText[] => {
  return clipReaderTexts.filter(
    (clipReaderText) => !equals(clipReaderText, removed),
  );
};
