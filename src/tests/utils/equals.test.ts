import { describe, expect, it } from "vitest";
import { equals } from "~/utils/equals";

describe("equals", () => {
  it("Works for null and undefined", () => {
    expect(equals(null, null)).toEqual(true);
    expect(equals(undefined, undefined)).toEqual(true);
    expect(equals(undefined, null)).toEqual(false);
    expect(equals(null, undefined)).toEqual(false);
    expect(equals(null, { a: 1, b: 0, c: { d: 3 } })).toEqual(false);
    expect(equals(undefined, { a: 1, b: 0, c: { d: 3 } })).toEqual(false);
    expect(equals(null, 0)).toEqual(false);
    expect(equals(0, null)).toEqual(false);
    expect(equals(0, undefined)).toEqual(false);
    expect(equals(undefined, "")).toEqual(false);
  });

  it("Works for numbers", () => {
    expect(equals(1, 1)).toEqual(true);
    expect(equals(-0, 0)).toEqual(true);
    expect(equals(0, 0)).toEqual(true);
    expect(equals(1.23, 1.23)).toEqual(true);
    expect(equals(1.23, -1.23)).toEqual(false);
    expect(equals(2, 1)).toEqual(false);
    expect(equals(-1, 1)).toEqual(false);
  });

  it("Works for strings", () => {
    expect(equals("", "")).toEqual(true);
    expect(equals(" ", " ")).toEqual(true);
    expect(equals("a", "a")).toEqual(true);
    expect(equals("abc", "abc")).toEqual(true);
    expect(equals("abc", "")).toEqual(false);
    expect(equals("abc", "a")).toEqual(false);
    expect(equals("abc", "abc ")).toEqual(false);
    expect(equals("", " ")).toEqual(false);
  });

  it("Works for objects", () => {
    expect(equals({}, {})).toEqual(true);
    expect(equals({ a: 1 }, { a: 1 })).toEqual(true);
    expect(equals({ b: 0, a: 1 }, { a: 1, b: 0 })).toEqual(true);
    expect(
      equals({ b: 0, c: { d: 4 }, a: 1 }, { a: 1, b: 0, c: { d: 4 } }),
    ).toEqual(true);
    expect(equals({ a: 1 }, {})).toEqual(false);
    expect(equals({ a: 1 }, { a: 2 })).toEqual(false);
    expect(
      equals({ b: 0, c: { d: 4 }, a: 1 }, { a: 1, b: 0, c: { d: 3 } }),
    ).toEqual(false);
    expect(
      equals({ b: 0, c: { d: 4 }, a: 1 }, { a: 1, b: 0, c: { d: 4, e: 5 } }),
    ).toEqual(false);
    expect(
      equals({ a: 1, b: 0, c: { d: 4, e: 5 } }, { b: 0, c: { d: 4 }, a: 1 }),
    ).toEqual(false);
  });

  it("Works for arrays", () => {
    expect(equals([], [])).toEqual(true);
    expect(equals([1], [1])).toEqual(true);
    expect(equals([1, 2], [1, 2])).toEqual(true);
    expect(equals([1, [2]], [1, [2]])).toEqual(true);
    expect(equals([1, [2, [3]]], [1, [2, [3]]])).toEqual(true);
    expect(equals([1, [2, [3]]], [1, [2, [3, 4]]])).toEqual(false);
    expect(equals([1, ["2"]], [1, [2]])).toEqual(false);
    expect(equals([[2], 1], [1, [2]])).toEqual(false);
    expect(equals([1, 2], [1, [2]])).toEqual(false);
    expect(equals([1, 2], [1, 2, 3])).toEqual(false);
    expect(equals([1, 2, 3], [1, 2])).toEqual(false);
    expect(equals([1, 2], [2, 1])).toEqual(false);
  });
});
