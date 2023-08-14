import { create } from "zustand";
import { persist } from "zustand/middleware";
import { equals } from "~/utils/equals";

export type ClipReaderTextState = {
  clipReaderTexts: ClipReaderText[];
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
      clipReaderTexts: [],
      addClipReaderText: (clipReaderText: ClipReaderText) =>
        set({
          clipReaderTexts: [clipReaderText, ...get().clipReaderTexts],
        }),
      removeClipReaderText: (clipReaderText: ClipReaderText) =>
        set({
          clipReaderTexts: removeClipReaderText(
            get().clipReaderTexts,
            clipReaderText
          ),
        }),
      clearAllClipReaderTexts: () => set({ clipReaderTexts: [] }),
    }),
    { name: "clip-reader-texts" }
  )
);

const removeClipReaderText = (
  clipReaderTexts: ClipReaderText[],
  removed: ClipReaderText
): ClipReaderText[] => {
  return clipReaderTexts.filter(
    (clipReaderText) => !equals(clipReaderText, removed)
  );
};
