import { useState } from "react";
import { Header } from "~/components/Header";
import { EmptySearchResultsMenu } from "~/components/EmptySearchResultsMenu";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";

export default function Home() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div className="flex w-full max-w-2xl flex-col">
        <Header
          openSideMenu={() => setIsSideMenuOpen(true)}
          isDarkMode={isDarkMode}
        />

        <SideMenu
          isSideMenuOpen={isSideMenuOpen}
          closeSideMenu={() => setIsSideMenuOpen(false)}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        <EmptySearchResultsMenu />
      </div>
    </main>
  );
}
