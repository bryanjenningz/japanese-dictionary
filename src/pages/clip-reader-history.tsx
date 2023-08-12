import { useState } from "react";
import { ClipReaderHistoryHeader } from "~/components/ClipReaderHistoryHeader";
import { Modal } from "~/components/Modal";
import {
  type ClipReaderTextState,
  useClipReaderTextStore,
} from "~/stores/clipReaderTextStore";
import { type DarkModeState, useDarkModeStore } from "~/stores/darkModeStore";
import { useStore } from "~/stores/useStore";
import { classNames } from "~/utils/classNames";
import { formatTime } from "~/utils/formatTime";

export default function ClipReaderHistory() {
  const isDarkMode = useStore<DarkModeState, DarkModeState["isDarkMode"]>(
    useDarkModeStore,
    (x) => x.isDarkMode
  );

  const clipReaderTexts = useStore<
    ClipReaderTextState,
    ClipReaderTextState["clipReaderTexts"]
  >(useClipReaderTextStore, (x) => x.clipReaderTexts);

  const clearAllClipReaderTexts = useClipReaderTextStore(
    (x) => x.clearAllClipReaderTexts
  );

  const [isModalShown, setIsModalShown] = useState(false);

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <ClipReaderHistoryHeader openModal={() => setIsModalShown(true)} />

      <div className="w-full max-w-2xl">
        <ul className="pt-14">
          {clipReaderTexts?.map(({ text, time }) => {
            return (
              <li
                key={time}
                className={classNames(
                  "line-clamp-4 flex flex-col gap-1 border-b p-4 last:border-b-0",
                  isDarkMode ? "border-slate-700" : "border-slate-300"
                )}
              >
                <time className={"text-sm font-semibold text-blue-500"}>
                  {formatTime(time)}
                </time>
                <p>{text}</p>
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
