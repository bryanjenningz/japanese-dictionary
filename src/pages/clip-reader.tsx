import { useEffect, useRef, useState } from "react";
import { ClipReaderHeader } from "~/components/ClipReaderHeader";
import { SelectableReadingText } from "~/components/SelectableReadingText";
import { SideMenu } from "~/components/SideMenu";
import { WordEntryList } from "~/components/WordEntryList";
import { type WordSearchResult } from "~/dictionary/search";
import { useSearch } from "~/dictionary/useSearch";
import { useClipReaderTextStore } from "~/stores/clipReaderTextStore";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useHistoryStore } from "~/stores/historyStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";

const MAX_WORD_SIZE = 20;

export default function ClipReader() {
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const clipText = useClipText();
  const {
    selectedText,
    wordEntries,
    searchText,
    selectedTextIndex,
    setSelectedTextIndex,
  } = useSelectedText(clipText);
  const selectedTextElement = useRef<HTMLButtonElement | null>(null);
  const selectedTextElementBottom = selectedTextElement.current
    ? selectedTextElement.current.getBoundingClientRect().bottom +
      window.scrollY
    : undefined;

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <ClipReaderHeader
        wordLookup={
          wordEntries[0]
            ? {
                time: Date.now(),
                searchText,
                resultIndex: 0,
                wordEntry: wordEntries[0],
              }
            : undefined
        }
        selectedText={selectedText}
        openSideMenu={() => setIsSideMenuOpen(true)}
      />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
      />

      <div className="flex w-full max-w-2xl flex-col">
        <SelectableReadingText
          readingText={clipText}
          selectedTextIndex={selectedTextIndex}
          selectedTextElement={selectedTextElement}
          setSelectedTextIndex={setSelectedTextIndex}
          selectedTextLength={selectedText.length}
        />

        <WordEntryList
          selectedTextElementBottom={selectedTextElementBottom}
          wordEntries={wordEntries}
        />
      </div>
    </main>
  );
}

const useClipText = () => {
  const clipReaderTexts = useStore(
    useClipReaderTextStore,
    (x) => x.clipReaderTexts
  );
  const selectedClipReaderText = useStore(
    useClipReaderTextStore,
    (x) => x.selectedClipReaderText
  );
  const clipText =
    selectedClipReaderText?.text ?? clipReaderTexts?.[0]?.text ?? "";
  return clipText;
};

const useSelectedText = (clipText: string) => {
  const [selectedTextIndex, setSelectedTextIndex] = useState<null | number>(
    null
  );
  const search = useSearch();
  const { selectedTextLength, wordEntries } = ((): WordSearchResult => {
    if (selectedTextIndex === null) {
      return { selectedTextLength: 1, wordEntries: [] };
    }
    const text = clipText
      .slice(selectedTextIndex, selectedTextIndex + MAX_WORD_SIZE)
      .trim();
    return search(text);
  })();
  const searchText =
    selectedTextIndex === null
      ? ""
      : clipText.slice(
          selectedTextIndex,
          selectedTextIndex + selectedTextLength
        );
  const addClipReaderLookup = useHistoryStore((x) => x.addClipReaderLookup);
  useEffect(() => {
    if (wordEntries[0] && searchText) {
      addClipReaderLookup({
        time: Date.now(),
        searchText,
        resultIndex: 0,
        wordEntry: wordEntries[0],
      });
    }
  }, [addClipReaderLookup, wordEntries, searchText]);
  const selectedText =
    typeof selectedTextIndex === "number"
      ? clipText.slice(
          selectedTextIndex,
          selectedTextIndex + selectedTextLength
        )
      : "";
  return {
    selectedText,
    wordEntries,
    searchText,
    selectedTextIndex,
    setSelectedTextIndex,
  };
};
