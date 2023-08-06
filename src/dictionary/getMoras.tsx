export const getMoras = (pronunciation: string): string[] => {
  const smallKana = [
    // Small hiragana
    "ゃ",
    "ゅ",
    "ょ",
    // Small special hiragana
    "ぅ",
    "ぃ",
    // Small katakana
    "ャ",
    "ュ",
    "ョ",
    // Small special katakana
    "ァ",
    "ィ",
    "ゥ",
    "ェ",
    "ォ",
  ];
  const moras = [];
  let currentMora = "";
  for (const char of pronunciation) {
    if (!currentMora || smallKana.includes(char)) {
      currentMora += char;
    } else {
      moras.push(currentMora);
      currentMora = char;
    }
  }
  moras.push(currentMora);
  return moras;
};
