import ISO6391 from "iso-639-1";
import { describe, expect, it, vi } from "vitest";
import { getLanguageLabel } from "./getLanguageLabel";
import { getLanguageOptions } from "./getLanguageOptions";

vi.mock("./getLanguageLabel", { spy: true });
vi.mocked(getLanguageLabel).mockImplementation((code, _, includeNative) =>
  includeNative ? `${code} (${code})` : code,
);

vi.spyOn(ISO6391, "getAllCodes").mockReturnValue(["en", "ru"]);

describe("shared/lib/intl/getLanguageOptions", () => {
  it("should return language options", () => {
    const result = getLanguageOptions("en");

    expect(result).toEqual([
      { label: "en (en)", value: "en" },
      { label: "ru (ru)", value: "ru" },
    ]);
  });

  it("should return language options with native name", () => {
    const result = getLanguageOptions("en", true);

    expect(result).toEqual([
      { label: "en (en)", value: "en" },
      { label: "ru (ru)", value: "ru" },
    ]);
  });

  it("should return language options without native name", () => {
    const result = getLanguageOptions("en", false);

    expect(result).toEqual([
      { label: "en", value: "en" },
      { label: "ru", value: "ru" },
    ]);
  });
});
