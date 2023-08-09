import { describe, expect, it } from "vitest";
import { katakanaToHiragana } from "~/dictionary/katakanaToHiragana";

describe("katakanaToHiragana", () => {
  it("returns hiragana for `プログラム`", () => {
    const katakana = "プログラム";

    const hiragana = katakanaToHiragana(katakana);

    expect(hiragana).toEqual("ぷろぐらむ");
  });
});
