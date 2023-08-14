import { useEffect, useRef, useState } from "react";
import { ClipReaderHeader } from "~/components/ClipReaderHeader";
import { SelectableReadingText } from "~/components/SelectableReadingText";
import { SideMenu } from "~/components/SideMenu";
import { WordEntryList } from "~/components/WordEntryList";
import { type WordSearchResult } from "~/dictionary/search";
import { useSearch } from "~/dictionary/useSearch";
import {
  type ClipReaderTextState,
  useClipReaderTextStore,
} from "~/stores/clipReaderTextStore";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useHistoryStore } from "~/stores/historyStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";

const MAX_WORD_SIZE = 20;

export default function ClipReader() {
  const addClipReaderLookup = useHistoryStore((x) => x.addClipReaderLookup);
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const clipReaderTexts = useStore<
    ClipReaderTextState,
    ClipReaderTextState["clipReaderTexts"]
  >(useClipReaderTextStore, (x) => x.clipReaderTexts);
  const selectedClipReaderText = useStore<
    ClipReaderTextState,
    ClipReaderTextState["selectedClipReaderText"]
  >(useClipReaderTextStore, (x) => x.selectedClipReaderText);
  const clipText =
    selectedClipReaderText?.text ?? clipReaderTexts?.[0]?.text ?? "";

  const search = useSearch();
  const selectedTextElement = useRef<HTMLButtonElement | null>(null);

  const [selectedTextIndex, setSelectedTextIndex] = useState<null | number>(
    null
  );

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

  const selectedTextElementBottom = selectedTextElement.current
    ? selectedTextElement.current.getBoundingClientRect().bottom +
      window.scrollY
    : undefined;

  const selectedText =
    typeof selectedTextIndex === "number"
      ? clipText.slice(
          selectedTextIndex,
          selectedTextIndex + selectedTextLength
        )
      : "";

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
            ? { searchText, resultIndex: 0, wordEntry: wordEntries[0] }
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
          selectedTextLength={selectedTextLength}
        />

        <WordEntryList
          selectedTextElementBottom={selectedTextElementBottom}
          wordEntries={wordEntries}
        />
      </div>
    </main>
  );
}
