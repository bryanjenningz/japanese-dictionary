type TimeGroup<T> = { values: T[]; minTime: number; maxTime: number };

export const groupByTime = <T>(
  values: T[],
  toTime: (value: T) => number,
  maxTimeDiff: number
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
