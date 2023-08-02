import { BrushIcon } from "~/icons/BrushIcon";
import { CameraIcon } from "~/icons/CameraIcon";
import { CloseIcon } from "~/icons/CloseIcon";
import { KeyboardIcon } from "~/icons/KeyboardIcon";
import { MenuIcon } from "~/icons/MenuIcon";
import { MicrophoneIcon } from "~/icons/MicrophoneIcon";
import { PuzzlePieceIcon } from "~/icons/PuzzlePieceIcon";

const headerBottomTabs = [
  { id: 1, label: "Search by drawing characters", icon: <BrushIcon /> },
  { id: 2, label: "Search by character primitives", icon: <PuzzlePieceIcon /> },
  { id: 3, label: "Search by keyboard", icon: <KeyboardIcon /> },
  { id: 4, label: "Search by talking", icon: <MicrophoneIcon /> },
  { id: 5, label: "Search by picture", icon: <CameraIcon /> },
];

export const Header = () => {
  return (
    <header>
      <section className="flex h-14 items-center">
        <button className="h-full px-6">
          <span className="sr-only">Open menu</span>
          <MenuIcon />
        </button>

        <div className="relative flex grow">
          <input className="grow bg-slate-800 px-1 py-2" />
          <button className="absolute bottom-0 right-0 top-0 px-1 text-slate-300">
            <span className="sr-only">Clear input</span>
            <CloseIcon />
          </button>
        </div>

        <button className="flex h-full items-center justify-center px-6">
          <span className="flex h-6 w-6 items-center justify-center rounded border-2 border-white text-lg">
            <span className="sr-only">English search</span>
            <span aria-hidden>E</span>
          </span>
        </button>
      </section>

      <section className="flex h-14 items-center">
        {headerBottomTabs.map(({ id, label, icon }) => {
          return (
            <button
              key={id}
              className="flex h-full grow items-center justify-center"
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
