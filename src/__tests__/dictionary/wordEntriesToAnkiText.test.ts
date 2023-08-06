import { describe, expect, it } from "vitest";
import { type WordEntry } from "../../dictionary/search";
import { wordEntriesToAnkiText } from "../../dictionary/wordEntriesToAnkiText";

describe("wordEntriesToAnkiText", () => {
  it("Formats word entries to Anki text", () => {
    const wordEntries: WordEntry[] = [
      {
        word: "最大",
        pronunciation: "さいだい",
        definitions: [
          "(n,adj-no) biggest",
          "greatest",
          "largest",
          "maximum",
          "(P)",
        ],
        pitchAccents: [0],
      },
      {
        word: "インストール",
        pronunciation: "",
        definitions: ["(n,vs,vt) (comp) installation (esp. software)"],
        pitchAccents: [4],
      },
    ];

    const ankiText = wordEntriesToAnkiText(wordEntries);

    expect(ankiText)
      .toEqual(`最大;さ↑いだい;(n,adj-no) biggest, greatest, largest, maximum, (P)
インストール;イ↑ンスト↓ール;(n,vs,vt) (comp) installation (esp. software)`);
  });
});
