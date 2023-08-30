import { useRouter } from "next/router";
import { useState } from "react";
import { ClipReaderHistoryHeader } from "~/components/ClipReaderHistoryHeader";
import { Modal } from "~/components/Modal";
import {
  useClipReaderTextStore,
  type ClipReaderText,
} from "~/stores/clipReaderTextStore";
import { useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";
import { formatTime } from "~/utils/formatTime";
import { useLongPress } from "~/utils/useLongPress";

export default function ClipReaderHistory() {
  const router = useRouter();

  const isDarkMode = useStore(useDarkModeStore, (x) => x.isDarkMode) ?? true;

  const clipReaderTexts = useStore(
    useClipReaderTextStore,
    (x) => x.clipReaderTexts
  );
  const setSelectedClipReaderText = useClipReaderTextStore(
    (x) => x.setSelectedClipReaderText
  );
  const removeClipReaderText = useClipReaderTextStore(
    (x) => x.removeClipReaderText
  );
  const clearAllClipReaderTexts = useClipReaderTextStore(
    (x) => x.clearAllClipReaderTexts
  );

  const [isModalShown, setIsModalShown] = useState(false);

  const longPress = useLongPress<ClipReaderText>();

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <ClipReaderHistoryHeader openModal={() => setIsModalShown(true)} />

      {longPress.menu.type === "OPEN" && (
        <div
          className="fixed inset-0 z-10 opacity-0"
          onClick={longPress.closeMenu}
        ></div>
      )}

      <div className="w-full max-w-2xl">
        <ul className="pt-14">
          {clipReaderTexts?.map((clipReaderText) => {
            const { text, time } = clipReaderText;
            return (
              <li
                key={time}
                className={classNames(
                  "relative border-b last:border-b-0",
                  isDarkMode ? "border-slate-700" : "border-slate-300"
                )}
              >
                <button
                  className="relative flex w-full select-none flex-col gap-1 p-4"
                  onTouchStart={() => longPress.onTouchStart(clipReaderText)}
                  onTouchEnd={longPress.onTouchEnd}
                  onMouseDown={() => longPress.onTouchStart(clipReaderText)}
                  onMouseUp={longPress.onTouchEnd}
                  onClick={() => {
                    setSelectedClipReaderText(clipReaderText);
                    void router.back();
                  }}
                >
                  <time className={"text-sm font-semibold text-blue-500"}>
                    {formatTime(time)}
                  </time>
                  <p className="line-clamp-4">{text}</p>
                </button>

                {longPress.menu.type === "OPEN" &&
                  longPress.menu.target === clipReaderText && (
                    <article
                      className={classNames(
                        "absolute left-[calc(50%-100px)] top-[calc(100%-30px)] z-20 flex flex-col shadow-xl",
                        isDarkMode
                          ? "bg-slate-700 text-white"
                          : "bg-white text-black"
                      )}
                    >
                      <button
                        className="px-4 py-3 text-left"
                        onClick={() => {
                          removeClipReaderText(clipReaderText);
                          longPress.closeMenu();
                        }}
                      >
                        Delete from History
                      </button>
                    </article>
                  )}
              </li>
            );
          })}
        </ul>
      </div>

      <Modal isShown={isModalShown} onClose={() => setIsModalShown(false)}>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Clear History</h2>
          <p>{`Are you sure you want to erase your recent clipboard history?`}</p>
          <div
            className={classNames(
              "flex justify-end uppercase",
              isDarkMode ? "text-blue-500" : "text-black"
            )}
          >
            <button className="px-2" onClick={() => setIsModalShown(false)}>
              No
            </button>
            <button
              className="px-2"
              onClick={() => {
                clearAllClipReaderTexts();
                setIsModalShown(false);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
