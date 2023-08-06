import { useState } from "react";
import { ClipReaderHeader } from "~/components/ClipReaderHeader";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";

export default function Reader() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <ClipReaderHeader
        openSideMenu={() => setIsSideMenuOpen(true)}
        isDarkMode={isDarkMode}
      />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div className="flex w-full max-w-2xl flex-col"></div>
    </main>
  );
}
