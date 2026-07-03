import { abortableDelayedResolve } from "@/shared/lib/async";
import { faker } from "@faker-js/faker";
import { describe, expect, it, vi } from "vitest";
import type { TranslatorOptions } from "../../model/translator";
import type { Config } from "./config";
import { translateBatch } from "./translateBatch";

const testOptions: TranslatorOptions<Config> = {
  source: "ja",
  target: "ru",
};

vi.mock("@/shared/lib/async", { spy: true });
vi.spyOn(faker.lorem, "sentence").mockReturnValue("text");

describe("entities/translator/lib/FakeTranslator/translateBatch", () => {
  it("should call abortableDelayedResolve with correct options", () => {
    const abortController = new AbortController();

    void translateBatch(["test1", "test2"], {
      ...testOptions,
      config: { delay: 1000 },
      signal: abortController.signal,
    });

    expect(abortableDelayedResolve).toHaveBeenCalledWith(["text", "text"], {
      delay: 1000,
      signal: abortController.signal,
    });
  });

  it("should return fake texts", async () => {
    const result = await translateBatch(["test1", "test2"], {
      ...testOptions,
      config: { delay: 0 },
    });

    expect(result).toEqual(["text", "text"]);
  });
});
