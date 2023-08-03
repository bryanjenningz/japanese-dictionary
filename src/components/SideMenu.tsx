import { classNames } from "~/utils/classNames";

const sideMenuOptionGroups = [
  {
    label: "Dictionary",
    options: [
      { label: "Dictionary", icon: <></> },
      { label: "History", icon: <></> },
    ],
  },
  {
    label: "Add-ons",
    options: [
      { label: "Add-ons", icon: <></> },
      { label: "Registration", icon: <></> },
    ],
  },
  {
    label: "OCR",
    options: [
      { label: "Live OCR", icon: <></> },
      { label: "Still OCR", icon: <></> },
    ],
  },
  {
    label: "Reader",
    options: [
      { label: "Clip Reader", icon: <></> },
      { label: "Screen Reader/OCR", icon: <></> },
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
    <aside
      className={classNames(
        "absolute bottom-0 top-0 bg-black text-white transition-all duration-500",
        isSideMenuOpen ? "left-0" : "-left-full"
      )}
      onClick={closeSideMenu}
    >
      <section className="flex">
        <button>
          <span className="sr-only">Dark mode</span>
        </button>

        <button>
          <span className="sr-only">Furigana mode</span>
        </button>
      </section>

      {sideMenuOptionGroups.map(({ label, options }) => {
        return (
          <section key={label}>
            <h2 className="bg-slate-900 px-4 py-1 text-xs uppercase">
              {label}
            </h2>
            <ul>
              {options.map((option) => {
                const key = `${label}-${option.label}`;
                return (
                  <li key={key}>
                    <button className="w-full px-4 py-2 text-left text-lg">
                      {option.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </aside>
  );
};
