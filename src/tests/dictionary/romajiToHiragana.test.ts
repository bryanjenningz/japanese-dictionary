import { describe, expect, it } from "vitest";
import { romajiToHiragana } from "~/dictionary/romajiToHiragana";

describe("romajiToHiragana", () => {
  describe("Strings entirely written in romaji", () => {
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

  describe("Strings with a mix of romaji and hiragana", () => {
    it("Returns `ひらがな` for the string `hiらgaな`", () => {
      expect(romajiToHiragana("hiらgaな")).toEqual("ひらがな");
    });

    it("Returns `りゃくしょう` for the string `りゃkushoう`", () => {
      expect(romajiToHiragana("りゃkushoう")).toEqual("りゃくしょう");
    });
  });

  describe("Strings with special characters in romaji", () => {
    it("Returns `ろーまじ` for the string `ro-maji`", () => {
      expect(romajiToHiragana("ro-maji")).toEqual("ろーまじ");
    });

    it("Returns `はんい` for the string `han'i`", () => {
      expect(romajiToHiragana("han'i")).toEqual("はんい");
    });
  });
});
