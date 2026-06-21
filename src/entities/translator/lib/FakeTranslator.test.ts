import { abortableDelayedResolve } from "@/shared/lib/async";
import { faker } from "@faker-js/faker";
import { describe, expect, it, vi } from "vitest";
import { FakeTranslator } from "./FakeTranslator";

const testOptions = {
  source: "ja",
  target: "ru",
} as const;

vi.mock("@/shared/lib/async", { spy: true });
vi.spyOn(faker.lorem, "sentence").mockReturnValue("text");

describe("entities/translator/lib/FakeTranslator", () => {
  describe("translate", () => {
    it("should call abortableDelayedResolve with correct options", () => {
      const abortController = new AbortController();

      void FakeTranslator.translate("test", {
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
      const result = await FakeTranslator.translate("test", {
        ...testOptions,
        config: { delay: 0 },
      });

      expect(result).toBe("text");
    });
  });

  describe("translateBatch", () => {
    it("should call abortableDelayedResolve with correct options", () => {
      const abortController = new AbortController();

      void FakeTranslator.translateBatch(["test1", "test2"], {
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
      const result = await FakeTranslator.translateBatch(["test1", "test2"], {
        ...testOptions,
        config: { delay: 0 },
      });

      expect(result).toEqual(["text", "text"]);
    });
  });
});
