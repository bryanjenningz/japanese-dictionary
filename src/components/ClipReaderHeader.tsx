import { HistoryIcon } from "~/icons/HistoryIcon";
import { MenuIcon } from "~/icons/MenuIcon";
import { RefreshIcon } from "~/icons/RefreshIcon";
import { classNames } from "~/utils/classNames";

export const ClipReaderHeader = ({
  openSideMenu,
  isDarkMode,
}: {
  openSideMenu: () => void;
  isDarkMode: boolean;
}) => {
  return (
    <header
      className={classNames(
        "flex w-full justify-center text-white",
        isDarkMode ? "bg-black" : "bg-blue-600"
      )}
    >
      <div className="w-full max-w-2xl">
        <section className="flex h-14 items-center">
          <button className="h-full px-6" onClick={openSideMenu}>
            <span className="sr-only">Open side menu</span>
            <MenuIcon />
          </button>

          <div className="relative flex grow">
            <h1 className="text-lg font-semibold">Pleco</h1>
          </div>

          <button className="flex h-full items-center justify-center px-4">
            <span className="sr-only">Read text from clipboard</span>
            <RefreshIcon />
          </button>

          <button className="flex h-full items-center justify-center px-4">
            <span className="sr-only">Clipboard history</span>
            <HistoryIcon />
          </button>
        </section>
      </div>
    </header>
  );
};
