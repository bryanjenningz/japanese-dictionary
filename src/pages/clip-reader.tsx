import { useState } from "react";
import { ClipReaderHeader } from "~/components/ClipReaderHeader";
import { SideMenu } from "~/components/SideMenu";
import { classNames } from "~/utils/classNames";

export default function Reader() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [clipText, setClipText] = useState("");

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
        setClipText={setClipText}
      />

      <SideMenu
        isSideMenuOpen={isSideMenuOpen}
        closeSideMenu={() => setIsSideMenuOpen(false)}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      <div className="flex w-full max-w-2xl flex-col">
        <p className="p-4 text-lg">{clipText}</p>
      </div>
    </main>
  );
}
