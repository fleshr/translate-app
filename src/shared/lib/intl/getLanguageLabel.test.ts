import type { LanguageCode } from "iso-639-1";
import { describe, expect, it } from "vitest";
import { getLanguageLabel } from "./getLanguageLabel";

describe("shared/lib/intl/getLanguageLabel", () => {
  it("should return language label with native name by default", () => {
    expect(getLanguageLabel("ru", "en")).toBe("Russian (русский)");
    expect(getLanguageLabel("en", "ru")).toBe("английский (English)");
  });

  it("should return language label with native name", () => {
    expect(getLanguageLabel("ru", "en", true)).toBe("Russian (русский)");
    expect(getLanguageLabel("en", "ru", true)).toBe("английский (English)");
  });

  it("should return language label without native name", () => {
    expect(getLanguageLabel("ru", "en", false)).toBe("Russian");
    expect(getLanguageLabel("en", "ru", false)).toBe("английский");
  });

  it("should return language code if no data for code", () => {
    expect(getLanguageLabel("zl" as LanguageCode, "en", true)).toBe("zl");
    expect(getLanguageLabel("zl" as LanguageCode, "ru", false)).toBe("zl");
  });
});
