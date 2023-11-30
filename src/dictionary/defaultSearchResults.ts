import { type WordSearchResult, type WordEntry } from "~/dictionary/search";

export const DEFAULT_SEARCH_RESULTS_FIRST_WORD_ENTRY: WordEntry = {
  word: "ローマ字",
  pronunciation: "ローマじ",
  definitions: [
    "(n) (1) Latin alphabet",
    "Roman alphabet",
    "(n) (2) romaji",
    "romanized Japanese",
    "system of transliterating Japanese into the Latin alphabet",
    "(P)",
  ],
  pitchAccents: [3, 0],
};

export const DEFAULT_SEARCH_RESULTS: WordSearchResult = {
  selectedTextLength: 7,
  wordEntries: [
    DEFAULT_SEARCH_RESULTS_FIRST_WORD_ENTRY,
    {
      word: "羅馬字",
      pronunciation: "ローマじ",
      definitions: [
        "(ateji) (rK) (n) (1) Latin alphabet",
        "Roman alphabet",
        "(n) (2) romaji",
        "romanized Japanese",
        "system of transliterating Japanese into the Latin alphabet",
      ],
      pitchAccents: [],
    },
    {
      word: "羅馬",
      pronunciation: "ローマ",
      definitions: ["(ateji) (rK) (n) (uk) Rome"],
      pitchAccents: [],
    },
    {
      word: "ＲＡＷ",
      pronunciation: "ロー",
      definitions: ["(n) raw (image format)", "RAW"],
      pitchAccents: [],
    },
    {
      word: "ろー",
      pronunciation: "",
      definitions: [
        "(n) (1) (abbr) six",
        "(exp) (2) (col) (abbr) right?",
        "isn't it?",
      ],
      pitchAccents: [],
    },
    {
      word: "ロー",
      pronunciation: "",
      definitions: ["(adj-f) (1) low", "(n) (2) low gear", "(P)"],
      pitchAccents: [1],
    },
    {
      word: "ロー",
      pronunciation: "",
      definitions: ["(n) law"],
      pitchAccents: [1],
    },
    {
      word: "ロー",
      pronunciation: "",
      definitions: ["(n) row"],
      pitchAccents: [1],
    },
    {
      word: "Ρ",
      pronunciation: "ロー",
      definitions: ["(n) rho"],
      pitchAccents: [],
    },
    {
      word: "ρ",
      pronunciation: "ロー",
      definitions: ["(n) rho"],
      pitchAccents: [1],
    },
    {
      word: "ろ",
      pronunciation: "",
      definitions: [
        "(n) (1) (abbr) six",
        "(exp) (2) (col) (abbr) right?",
        "isn't it?",
      ],
      pitchAccents: [],
    },
    {
      word: "ロ",
      pronunciation: "",
      definitions: [
        "(n) (1) 2nd (in a sequence denoted by the iroha system)",
        "(n) (2) (music) B (note)",
      ],
      pitchAccents: [1],
    },
    {
      word: "ロ",
      pronunciation: "",
      definitions: ["(n) (abbr) Russia"],
      pitchAccents: [1],
    },
    {
      word: "魯",
      pronunciation: "ろ",
      definitions: [
        "(n) Lu (Chinese vassal state existing during the Spring and Autumn period)",
      ],
      pitchAccents: [],
    },
    {
      word: "魯",
      pronunciation: "ろ",
      definitions: ["(oK) (n) (abbr) Russia"],
      pitchAccents: [],
    },
    {
      word: "櫓",
      pronunciation: "ろ",
      definitions: [
        "(n) Japanese scull (oar attached to the rear of the boat by a traditional peg-in-hole oarlock)",
      ],
      pitchAccents: [0],
    },
    {
      word: "炉",
      pronunciation: "ろ",
      definitions: ["(n) (1) hearth", "fireplace", "(n) (2) furnace", "kiln"],
      pitchAccents: [0],
    },
    {
      word: "露",
      pronunciation: "ろ",
      definitions: ["(n) (abbr) Russia"],
      pitchAccents: [1],
    },
    {
      word: "廬",
      pronunciation: "ろ",
      definitions: ["(n) (rare) small house", "thatched hut"],
      pitchAccents: [],
    },
    {
      word: "絽",
      pronunciation: "ろ",
      definitions: [
        "(n,adj-no) silk gauze (esp. used in light clothing for high summer)",
      ],
      pitchAccents: [0],
    },
    {
      word: "艪",
      pronunciation: "ろ",
      definitions: [
        "(n) Japanese scull (oar attached to the rear of the boat by a traditional peg-in-hole oarlock)",
      ],
      pitchAccents: [0],
    },
    {
      word: "艫",
      pronunciation: "ろ",
      definitions: [
        "(n) (1) stern (of a ship)",
        "(n) (2) bow (of a ship)",
        "prow",
      ],
      pitchAccents: [],
    },
    {
      word: "驢",
      pronunciation: "ろ",
      definitions: ["(n) donkey"],
      pitchAccents: [1],
    },
  ],
};
