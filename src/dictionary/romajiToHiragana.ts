const HIRAGANA_MAP: Record<string, string> = {
  a: "あ",
  i: "い",
  u: "う",
  e: "え",
  o: "お",

  ka: "か",
  ki: "き",
  ku: "く",
  ke: "け",
  ko: "こ",
  kya: "きゃ",
  kyu: "きゅ",
  kyo: "きょ",

  sa: "さ",
  shi: "し",
  su: "す",
  se: "せ",
  so: "そ",
  sha: "しゃ",
  shu: "しゅ",
  sho: "しょ",

  ta: "た",
  chi: "ち",
  tsu: "つ",
  te: "て",
  to: "と",
  cha: "ちゃ",
  chu: "ちゅ",
  cho: "ちょ",

  na: "な",
  ni: "に",
  nu: "ぬ",
  ne: "ね",
  no: "の",
  nya: "にゃ",
  nyu: "にゅ",
  nyo: "にょ",

  ha: "は",
  hi: "ひ",
  fu: "ふ",
  he: "へ",
  ho: "ほ",
  hya: "ひゃ",
  hyu: "ひゅ",
  hyo: "ひょ",

  ma: "ま",
  mi: "み",
  mu: "む",
  me: "め",
  mo: "も",
  mya: "みゃ",
  myu: "みゅ",
  myo: "みょ",

  ya: "や",
  yu: "ゆ",
  yo: "よ",

  ra: "ら",
  ri: "り",
  ru: "る",
  re: "れ",
  ro: "ろ",
  rya: "りゃ",
  ryu: "りゅ",
  ryo: "りょ",

  wa: "わ",
  wo: "を",

  ga: "が",
  gi: "ぎ",
  gu: "ぐ",
  ge: "げ",
  go: "ご",
  gya: "ぎゃ",
  gyu: "ぎゅ",
  gyo: "ぎょ",

  za: "ざ",
  ji: "じ",
  zu: "ず",
  ze: "ぜ",
  zo: "ぞ",
  ja: "じゃ",
  ju: "じゅ",
  jo: "じょ",

  da: "だ",
  di: "ぢ",
  du: "づ",
  de: "で",
  do: "ど",
  dya: "ぢゃ",
  dyu: "ぢゅ",
  dyo: "ぢょ",

  ba: "ば",
  bi: "び",
  bu: "ぶ",
  be: "べ",
  bo: "ぼ",
  bya: "びゃ",
  byu: "びゅ",
  byo: "びょ",

  pa: "ぱ",
  pi: "ぴ",
  pu: "ぷ",
  pe: "ぺ",
  po: "ぽ",
  pya: "ぴゃ",
  pyu: "ぴゅ",
  pyo: "ぴょ",
  n: "ん",

  "-": "ー",
};

const DOUBLE_CONSONANTS = new Set(
  "bcdfghjklmnprstvwyz".split("").map((ch) => ch + ch)
);

const DOUBLE_CONSONANT_HIRAGANA = "っ";

export const romajiToHiragana = (romaji: string): string => {
  romaji = romaji.toLowerCase();
  let result = "";
  let i = 0;
  while (i < romaji.length) {
    if (romaji[i] === "'") {
      i += 1;
      continue;
    }

    if (DOUBLE_CONSONANTS.has(romaji.slice(i, i + 2))) {
      result += DOUBLE_CONSONANT_HIRAGANA;
      i += 1;
      continue;
    }

    let found = false;
    for (let j = 3; j >= 1; j--) {
      const mora = HIRAGANA_MAP[romaji.slice(i, i + j)];
      if (mora) {
        result += mora;
        i += j;
        found = true;
        break;
      }
    }

    if (!found) {
      result += romaji[i];
      i += 1;
    }
  }
  return result;
};
