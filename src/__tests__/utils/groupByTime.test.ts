import { describe, expect, it } from "vitest";
import { groupByTime } from "~/utils/groupByTime";

describe("groupByTime", () => {
  it("Returns an empty array when an empty array is passed in", () => {
    const result = groupByTime([], (x) => x, 10);

    expect(result).toEqual([]);
  });

  it("Returns values grouped with max time diff of 10", () => {
    const times = [1, 11, 20, 31, 42, 52, 53, 64];
    const maxTimeDiff = 10;

    const result = groupByTime(times, (x) => x, maxTimeDiff);

    expect(result).toEqual([
      {
        maxTime: 20,
        minTime: 1,
        values: [1, 11, 20],
      },
      {
        maxTime: 31,
        minTime: 31,
        values: [31],
      },
      {
        maxTime: 53,
        minTime: 42,
        values: [42, 52, 53],
      },
      {
        maxTime: 64,
        minTime: 64,
        values: [64],
      },
    ]);
  });
});
