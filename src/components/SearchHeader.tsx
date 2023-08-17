import { useRouter } from "next/router";
import { CloseIcon } from "~/icons/CloseIcon";
import { MenuIcon } from "~/icons/MenuIcon";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";

export const SearchHeader = ({
  openSideMenu,
  searchText,
  setSearchText,
}: {
  openSideMenu: () => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
}) => {
  const router = useRouter();
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );

  return (
    <header
      className={classNames(
        "flex w-full justify-center text-white shadow",
        isDarkMode ? "bg-black" : "bg-blue-600"
      )}
    >
      <div className="w-full max-w-2xl">
        <section className="flex h-14 items-center pr-4">
          <button className="h-full px-4" onClick={openSideMenu}>
            <span className="sr-only">Open side menu</span>
            <MenuIcon />
          </button>

          <div className="relative flex grow">
            <input
              className={classNames(
                "grow px-1 py-2",
                isDarkMode ? "bg-slate-800 text-white" : "bg-white text-black"
              )}
              role="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
                const trimmedSearchText = event.target.value.trim();
                void router.replace(
                  trimmedSearchText ? `/?search=${trimmedSearchText}` : "/"
                );
              }}
            />
            <button
              className={classNames(
                "absolute bottom-0 right-0 top-0 px-1",
                isDarkMode ? "text-slate-300" : "text-slate-500"
              )}
              onClick={() => setSearchText("")}
            >
              <span className="sr-only">Clear search text</span>
              <CloseIcon />
            </button>
          </div>
        </section>
      </div>
    </header>
  );
};
