import { type Dispatch, type SetStateAction } from "react";
import { AddIcon } from "~/icons/AddIcon";
import { CampaignIcon } from "~/icons/CampaignIcon";
import { ContentCopyIcon } from "~/icons/ContentCopyIcon";
import { HistoryIcon } from "~/icons/HistoryIcon";
import { MenuIcon } from "~/icons/MenuIcon";
import { OpenInNewIcon } from "~/icons/OpenInNewIcon";
import { RefreshIcon } from "~/icons/RefreshIcon";
import { SearchIcon } from "~/icons/SearchIcon";
import { VolumeUpIcon } from "~/icons/VolumeUpIcon";
import { classNames } from "~/utils/classNames";

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

const SelectedTextMenu = ({ selectedText }: { selectedText: string }) => {
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

      <button className="flex h-full grow basis-1 items-center justify-center">
        <span className="sr-only">Add word to saved words</span>
        <AddIcon />
      </button>

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
  isDarkMode,
  selectedText,
  openSideMenu,
  setClipText,
}: {
  isDarkMode: boolean;
  selectedText: string;
  openSideMenu: () => void;
  setClipText: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <header
      className={classNames(
        "flex w-full justify-center text-white",
        isDarkMode ? "bg-black" : "bg-blue-600"
      )}
    >
      <div className="w-full max-w-2xl">
        {selectedText ? (
          <SelectedTextMenu selectedText={selectedText} />
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
