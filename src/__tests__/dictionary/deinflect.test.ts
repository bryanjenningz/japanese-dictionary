import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, expect, it } from "vitest";
import { deinflect, parseDeinflectionData } from "../../dictionary/deinflect";

const buffer = readFileSync(resolve("public/dictionaries/deinflect.txt"))
  .toString()
  .split("\n");

const { difReasons, difRules } = parseDeinflectionData(buffer);

describe("deinflect", () => {
  it("deinflects `書きましょう`", () => {
    const word = "書きましょう";

    const deinflections = deinflect(difReasons, difRules, word);

    expect(deinflections).toEqual([
      {
        reason: "",
        type: 255,
        word: "書きましょう",
      },
      {
        reason: "polite volitional",
        type: 2,
        word: "書く",
      },
      {
        reason: "polite volitional",
        type: 8,
        word: "書くる",
      },
      {
        reason: "polite volitional",
        type: 9,
        word: "書きる",
      },
    ]);
  });
});
