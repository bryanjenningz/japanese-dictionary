import { useState } from "react";
import { BrushIcon } from "~/icons/BrushIcon";
import { CameraIcon } from "~/icons/CameraIcon";
import { CloseIcon } from "~/icons/CloseIcon";
import { KeyboardIcon } from "~/icons/KeyboardIcon";
import { MenuIcon } from "~/icons/MenuIcon";
import { MicrophoneIcon } from "~/icons/MicrophoneIcon";
import { PuzzlePieceIcon } from "~/icons/PuzzlePieceIcon";
import { classNames } from "~/utils/classNames";

type SearchLanguage = "English" | "Japanese";

type HeaderTabId = (typeof headerTabs)[number]["id"];

const DEFAULT_HEADER_TAB_ID: HeaderTabId = 3;

const headerTabs = [
  { id: 1, label: "Search by drawing characters", icon: <BrushIcon /> },
  { id: 2, label: "Search by character primitives", icon: <PuzzlePieceIcon /> },
  { id: 3, label: "Search by keyboard", icon: <KeyboardIcon /> },
  { id: 4, label: "Search by talking", icon: <MicrophoneIcon /> },
  { id: 5, label: "Search by picture", icon: <CameraIcon /> },
] as const;

export const Header = ({ openSideMenu }: { openSideMenu: () => void }) => {
  const [searchLanguage, setSearchLanguage] =
    useState<SearchLanguage>("English");

  const [headerTabId, setHeaderTabId] = useState<HeaderTabId>(
    DEFAULT_HEADER_TAB_ID
  );

  return (
    <header>
      <section className="flex h-14 items-center">
        <button className="h-full px-6" onClick={openSideMenu}>
          <span className="sr-only">Open side menu</span>
          <MenuIcon />
        </button>

        <div className="relative flex grow">
          <input className="grow bg-slate-800 px-1 py-2" role="search" />
          <button className="absolute bottom-0 right-0 top-0 px-1 text-slate-300">
            <span className="sr-only">Clear input</span>
            <CloseIcon />
          </button>
        </div>

        <button
          className="flex h-full items-center justify-center px-6"
          onClick={() =>
            setSearchLanguage((searchLanguage) =>
              searchLanguage === "English" ? "Japanese" : "English"
            )
          }
        >
          <span
            className={classNames(
              "flex h-6 w-6 items-center justify-center rounded border-2 border-white text-lg font-bold",
              searchLanguage === "English"
                ? "bg-black text-white"
                : "bg-white text-black"
            )}
          >
            <span className="sr-only">{searchLanguage} search</span>
            <span aria-hidden>{searchLanguage[0]}</span>
          </span>
        </button>
      </section>

      <section className="flex h-14 items-center">
        {headerTabs.map(({ id, label, icon }) => {
          return (
            <button
              key={id}
              className={classNames(
                "flex h-full grow items-center justify-center",
                headerTabId === id && "border-b-2 border-white"
              )}
              onClick={() => setHeaderTabId(id)}
            >
              <span className="sr-only">{label}</span>
              {icon}
            </button>
          );
        })}
      </section>
    </header>
  );
};