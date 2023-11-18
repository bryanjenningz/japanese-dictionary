import { useState } from "react";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { SimpleHeader } from "~/components/SimpleHeader";

type Setting =
  | {
      type: "CHECKBOX";
      name: string;
      value: boolean;
      toggle: () => void;
    }
  | {
      type: "BUTTON";
      name: string;
      description: string;
      click: () => void;
    };

export default function Settings() {
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;
  const setIsDarkMode = useDarkModeStore((x) => x.setIsDarkMode);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isPageCacheCleared, setIsPageCacheCleared] = useState(false);

  const settings: Setting[] = [
    {
      type: "CHECKBOX",
      name: "Dark mode",
      value: !!isDarkMode,
      toggle: () => setIsDarkMode(!isDarkMode),
    },
    {
      type: "BUTTON",
      name: "Clear cached pages",
      description: "Pages will get re-cached as you visit them",
      click: () => {
        void caches
          .keys()
          .then((keys) => void keys.forEach((key) => void caches.delete(key)));
        setIsPageCacheCleared(true);
        setTimeout(() => setIsPageCacheCleared(false), 3000);
      },
    },
  ];

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black",
      )}
    >
      <SimpleHeader openSideMenu={() => setIsSideMenuOpen(true)} />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
      />

      <ul className="w-full max-w-2xl">
        {settings.map((setting): JSX.Element => {
          switch (setting.type) {
            case "CHECKBOX": {
              const { name, toggle, value } = setting;
              return (
                <li key={name}>
                  <label className="flex justify-between p-4 text-lg">
                    <span className="flex grow flex-col">
                      <span>{name}</span>
                      <span
                        className={classNames(
                          "text-sm",
                          isDarkMode ? "text-slate-400" : "text-slate-500",
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
            }

            case "BUTTON": {
              const { name, description, click } = setting;
              return (
                <li key={name}>
                  <button
                    className="flex w-full flex-col p-4 text-left text-lg"
                    onClick={click}
                  >
                    <span>{name}</span>
                    <span
                      className={classNames(
                        "text-sm",
                        isDarkMode ? "text-slate-400" : "text-slate-500",
                      )}
                    >
                      {description}
                    </span>
                  </button>
                </li>
              );
            }
          }
        })}
      </ul>

      {isPageCacheCleared && (
        <div
          className={classNames(
            "fixed bottom-4 left-4 right-4 p-4 text-center text-lg text-white shadow",
            isDarkMode ? "bg-slate-800" : "bg-blue-600",
          )}
        >
          Cached pages cleared
        </div>
      )}
    </main>
  );
}
