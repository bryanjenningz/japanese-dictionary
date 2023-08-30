import { useState } from "react";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { SimpleHeader } from "~/components/SimpleHeader";

export default function Settings() {
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;
  const setIsDarkMode = useDarkModeStore((x) => x.setIsDarkMode);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const settings = [
    {
      name: "Dark mode",
      value: !!isDarkMode,
      toggle: () => setIsDarkMode(!isDarkMode),
    },
  ];

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <SimpleHeader openSideMenu={() => setIsSideMenuOpen(true)} />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
      />

      <ul className="w-full max-w-2xl">
        {settings.map(({ name, toggle, value }) => {
          return (
            <li key={name}>
              <label className="flex justify-between p-4 text-lg">
                <span className="flex grow flex-col">
                  <span>{name}</span>
                  <span
                    className={classNames(
                      "text-sm",
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    )}
                  >
                    {value ? "Enabled" : "Disabled"}
                  </span>
                </span>
                <input
                  className="w-5"
                  type="checkbox"
                  checked={value}
                  onChange={toggle}
                />
              </label>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
