import { describe, expect, it } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";
import { searchWord } from "~/dictionary/search";
import { parseDeinflectionData } from "~/dictionary/deinflect";

const wordDict = readFileSync(
  resolve("./public/dictionaries/word-dict.txt"),
).toString();

const wordDictIndex = readFileSync(
  resolve("./public/dictionaries/word-dict-index.txt"),
).toString();

const pitchData = readFileSync(
  resolve("./public/dictionaries/pitch-accents.txt"),
)
  .toString()
  .split("\n");

const { difReasons, difRules } = parseDeinflectionData(
  readFileSync(resolve("./public/dictionaries/deinflect.txt"))
    .toString()
    .split("\n"),
);

const search = (word: string) =>
  searchWord(
    {
      wordDict,
      wordDictIndex,
      difReasons,
      difRules,
      pitchData,
    },
    word,
  );

describe("searchWord", () => {
  it("Returns word entries for `ru` when you input `Rust`", () => {
    const word = "Rust";

    const result = search(word);

    expect(result).toEqual({
      selectedTextLength: 2,
      wordEntries: [
        {
          definitions: ["(suf) (col) verb-forming suffix"],
          pitchAccents: [],
          pronunciation: "",
          word: "る",
        },
        {
          definitions: [
            "(n) (hist) exile (second most severe of the five ritsuryo punishments)",
          ],
          pitchAccents: [1],
          pronunciation: "る",
          word: "流",
        },
      ],
    });
  });

  it("Returns word entry for `すべる` when you input `すべらない`", () => {
    const word = "すべらない";

    const result = search(word);

    expect(result.wordEntries).toContainEqual({
      definitions: [
        "(v5r,vi) (1) to glide",
        "to slide (e.g. on skis)",
        "to slip",
        "(v5r,vi) (2) to fail (an examination)",
        "to bomb (when telling a joke)",
        "(v5r,vi) (3) to drop",
        "to go down",
        "to come down",
        "to fall (e.g. in status)",
        "(P)",
      ],
      pitchAccents: [2],
      pronunciation: "すべる",
      word: "滑る",
    });
  });

  it("Returns word entry for `すべる` when you input `suberanai`", () => {
    const word = "suberanai";

    const result = search(word);

    expect(result.wordEntries).toContainEqual({
      definitions: [
        "(v5r,vi) (1) to glide",
        "to slide (e.g. on skis)",
        "to slip",
        "(v5r,vi) (2) to fail (an examination)",
        "to bomb (when telling a joke)",
        "(v5r,vi) (3) to drop",
        "to go down",
        "to come down",
        "to fall (e.g. in status)",
        "(P)",
      ],
      pitchAccents: [2],
      pronunciation: "すべる",
      word: "滑る",
    });
  });

  it("Returns a word entry for `結構` when you input `結構難しい話で`", () => {
    const word = "結構難しい話で";

    const result = search(word);

    expect(result).toEqual({
      selectedTextLength: 2,
      wordEntries: [
        {
          definitions: [
            "(adj-na) (1) splendid",
            "nice",
            "wonderful",
            "delightful",
            "lovely",
            "excellent",
            "fine",
            "(adj-na) (2) sufficient",
            "satisfactory",
            "enough",
            "fine",
            "all right",
            "OK",
            "(adj-na) (3) not needing (any more of something)",
            "(already) having enough",
            'fine (as in "I\'m fine")',
            "no, thank you",
            "(adv) (4) rather",
            "quite",
            "fairly",
            "pretty",
            "surprisingly",
            "quite a bit",
            "fairly well",
            "(n) (5) structure",
            "construction",
            "framework",
            "architecture",
            "(P)",
          ],
          pitchAccents: [0, 3, 1],
          pronunciation: "けっこう",
          word: "結構",
        },
      ],
    });
  });
});
