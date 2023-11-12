import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";

export const Modal = ({
  isShown,
  onClose,
  children,
}: {
  isShown: boolean;
  onClose: () => void;
  children: JSX.Element;
}) => {
  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;

  return (
    <>
      <div
        className={classNames(
          "fixed inset-0 z-10 bg-black transition-opacity",
          isShown ? "opacity-40" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isShown}
      ></div>

      <div
        className={classNames(
          "fixed inset-0 z-20 flex items-center justify-center p-4",
          isShown ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isShown}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          onClose();
        }}
      >
        <div
          className={classNames(
            "max-h-[calc(100vh-40px)] max-w-2xl p-4 transition-all",
            isDarkMode ? "bg-slate-700 text-white" : "bg-white text-black",
            isShown ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};
