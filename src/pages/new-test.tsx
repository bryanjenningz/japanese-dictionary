import { useState } from "react";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { SimpleHeader } from "~/components/SimpleHeader";

export default function NewTest() {
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const newTestOptions = [
    {
      heading: "Start",
      buttonContent: <>Begin Test Session</>,
    },
    {
      heading: "Basic Settings",
      buttonContent: (
        <>
          Max # of cards
          <span
            className={classNames(
              isDarkMode ? "text-slate-400" : "text-slate-500"
            )}
          >
            5
          </span>
        </>
      ),
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

      <div className="flex w-full max-w-2xl flex-col gap-3 p-4">
        {newTestOptions.map(({ heading, buttonContent }) => {
          return (
            <article key={heading} className="flex flex-col">
              <h2
                className={classNames(
                  "text-sm",
                  isDarkMode ? "text-blue-500" : "text-blue-600"
                )}
              >
                {heading}
              </h2>
              <button
                className={classNames(
                  "flex flex-col py-3 text-left",
                  isDarkMode ? "text-white" : "text-black"
                )}
              >
                {buttonContent}
              </button>
            </article>
          );
        })}
      </div>
    </main>
  );
}
