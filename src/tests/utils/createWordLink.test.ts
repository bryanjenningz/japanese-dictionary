import { describe, expect, it } from "vitest";
import { createWordLink } from "~/utils/createWordLink";

describe("createWordLink", () => {
  it("Returns the correct word link", () => {
    const searchText = "apple";
    const resultIndex = 2;
    const expected = "/word?search=apple&index=2";

    const actual = createWordLink({ searchText, resultIndex });

    expect(actual).toBe(expected);
  });
});
