import {
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { classNames } from "~/utils/classNames";

export const SelectableReadingText = ({
  setSelectedTextIndex,
  selectedTextElement,
  readingText,
  selectedTextIndex,
  selectedTextLength,
}: {
  setSelectedTextIndex: Dispatch<SetStateAction<number | null>>;
  selectedTextElement: MutableRefObject<HTMLButtonElement | null>;
  readingText: string;
  selectedTextIndex: number | null;
  selectedTextLength: number;
}) => {
  const readingTextChars = useMemo(() => readingText.split(""), [readingText]);

  const paragraphRef = useRef<null | HTMLParagraphElement>(null);

  useEffect(() => {
    const closePopupIfClickIsOutsideParagraph = (e: MouseEvent) => {
      if (!paragraphRef.current) return;
      if (!selectedTextElement.current) return;
      if (paragraphRef.current.contains(e.target as Node)) return;
      setSelectedTextIndex(null);
      selectedTextElement.current = null;
    };

    window.addEventListener("click", closePopupIfClickIsOutsideParagraph);

    return () => {
      window.removeEventListener("click", closePopupIfClickIsOutsideParagraph);
    };
  }, [selectedTextElement, setSelectedTextIndex]);

  return (
    <p
      id="clip-reader-text"
      className="grow p-4 pb-48 text-2xl"
      ref={paragraphRef}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setSelectedTextIndex(null);
        selectedTextElement.current = null;
      }}
    >
      {readingTextChars.map((char, i) => {
        const key = `${char}-${i}`;

        if (char === `\n`) {
          return <br key={key} />;
        }

        return (
          <button
            key={key}
            onClick={(e) => {
              if (selectedTextIndex !== null) {
                setSelectedTextIndex(null);
                selectedTextElement.current = null;
                return;
              }
              setSelectedTextIndex(i);
              selectedTextElement.current = e.target as HTMLButtonElement;
            }}
            className={classNames(
              selectedTextIndex !== null &&
                selectedTextIndex <= i &&
                i < selectedTextIndex + selectedTextLength &&
                "bg-blue-600 text-white",
            )}
          >
            {char}
          </button>
        );
      })}
    </p>
  );
};
