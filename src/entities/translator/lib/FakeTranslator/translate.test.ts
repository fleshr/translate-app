import { abortableDelayedResolve } from "@/shared/lib/async";
import { faker } from "@faker-js/faker";
import { describe, expect, it, vi } from "vitest";
import type { TranslatorOptions } from "../../model/translator";
import type { Config } from "./config";
import { translate } from "./translate";

const testOptions: TranslatorOptions<Config> = {
  source: "ja",
  target: "ru",
};

vi.mock("@/shared/lib/async", { spy: true });
vi.spyOn(faker.lorem, "sentence").mockReturnValue("text");

describe("entities/translator/lib/FakeTranslator/translate", () => {
  it("should call abortableDelayedResolve with correct options", () => {
    const abortController = new AbortController();

    void translate("test", {
      ...testOptions,
      config: { delay: 5000 },
      signal: abortController.signal,
    });

    expect(abortableDelayedResolve).toHaveBeenCalledWith("text", {
      delay: 5000,
      signal: abortController.signal,
    });
  });

  it("should return fake text", async () => {
    const result = await translate("test", {
      ...testOptions,
      config: { delay: 0 },
    });

    expect(result).toBe("text");
  });
});
