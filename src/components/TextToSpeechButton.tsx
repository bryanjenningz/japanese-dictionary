import { type ButtonHTMLAttributes } from "react";
import { VolumeUp } from "~/icons/VolumeUp";
import { textToSpeech } from "~/utils/textToSpeech";

export const TextToSpeechButton = ({
  word,
  ...buttonAttributes
}: { word: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button {...buttonAttributes} onClick={() => textToSpeech(word)}>
      <span className="sr-only">Play pronunciation</span>
      <VolumeUp />
    </button>
  );
};
