import { getMoras } from "~/dictionary/getMoras";
import { useBoundStore } from "~/hooks/useBoundStore";
import { classNames } from "~/utils/classNames";

export const Pronunciation = ({
  word,
  pronunciation,
  pitchAccents,
}: {
  word: string;
  pronunciation: string;
  pitchAccents: number[];
}) => {
  const isDarkMode = useBoundStore((x) => x.isDarkMode);

  pronunciation = pronunciation || word;
  const moras = getMoras(pronunciation);
  const fallIndexes = pitchAccents.map((pitchAccent) =>
    pitchAccent === 0 ? Infinity : pitchAccent
  );

  return (
    <div className="flex gap-3">
      {fallIndexes.length > 0 ? (
        fallIndexes.map((fallIndex) => {
          return (
            <div key={`${pronunciation}-${fallIndex}`}>
              {moras.map((mora, i) => {
                return (
                  <div
                    key={`${mora}-${i}`}
                    className={classNames(
                      "inline-block",
                      isDarkMode ? "border-blue-300" : "border-blue-500",
                      ((): string => {
                        if (fallIndex === undefined) {
                          return "";
                        }
                        if (i + 1 === fallIndex) {
                          return "border-r border-t";
                        }
                        if (i >= fallIndex) {
                          return "border-b";
                        }
                        if (i === 0) {
                          return "border-b border-r";
                        }
                        return "border-t";
                      })()
                    )}
                  >
                    {mora}
                  </div>
                );
              })}
            </div>
          );
        })
      ) : (
        <div>{pronunciation}</div>
      )}
    </div>
  );
};
