import { useRef, useState } from "react";
import { ClipReaderHeader } from "~/components/ClipReaderHeader";
import { SelectableReadingText } from "~/components/SelectableReadingText";
import { SideMenu } from "~/components/SideMenu";
import { WordEntryList } from "~/components/WordEntryList";
import { type WordSearchResult } from "~/dictionary/search";
import { useSearch } from "~/dictionary/useSearch";
import { classNames } from "~/utils/classNames";

const MAX_WORD_SIZE = 20;

export default function ClipReader() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [clipText, setClipText] = useState("");

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
        openSideMenu={() => setIsSideMenuOpen(true)}
        isDarkMode={isDarkMode}
        setClipText={setClipText}
      />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
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
          isDarkMode={isDarkMode}
          selectedTextElementBottom={selectedTextElementBottom}
          wordEntries={wordEntries}
        />
      </div>
    </main>
  );
}
