import { type Dispatch, type SetStateAction } from "react";
import { AddBoxIcon } from "~/icons/AddBoxIcon";
import { AddIcon } from "~/icons/AddIcon";
import { CampaignIcon } from "~/icons/CampaignIcon";
import { ContentCopyIcon } from "~/icons/ContentCopyIcon";
import { HistoryIcon } from "~/icons/HistoryIcon";
import { MenuIcon } from "~/icons/MenuIcon";
import { OpenInNewIcon } from "~/icons/OpenInNewIcon";
import { RefreshIcon } from "~/icons/RefreshIcon";
import { SearchIcon } from "~/icons/SearchIcon";
import { VolumeUpIcon } from "~/icons/VolumeUpIcon";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import {
  type SavedWordLookupState,
  useSavedWordLookupStore,
  type WordLookup,
} from "~/stores/savedWordLookupStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";
import { equals } from "~/utils/equals";

const UnselectedTextMenu = ({
  openSideMenu,
  setClipText,
}: {
  openSideMenu: () => void;
  setClipText: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <section className="flex h-14 items-center">
      <button className="h-full px-6" onClick={openSideMenu}>
        <span className="sr-only">Open side menu</span>
        <MenuIcon />
      </button>

      <div className="relative flex grow">
        <h1 className="text-lg font-semibold">Pleco</h1>
      </div>

      <button
        className="flex h-full items-center justify-center px-4"
        onClick={() => {
          void (async () => {
            try {
              setClipText(await navigator.clipboard.readText());
            } catch {
              setClipText(prompt("Paste Japanese text you want to read") ?? "");
            }
          })();
        }}
      >
        <span className="sr-only">Read text from clipboard</span>
        <RefreshIcon />
      </button>

      <button className="flex h-full items-center justify-center px-4">
        <span className="sr-only">Clipboard history</span>
        <HistoryIcon />
      </button>
    </section>
  );
};

const SelectedTextMenu = ({
  selectedText,
  wordLookup,
}: {
  selectedText: string;
  wordLookup: WordLookup;
}) => {
  const savedWordLookups = useStore<
    SavedWordLookupState,
    SavedWordLookupState["savedWordLookups"]
  >(useSavedWordLookupStore, (x) => x.savedWordLookups);
  const saveWordLookup = useSavedWordLookupStore((x) => x.saveWordLookup);
  const removeWordLookup = useSavedWordLookupStore((x) => x.removeWordLookup);

  const wordEntryIsAlreadySaved = !!savedWordLookups?.find((lookup) =>
    equals(lookup.wordEntry, wordLookup.wordEntry)
  );

  return (
    <section
      className="flex h-14 items-center"
      // stopPropagation prevents selected text from being unselected
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="flex h-full grow basis-1 items-center justify-center"
        onClick={() => void navigator.clipboard.writeText(selectedText)}
      >
        <span className="sr-only">Copy selected text</span>
        <ContentCopyIcon />
      </button>

      <button className="flex h-full grow basis-1 items-center justify-center">
        <span className="sr-only">Listen to pronunciation</span>
        <VolumeUpIcon />
      </button>

      <button className="flex h-full grow basis-1 items-center justify-center">
        <span className="sr-only">Read text out loud</span>
        <CampaignIcon />
      </button>

      {wordEntryIsAlreadySaved ? (
        <button
          className="flex h-full grow basis-1 items-center justify-center"
          onClick={() => removeWordLookup(wordLookup)}
        >
          <span className="sr-only">Remove saved word</span>
          <AddBoxIcon />
        </button>
      ) : (
        <button
          className="flex h-full grow basis-1 items-center justify-center"
          onClick={() => saveWordLookup(wordLookup)}
        >
          <span className="sr-only">Save word</span>
          <AddIcon />
        </button>
      )}

      <button className="flex h-full grow basis-1 items-center justify-center">
        <span className="sr-only">Search word</span>
        <SearchIcon />
      </button>

      <button className="flex h-full grow basis-1 items-center justify-center">
        <span className="sr-only">View word definition</span>
        <OpenInNewIcon />
      </button>
    </section>
  );
};

export const ClipReaderHeader = ({
  wordLookup,
  selectedText,
  openSideMenu,
  setClipText,
}: {
  wordLookup: WordLookup | undefined;
  selectedText: string;
  openSideMenu: () => void;
  setClipText: Dispatch<SetStateAction<string>>;
}) => {
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );

  return (
    <header
      className={classNames(
        "flex w-full justify-center text-white",
        isDarkMode ? "bg-black" : "bg-blue-600"
      )}
    >
      <div className="w-full max-w-2xl">
        {selectedText && wordLookup ? (
          <SelectedTextMenu
            selectedText={selectedText}
            wordLookup={wordLookup}
          />
        ) : (
          <UnselectedTextMenu
            openSideMenu={openSideMenu}
            setClipText={setClipText}
          />
        )}
      </div>
    </header>
  );
};
