import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Dynamic } from "~/components/Dynamic";
import Home from "~/pages/index";
import Word from "~/pages/word";
import NewFlashcardTest from "~/pages/new-flashcard-test";
import ClipReader from "~/pages/clip-reader";
import { createWordLink } from "~/utils/createWordLink";
import { useClipReaderTextStore } from "~/stores/clipReaderTextStore";

const TUTORIAL_BUTTON_WIDTH = 40;

type TutorialStep =
  | { type: "START" }
  | {
      type: "CLICK";
      nodeId: string;
      instructions: string;
      onClick: () => void;
    }
  | { type: "FINISH" };

type TutorialPage = "HOME" | "WORD" | "CLIP_READER" | "FLASHCARD_TEST";

export default function Tutorial() {
  const router = useRouter();
  const [tutorialPage, setTutorialPage] = useState<TutorialPage>("HOME");
  const [tutorialIndex, setTutorialIndex] = useState(0);
  const [tutorialButtonXY, setTutorialButtonXY] = useState<null | {
    x: number;
    y: number;
  }>(null);
  const addClipReaderText = useClipReaderTextStore((x) => x.addClipReaderText);

  const tutorialSteps: TutorialStep[] = useMemo(
    () => [
      { type: "START" },
      {
        type: "CLICK",
        nodeId: "search-input",
        instructions: 'Search for Japanese words like "ro-maji" or "ringo"',
        onClick: function onClick() {
          const element = document.getElementById("search-input");
          if (!element || !(element instanceof HTMLInputElement)) {
            return void requestAnimationFrame(onClick);
          }
          element.value = "ro-maji";
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
        },
      },
      {
        type: "CLICK",
        nodeId: "search-results",
        instructions: "Click on search results to see their definition",
        onClick: function onClick() {
          const element = document.getElementById("search-results");
          if (!element) {
            return void requestAnimationFrame(onClick);
          }
          const firstLink = element.querySelector("a");
          if (!firstLink) {
            return void requestAnimationFrame(onClick);
          }
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
          void router.replace(
            createWordLink({ searchText: "ro-maji", resultIndex: 0 }).replace(
              "word",
              "tutorial",
            ),
          );
          setTutorialPage("WORD");
        },
      },
      {
        type: "CLICK",
        nodeId: "save-flashcard",
        instructions: "Click to save the word as a flashcard to review later",
        onClick: function onClick() {
          const element = document.getElementById("save-flashcard");
          if (!element || !(element instanceof HTMLButtonElement)) {
            return void requestAnimationFrame(onClick);
          }
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
        },
      },
      {
        type: "CLICK",
        nodeId: "back-button",
        instructions: "Click the back button to go back",
        onClick: function onClick() {
          const element = document.getElementById("back-button");
          if (!element || !(element instanceof HTMLButtonElement)) {
            return void requestAnimationFrame(onClick);
          }
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
          setTutorialPage("HOME");
          void router.replace("/tutorial");
        },
      },
      {
        type: "CLICK",
        nodeId: "side-menu-button",
        instructions: "Click on the menu button to see the menu",
        onClick: function onClick() {
          const element = document.getElementById("side-menu-button");
          if (!element || !(element instanceof HTMLButtonElement)) {
            return void requestAnimationFrame(onClick);
          }
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
          element.click();
        },
      },
      {
        type: "CLICK",
        nodeId: "clip-reader-link",
        instructions:
          "Click the clip reader link to read Japanese text from your clipboard",
        onClick: () => {
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
          setTutorialPage("CLIP_READER");
        },
      },
      {
        type: "CLICK",
        nodeId: "clip-reader-paste-button",
        instructions:
          "Click the clip board refresh button to paste Japanese text from your clipboard",
        onClick: function onClick() {
          const tutorialExampleText =
            "今季限りでヤクルトを戦力外となった松本友内野手（２８）が、警察官になるため試験を受けることが１８日、分かった。ＮＰＢでの現役続行は断念し、２０２４年１月に予定されている警視庁の採用試験を受けることを決断した。";
          addClipReaderText({ time: Date.now(), text: tutorialExampleText });
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
        },
      },
      {
        type: "CLICK",
        nodeId: "clip-reader-text",
        instructions: "Click on Japanese text to look it up",
        onClick: function onClick() {
          const element = document.querySelector("#clip-reader-text button");
          if (!element || !(element instanceof HTMLButtonElement)) {
            return void requestAnimationFrame(onClick);
          }
          requestAnimationFrame(() => element.click());
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
        },
      },
      {
        type: "CLICK",
        nodeId: "clip-reader-text",
        instructions:
          "Here you can copy, listen, save, search, and view each word lookup. Click away to hide the lookup panel.",
        onClick: function onClick() {
          const element = document.querySelector("#clip-reader-text button");
          if (!element || !(element instanceof HTMLButtonElement)) {
            return void requestAnimationFrame(onClick);
          }
          element.click();
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
        },
      },
      {
        type: "CLICK",
        nodeId: "side-menu-button",
        instructions: "Click on the menu button to see the menu",
        onClick: function onClick() {
          const element = document.getElementById("side-menu-button");
          if (!element || !(element instanceof HTMLButtonElement)) {
            return void requestAnimationFrame(onClick);
          }
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
          element.click();
        },
      },
      {
        type: "CLICK",
        nodeId: "new-flashcard-test-link",
        instructions:
          "You can start a new flashcard test to test your knowledge of your saved flashcards",
        onClick: () => {
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
          setTutorialPage("FLASHCARD_TEST");
        },
      },
      {
        type: "CLICK",
        nodeId: "side-menu-button",
        instructions:
          "You can start a flashcard test once you have saved flashcards, now click the menu button",
        onClick: function onClick() {
          const element = document.getElementById("side-menu-button");
          if (!element || !(element instanceof HTMLButtonElement)) {
            return void requestAnimationFrame(onClick);
          }
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
          element.click();
        },
      },
      {
        type: "CLICK",
        nodeId: "home-link",
        instructions:
          "Now let's finish the tutorial by clicking on the dictionary link",
        onClick: () => {
          setTutorialIndex((x) => x + 1);
          setTutorialButtonXY(null);
          setTutorialPage("HOME");
        },
      },
      { type: "FINISH" },
    ],
    [router, addClipReaderText],
  );

  const tutorialStep = tutorialSteps[tutorialIndex];

  useEffect(
    function setup() {
      window.scrollTo(0, 0);
      if (!tutorialStep || tutorialStep.type !== "CLICK") return;
      const element = document.getElementById(tutorialStep.nodeId);
      // Wait for hidden elements to appear
      if (!element) return void requestAnimationFrame(setup);
      const { x, y, width } = element.getBoundingClientRect();
      // Wait for off-screen elements like the side-menu to appear
      if (x < 0 || y < 0) return void requestAnimationFrame(setup);
      setTutorialButtonXY({ x: x + width / 2 - TUTORIAL_BUTTON_WIDTH / 2, y });
    },
    [tutorialStep],
  );

  if (!tutorialStep) {
    setTutorialIndex(0);
    setTutorialButtonXY(null);
    return <></>;
  }

  const pageContent = ((): JSX.Element => {
    switch (tutorialPage) {
      case "HOME": {
        return <Home />;
      }
      case "WORD": {
        return <Word />;
      }
      case "CLIP_READER": {
        return <ClipReader />;
      }
      case "FLASHCARD_TEST": {
        return <NewFlashcardTest />;
      }
    }
  })();

  const tutorialContent = ((): JSX.Element => {
    switch (tutorialStep.type) {
      case "CLICK": {
        return (
          <>
            <div className="fixed inset-0 z-50 flex flex-col justify-end gap-4 bg-gradient-to-b from-transparent to-black p-4 text-center text-2xl text-white">
              <p>{tutorialStep.instructions}</p>

              <div className="h-5 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full bg-blue-700"
                  style={{
                    width: `${(tutorialIndex / tutorialSteps.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <button
              className="fixed z-50 animate-ping rounded-full bg-blue-700 text-xs text-white"
              style={
                tutorialButtonXY
                  ? {
                      left: tutorialButtonXY.x,
                      top: tutorialButtonXY.y,
                      width: TUTORIAL_BUTTON_WIDTH,
                      height: TUTORIAL_BUTTON_WIDTH,
                    }
                  : { display: "none" }
              }
              onClick={tutorialStep.onClick}
            >
              Click
            </button>
          </>
        );
      }
      case "START": {
        return (
          <>
            <div className="fixed inset-0 z-50 bg-black opacity-75"></div>
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-4 text-white">
              <p className="text-center text-2xl">{`Welcome to the tutorial. We'll go over how to use this web app to learn Japanese.`}</p>
              <button
                className="rounded-full bg-blue-700 px-4 py-2 text-white"
                onClick={() => {
                  setTutorialIndex((x) => x + 1);
                }}
              >
                Click to start
              </button>
            </div>
          </>
        );
      }
      case "FINISH": {
        return (
          <>
            <div className="fixed inset-0 z-50 bg-black opacity-75"></div>
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 p-4 text-white">
              <p className="text-center text-2xl">{`Congratulations! You finished the tutorial. Now you can start learning Japanese!`}</p>
              <button
                className="rounded-full bg-blue-700 px-4 py-2 text-white"
                onClick={() => {
                  void router.replace("/");
                }}
              >
                Click to finish
              </button>
            </div>
          </>
        );
      }
    }
  })();

  return (
    <Dynamic>
      {pageContent}

      {tutorialContent}
    </Dynamic>
  );
}
