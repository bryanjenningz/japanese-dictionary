export const digitsToKanji = (word: string): string => {
  let result = "";
  for (const char of word) {
    result += isDigit(char) ? digitKanji[char] : char;
  }
  return result;
};

const isDigit = (char: string): char is Digit => {
  return char in digitKanji;
};

type Digit = keyof typeof digitKanji;

const digitKanji = {
  "0": "〇",
  "1": "一",
  "2": "二",
  "3": "三",
  "4": "四",
  "5": "五",
  "6": "六",
  "7": "七",
  "8": "八",
  "9": "九",
} as const;
