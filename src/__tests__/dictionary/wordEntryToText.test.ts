import { describe, expect, it } from "vitest";
import { type WordEntry } from "../../dictionary/search";
import { wordEntryToText } from "../../dictionary/wordEntryToText";

const wordEntry: WordEntry = {
  word: "<word>",
  pronunciation: "ABCD",
  definitions: ["definition-1", "definition-2"],
  pitchAccents: [0, 1, 2, 3, 4],
};

describe("wordEntryToText", () => {
  it("Returns a text version of a word entry", () => {
    const text = wordEntryToText(wordEntry);

    expect(text).toEqual(`<word>
A↑BCD, A↓BCD, A↑B↓CD, A↑BC↓D, A↑BCD↓
definition-1, definition-2`);
  });

  it("Returns a text version of a word entry without pitch accents", () => {
    const wordEntryWithoutPitchAccents = { ...wordEntry, pitchAccents: [] };

    const text = wordEntryToText(wordEntryWithoutPitchAccents);

    expect(text).toEqual(`<word>
ABCD
definition-1, definition-2`);
  });

  it("Returns a text version of `情`", () => {
    const wordEntry: WordEntry = {
      word: "情",
      pronunciation: "じょう",
      definitions: [
        "(n) (1) feelings",
        "emotion",
        "sentiment",
        "(n) (2) compassion",
        "sympathy",
        "(n) (3) passion",
        "affection",
        "love",
        "(n) (4) the way things really are",
        "the actual situation",
        "(P)",
      ],
      pitchAccents: [0],
    };

    const text = wordEntryToText(wordEntry);

    expect(text).toEqual(`情
じょ↑う
(n) (1) feelings, emotion, sentiment, (n) (2) compassion, sympathy, (n) (3) passion, affection, love, (n) (4) the way things really are, the actual situation, (P)`);
  });

  it("Returns a text version of `インストール`", () => {
    const wordEntry: WordEntry = {
      word: "インストール",
      pronunciation: "",
      definitions: ["(n,vs,vt) (comp) installation (esp. software)"],
      pitchAccents: [4],
    };

    const text = wordEntryToText(wordEntry);

    expect(text).toEqual(`インストール
イ↑ンスト↓ール
(n,vs,vt) (comp) installation (esp. software)`);
  });
});
