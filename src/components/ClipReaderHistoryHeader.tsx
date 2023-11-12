import { useRouter } from "next/router";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";
import { ArrowBackIcon } from "~/icons/ArrowBackIcon";

export const ClipReaderHistoryHeader = ({
  openModal,
}: {
  openModal: () => void;
}) => {
  const router = useRouter();

  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;

  return (
    <header
      className={classNames(
        "fixed left-0 right-0 top-0 flex flex-col items-center text-white shadow",
        isDarkMode ? "bg-black" : "bg-blue-600",
      )}
    >
      <div className="w-full max-w-2xl">
        <section className="flex h-14 items-center">
          <button className="h-full px-4" onClick={() => router.back()}>
            <span className="sr-only">Go back</span>
            <ArrowBackIcon />
          </button>

          <h1 className="grow text-lg font-semibold">Clipboard History</h1>

          <button className="h-full px-4 text-sm uppercase" onClick={openModal}>
            Clear all
          </button>
        </section>
      </div>
    </header>
  );
};
