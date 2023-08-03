import { FuriganaIcon } from "~/icons/FuriganaIcon";
import { MoonIcon } from "~/icons/MoonIcon";
import { SmallCameraIcon } from "~/icons/SmallCameraIcon";
import { SmallCartIcon } from "~/icons/SmallCartIcon";
import { SmallClipboardIcon } from "~/icons/SmallClipboardIcon";
import { SmallHistoryIcon } from "~/icons/SmallHistoryIcon";
import { SmallImageIcon } from "~/icons/SmallImageIcon";
import { SmallRegisterIcon } from "~/icons/SmallRegisterIcon";
import { SmallSearchIcon } from "~/icons/SmallSearchIcon";
import { SmallStackIcon } from "~/icons/SmallStackIcon";
import { classNames } from "~/utils/classNames";

const sideMenuOptionGroups = [
  {
    label: "Dictionary",
    options: [
      { label: "Dictionary", icon: <SmallSearchIcon /> },
      { label: "History", icon: <SmallHistoryIcon /> },
    ],
  },
  {
    label: "Add-ons",
    options: [
      { label: "Add-ons", icon: <SmallCartIcon /> },
      { label: "Registration", icon: <SmallRegisterIcon /> },
    ],
  },
  {
    label: "OCR",
    options: [
      { label: "Live OCR", icon: <SmallCameraIcon /> },
      { label: "Still OCR", icon: <SmallImageIcon /> },
    ],
  },
  {
    label: "Reader",
    options: [
      { label: "Clip Reader", icon: <SmallClipboardIcon /> },
      { label: "Screen Reader/OCR", icon: <SmallStackIcon /> },
    ],
  },
  {
    label: "Flashcards",
    options: [{ label: "Open AnkiDroid", icon: <></> }],
  },
  {
    label: "Settings",
    options: [{ label: "Settings", icon: <></> }],
  },
  {
    label: "Support",
    options: [
      { label: "Help", icon: <></> },
      { label: "Contact Us", icon: <></> },
    ],
  },
];

export const SideMenu = ({
  isSideMenuOpen,
  closeSideMenu,
}: {
  isSideMenuOpen: boolean;
  closeSideMenu: () => void;
}) => {
  return (
    <>
      <div
        className={classNames(
          "absolute inset-0 bg-black opacity-40",
          !isSideMenuOpen && "hidden"
        )}
        onClick={closeSideMenu}
      ></div>

      <aside
        className={classNames(
          "absolute bottom-0 top-0 bg-black text-white transition-all duration-500",
          isSideMenuOpen ? "left-0" : "-left-full"
        )}
        aria-hidden={!isSideMenuOpen}
      >
        <section className="flex">
          <button className="flex grow basis-1 items-center justify-center py-4">
            <span className="sr-only">Dark mode</span>
            <MoonIcon />
          </button>

          <button className="flex grow basis-1 items-center justify-center py-4">
            <span className="sr-only">Furigana mode</span>
            <FuriganaIcon />
          </button>
        </section>

        {sideMenuOptionGroups.map(({ label, options }) => {
          return (
            <section key={label}>
              <h2 className="bg-slate-900 px-4 py-2 text-xs uppercase">
                {label}
              </h2>
              <ul>
                {options.map((option) => {
                  const key = `${label}-${option.label}`;
                  return (
                    <li key={key}>
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-left text-lg text-white">
                        {option.icon} {option.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </aside>
    </>
  );
};
