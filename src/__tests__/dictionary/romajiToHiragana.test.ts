import { describe, expect, it } from "vitest";
import { romajiToHiragana } from "~/dictionary/romajiToHiragana";

describe("romajiToHiragana", () => {
  it("Returns an empty string if given an empty string", () => {
    expect(romajiToHiragana("")).toEqual("");
  });

  it("Returns `ひらがな` for the string `hiragana`", () => {
    expect(romajiToHiragana("hiragana")).toEqual("ひらがな");
  });

  it("Returns `かたかな` for the string `KATAKANA`", () => {
    expect(romajiToHiragana("KATAKANA")).toEqual("かたかな");
  });

  it("Returns `りゃくしょう` for the string `ryakushou`", () => {
    expect(romajiToHiragana("ryakushou")).toEqual("りゃくしょう");
  });

  it("Returns `かった` for the string `katta`", () => {
    expect(romajiToHiragana("katta")).toEqual("かった");
  });
});
