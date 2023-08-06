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

export type Deinflection = {
  word: string;
  type: number;
  reason: string;
};

/**
 * Deinflection rules grouped by their from length. This allows trying all rules
 * of a given length before trying shorter lengths.
 */
export type DeinflectionRuleGroup = {
  fromLength: number;
  rules: DeinflectionRule[];
};

export type DeinflectionRule = {
  /** The conjugated ending which we are deinflecting from. */
  from: string;
  /** The original form we are deinflecting to. */
  to: string;
  /** An int mask representing the types of words this rule applies to. */
  typeMask: number;
  /** An index into the difReason array that describes this inflection. */
  reasonIndex: number;
};

export type DeinflectionData = {
  difReasons: string[];
  difRules: DeinflectionRuleGroup[];
};

export const deinflect = (
  difReasons: string[],
  difRuleGroups: DeinflectionRuleGroup[],
  word: string
): Deinflection[] => {
  const results: Deinflection[] = [{ word, type: 0xff, reason: "" }];
  const wordToResultIndex = { [word]: 0 };

  for (const result of results) {
    const { word, type } = result;

    for (const difRuleGroup of difRuleGroups) {
      if (word.length < difRuleGroup.fromLength) {
        continue;
      }

      const end = word.slice(-difRuleGroup.fromLength);
      for (const rule of difRuleGroup.rules) {
        if ((type & rule.typeMask) === 0 || end !== rule.from) {
          continue;
        }

        const newWord = word.slice(0, word.length - rule.from.length) + rule.to;
        if (newWord.length <= 0) {
          continue;
        }

        const wordResultIndex = wordToResultIndex[newWord];
        const deinflection =
          wordResultIndex !== undefined ? results[wordResultIndex] : undefined;
        if (deinflection) {
          deinflection.type |= rule.typeMask >> 8;
          continue;
        }

        wordToResultIndex[newWord] = results.length;
        const reason = difReasons[rule.reasonIndex];
        if (!reason) {
          break;
        }

        results.push({
          word: newWord,
          type: rule.typeMask >> 8,
          reason: result.reason ? reason + " &lt; " + result.reason : reason,
        });
      }
    }
  }

  return results;
};

export const parseDeinflectionData = (buffer: string[]): DeinflectionData => {
  let currentLength = -1;
  let group: DeinflectionRuleGroup = {
    fromLength: currentLength,
    rules: [],
  };
  const difReasons: string[] = [];
  const difRules: DeinflectionRuleGroup[] = [];

  const lines = buffer.values();
  lines.next(); // skip header

  for (const line of lines) {
    const ruleOrReason = line.split("\t");
    const [fromOrRule, to, typeMask, reasonIndex] = ruleOrReason;

    if (fromOrRule && to && typeMask && reasonIndex) {
      const difRule: DeinflectionRule = {
        from: fromOrRule,
        to,
        typeMask: parseInt(typeMask),
        reasonIndex: parseInt(reasonIndex),
      };

      if (currentLength !== difRule.from.length) {
        currentLength = difRule.from.length;
        group = { fromLength: currentLength, rules: [] };
        difRules.push(group);
      }
      group.rules.push(difRule);
    } else if (fromOrRule) {
      difReasons.push(fromOrRule);
    }
  }

  return { difReasons, difRules };
};

export const loadDeinflectionData = async (): Promise<DeinflectionData> => {
  const buffer = (
    await fetch("/dictionaries/deinflect.txt").then((res) => res.text())
  ).split("\n");
  return parseDeinflectionData(buffer);
};
