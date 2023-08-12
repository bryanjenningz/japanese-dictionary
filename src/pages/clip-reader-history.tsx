import { ClipReaderHistoryHeader } from "~/components/ClipReaderHistoryHeader";
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

  return (
    <main
      className={classNames(
        "flex min-h-screen flex-col items-center",
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <ClipReaderHistoryHeader />

      <div className="w-full max-w-2xl">
        <ul className="pt-10">
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
    </main>
  );
}
