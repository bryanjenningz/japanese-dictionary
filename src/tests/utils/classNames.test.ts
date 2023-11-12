import { describe, expect, it } from "vitest";
import { classNames } from "~/utils/classNames";

describe("classNames", () => {
  it("Returns an empty string when no arguments are passed", () => {
    expect(classNames()).toBe("");
  });

  it("Concatenates all truthy arguments with a space", () => {
    expect(classNames("foo", "bar", "baz")).toBe("foo bar baz");
  });

  it("Ignores falsy arguments", () => {
    expect(classNames("foo", false, "bar", "", "baz")).toBe("foo bar baz");
  });

  it("Handle only falsy arguments", () => {
    expect(classNames(false, "", null, undefined)).toBe("");
  });
});
