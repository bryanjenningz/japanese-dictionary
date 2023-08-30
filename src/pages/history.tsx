import { useState } from "react";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { HistoryHeader } from "~/components/HistoryHeader";
import { useHistoryStore, type WordSearch } from "~/stores/historyStore";
import { useFlashcardStore, type Flashcard } from "~/stores/flashcardStore";
import { useHistoryTabStore } from "~/stores/historyTabStore";
import { useLongPress } from "~/utils/useLongPress";
import { DictionaryLookupHistory } from "~/components/DictionaryLookupHistory";
import { ClipReaderLookupHistory } from "~/components/ClipReaderLookupHistory";
import { SearchHistory } from "~/components/SearchHistory";
import { FlashcardList } from "~/components/FlashcardList";

export default function History() {
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;
  const clearDictionaryHistory = useHistoryStore(
    (x) => x.clearDictionaryHistory
  );
  const clearClipReaderHistory = useHistoryStore(
    (x) => x.clearClipReaderHistory
  );
  const clearSearchHistory = useHistoryStore((x) => x.clearSearchHistory);
  const clearAllFlashcards = useFlashcardStore((x) => x.clearAllFlashcards);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const historyTab = useStore(useHistoryTabStore, (x) => x.historyTab);
  const longPress = useLongPress<Flashcard | WordSearch>();

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <HistoryHeader
        openSideMenu={() => setIsSideMenuOpen(true)}
        clearCurrentList={() => {
          switch (historyTab) {
            case "Dict":
              return clearDictionaryHistory();
            case "Reader":
              return clearClipReaderHistory();
            case "Search":
              return clearSearchHistory();
            case "Cards":
              return clearAllFlashcards();
            case undefined:
              return;
          }
          historyTab satisfies never;
        }}
      />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
      />

      {longPress.menu.type === "OPEN" && (
        <div
          className="fixed inset-0 z-10 opacity-0"
          onClick={longPress.closeMenu}
        ></div>
      )}

      <div className="flex w-full max-w-2xl flex-col">
        {((): JSX.Element => {
          switch (historyTab) {
            case "Dict":
              return <DictionaryLookupHistory longPress={longPress} />;
            case "Reader":
              return <ClipReaderLookupHistory longPress={longPress} />;
            case "Search":
              return <SearchHistory longPress={longPress} />;
            case "Cards":
              return <FlashcardList longPress={longPress} />;
            case undefined:
              return <></>;
          }
        })()}
      </div>
    </main>
  );
}
