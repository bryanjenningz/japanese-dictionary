import { describe, expect, it } from "vitest";
import fs from "fs";
import { resolve } from "path";
import { getPitchAccents } from "../../dictionary/getPitchAccents";

const pitchData = fs
  .readFileSync(resolve("./public/dictionaries/pitch-accents.txt"))
  .toString()
  .split("\n");

describe("getPitchAccents", () => {
  it("returns pitch accents for `新しい`", () => {
    const word = "新しい";
    const pronunciation = "あたらしい";

    const pitchAccents = getPitchAccents(pitchData, word, pronunciation);

    expect(pitchAccents).toEqual([4]);
  });

  it("returns pitch accents for `プログラム`", () => {
    const word = "プログラム";
    const pronunciation = "";

    const pitchAccents = getPitchAccents(pitchData, word, pronunciation);

    expect(pitchAccents).toEqual([3]);
  });
});
