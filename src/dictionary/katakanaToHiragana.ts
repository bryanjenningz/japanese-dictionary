/*

  Rikaikun
  Copyright (C) 2010 Erek Speed
  http://code.google.com/p/rikaikun/

  ---

  Originally based on Rikaichan 1.07
  by Jonathan Zarate
  http://www.polarcloud.com/

  ---

  Originally based on RikaiXUL 0.4 by Todd Rudick
  http://www.rikai.com/
  http://rikaixul.mozdev.org/

  ---

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

*/

// Katakana -> hiragana conversion tables
const HALF_WIDTH = [
  0x3092, 0x3041, 0x3043, 0x3045, 0x3047, 0x3049, 0x3083, 0x3085, 0x3087,
  0x3063, 0x30fc, 0x3042, 0x3044, 0x3046, 0x3048, 0x304a, 0x304b, 0x304d,
  0x304f, 0x3051, 0x3053, 0x3055, 0x3057, 0x3059, 0x305b, 0x305d, 0x305f,
  0x3061, 0x3064, 0x3066, 0x3068, 0x306a, 0x306b, 0x306c, 0x306d, 0x306e,
  0x306f, 0x3072, 0x3075, 0x3078, 0x307b, 0x307e, 0x307f, 0x3080, 0x3081,
  0x3082, 0x3084, 0x3086, 0x3088, 0x3089, 0x308a, 0x308b, 0x308c, 0x308d,
  0x308f, 0x3093,
] as const;
const HALF_WIDTH_VOICED = [
  0x30f4, 0xff74, 0xff75, 0x304c, 0x304e, 0x3050, 0x3052, 0x3054, 0x3056,
  0x3058, 0x305a, 0x305c, 0x305e, 0x3060, 0x3062, 0x3065, 0x3067, 0x3069,
  0xff85, 0xff86, 0xff87, 0xff88, 0xff89, 0x3070, 0x3073, 0x3076, 0x3079,
  0x307c,
] as const;
const HALF_WIDTH_SEMIVOICED = [0x3071, 0x3074, 0x3077, 0x307a, 0x307d] as const;

export const katakanaToHiragana = (word: string): string => {
  let prevKatakanaUnicode = 0;
  let hiragana = "";
  // TODO: Figure out how to use realLength
  const realLength = [0];

  for (let i = 0; i < word.length; ++i) {
    const katakanaUnicode = word.charCodeAt(i);
    let hiraganaUnicode = katakanaUnicode;

    // Skip zero-width non-joiner used in Google Docs between every character
    if (hiraganaUnicode === 8204) {
      prevKatakanaUnicode = 0;
      continue;
    }

    const halfWidthUnicode = HALF_WIDTH[katakanaUnicode - 0xff66];
    const halfWidthVoicedUnicode =
      HALF_WIDTH_VOICED[prevKatakanaUnicode - 0xff73];
    const halfWidthSemivoicedUnicode =
      HALF_WIDTH_SEMIVOICED[prevKatakanaUnicode - 0xff8a];

    if (katakanaUnicode >= 0x30a1 && katakanaUnicode <= 0x30f3) {
      // Full-width katakana to hiragana
      hiraganaUnicode -= 0x60;
    } else if (
      katakanaUnicode >= 0xff66 &&
      katakanaUnicode <= 0xff9d &&
      halfWidthUnicode
    ) {
      // Half-width katakana to hiragana
      hiraganaUnicode = halfWidthUnicode;
    } else if (katakanaUnicode === 0xff9e) {
      // Half-width voiced katakana to hiragana
      if (
        prevKatakanaUnicode >= 0xff73 &&
        prevKatakanaUnicode <= 0xff8e &&
        halfWidthVoicedUnicode
      ) {
        hiragana = hiragana.substr(0, hiragana.length - 1);
        hiraganaUnicode = halfWidthVoicedUnicode;
      }
    } else if (katakanaUnicode === 0xff9f) {
      // Half-width semi-voiced katakana to hiragana
      if (
        prevKatakanaUnicode >= 0xff8a &&
        prevKatakanaUnicode <= 0xff8e &&
        halfWidthSemivoicedUnicode
      ) {
        hiragana = hiragana.substr(0, hiragana.length - 1);
        hiraganaUnicode = halfWidthSemivoicedUnicode;
      }
    } else if (katakanaUnicode === 0xff5e) {
      // ignore Japanese tilde "~"
      prevKatakanaUnicode = 0;
      continue;
    }

    hiragana += String.fromCharCode(hiraganaUnicode);
    // Need to keep real length because of the half-width semi/voiced conversion
    realLength[hiragana.length] = i + 1;
    prevKatakanaUnicode = katakanaUnicode;
  }

  return hiragana;
};
