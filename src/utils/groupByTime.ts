import { useMemo } from "react";

type TimeGroup<T> = { values: T[]; minTime: number; maxTime: number };

const MAX_TIME_DIFF_BETWEEN_GROUP_VALUES = 1000 * 60 * 15; // 15 minutes

export const groupByTime = <T>(
  values: T[],
  toTime: (value: T) => number,
  maxTimeDiff: number,
): TimeGroup<T>[] => {
  const timeGroups: TimeGroup<T>[] = [];
  values = values.slice().sort((a, b) => toTime(a) - toTime(b));
  for (const value of values) {
    const lastTimeGroup = timeGroups[timeGroups.length - 1];
    if (!lastTimeGroup || toTime(value) - lastTimeGroup.maxTime > maxTimeDiff) {
      timeGroups.push({
        values: [value],
        minTime: toTime(value),
        maxTime: toTime(value),
      });
    } else {
      lastTimeGroup.values.push(value);
      lastTimeGroup.maxTime = toTime(value);
    }
  }
  return timeGroups;
};

const reverseTimeGroups = <T>(groups: TimeGroup<T>[]): TimeGroup<T>[] => {
  groups.forEach((group) => group.values.reverse());
  return groups.reverse();
};

export const useTimeGroups = <T extends { time: number }>(
  values: T[] | undefined,
): TimeGroup<T>[] | undefined => {
  return useMemo(
    () =>
      values &&
      reverseTimeGroups(
        groupByTime(values, (x) => x.time, MAX_TIME_DIFF_BETWEEN_GROUP_VALUES),
      ),
    [values],
  );
};
