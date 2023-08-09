import { describe, expect, it } from "vitest";
import { getMoras } from "~/dictionary/getMoras";

describe("getMoras", () => {
  it("Gets moras for `インストール`", () => {
    const pronunciation = "インストール";

    const moras = getMoras(pronunciation);

    expect(moras).toEqual(["イ", "ン", "ス", "ト", "ー", "ル"]);
  });

  it("Gets moras for `さいしょ`", () => {
    const pronunciation = "さいしょ";

    const moras = getMoras(pronunciation);

    expect(moras).toEqual(["さ", "い", "しょ"]);
  });

  it("Gets moras for `もって`", () => {
    const pronunciation = "もって";

    const moras = getMoras(pronunciation);

    expect(moras).toEqual(["も", "っ", "て"]);
  });

  it("Gets moras for `りょうしん`", () => {
    const pronunciation = "りょうしん";

    const moras = getMoras(pronunciation);

    expect(moras).toEqual(["りょ", "う", "し", "ん"]);
  });
});
