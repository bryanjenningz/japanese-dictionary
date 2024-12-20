import { MenuIcon } from "~/icons/MenuIcon";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";

export const SimpleHeader = ({
  title,
  openSideMenu,
}: {
  title: string;
  openSideMenu: () => void;
}) => {
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;

  return (
    <header
      className={classNames(
        "flex w-full justify-center text-white shadow",
        isDarkMode ? "bg-black" : "bg-blue-600",
      )}
    >
      <div className="w-full max-w-2xl">
        <section className="flex h-14 items-center">
          <button
            id="side-menu-button"
            className="h-full px-4"
            onClick={openSideMenu}
          >
            <span className="sr-only">Open side menu</span>
            <MenuIcon />
          </button>

          <div className="relative flex grow">
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
        </section>
      </div>
    </header>
  );
};
