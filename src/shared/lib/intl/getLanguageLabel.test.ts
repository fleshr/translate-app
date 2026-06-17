import { describe, expect, it } from "vitest";
import { getLanguageLabel } from "./getLanguageLabel";

describe("shared/lib/intl/getLanguageLabel", () => {
  it("should return language label", () => {
    expect(getLanguageLabel("ru", "en")).toBe("Russian (русский)");
    expect(getLanguageLabel("en", "ru")).toBe("английский (English)");
  });
});
