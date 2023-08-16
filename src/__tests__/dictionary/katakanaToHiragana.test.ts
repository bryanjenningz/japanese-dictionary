import { describe, expect, it } from "vitest";
import { katakanaToHiragana } from "~/dictionary/katakanaToHiragana";

describe("katakanaToHiragana", () => {
  it("Returns hiragana for `プログラム`", () => {
    const katakana = "プログラム";

    const hiragana = katakanaToHiragana(katakana);

    expect(hiragana).toEqual("ぷろぐらむ");
  });

  it("Returns hiragana for `ローマじ`", () => {
    const katakana = "ローマじ";

    const hiragana = katakanaToHiragana(katakana);

    expect(hiragana).toEqual("ろーまじ");
  });
});
