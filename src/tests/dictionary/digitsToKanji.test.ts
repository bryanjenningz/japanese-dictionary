import { describe, expect, it } from "vitest";
import { digitsToKanji } from "~/dictionary/digitsToKanji";

describe("digitsToKanji", () => {
  it("Returns the kanji version of `4つ`", () => {
    const word = "4つ";

    const result = digitsToKanji(word);

    expect(result).toEqual("四つ");
  });

  it("Returns the kanji version of `11日`", () => {
    const word = "11日";

    const result = digitsToKanji(word);

    expect(result).toEqual("一一日");
  });
});
