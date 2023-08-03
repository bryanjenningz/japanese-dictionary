import { useState } from "react";
import { Header } from "~/components/Header";
import { EmptySearchResultsMenu } from "~/components/EmptySearchResultsMenu";
import { SideMenu } from "~/components/SideMenu";

export default function Home() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-white">
      <div className="flex w-full max-w-2xl flex-col">
        <Header openSideMenu={() => setIsSideMenuOpen(true)} />

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
