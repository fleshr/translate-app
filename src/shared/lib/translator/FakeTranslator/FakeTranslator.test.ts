import { stringifyJson } from "@/shared/lib/json";
import { generate } from "json-schema-faker";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { FakeTranslator } from "./FakeTranslator";

const testMock = { test: "test" };
vi.mock("json-schema-faker", () => ({
  generate: vi.fn(() => new Promise((resolve) => resolve(testMock))),
}));

const testSchema = z.object({
  test: z.string(),
});

describe("shared/lib/translator/FakeTranslator", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should resolve original text without schema", async () => {
    const result = FakeTranslator.translate("text");
    vi.advanceTimersToNextTimer();

    await expect(result).resolves.toBe("text");
  });

  it("should resolve fake json object with schema", async () => {
    const result = FakeTranslator.translate("text", { schema: testSchema });
    vi.advanceTimersToNextTimer();

    expect(generate).toHaveBeenCalledWith(testSchema.toJSONSchema(), {
      minLength: 3,
    });
    await expect(result).resolves.toBe(stringifyJson(testMock));
  });

  it("should reject on signal abort and clear timeout", async () => {
    const abortController = new AbortController();
    const result = FakeTranslator.translate("text", {
      schema: testSchema,
      signal: abortController.signal,
    });

    abortController.abort();

    expect(vi.getTimerCount()).toBe(0);
    await expect(result).rejects.toThrow(
      new DOMException("Aborted", "AbortError"),
    );
  });

  it("should reject if signal is already aborted", async () => {
    const abortController = new AbortController();
    abortController.abort();

    const result = FakeTranslator.translate("text", {
      schema: testSchema,
      signal: abortController.signal,
    });

    expect(vi.getTimerCount()).toBe(0);
    await expect(result).rejects.toThrow(
      new DOMException("signal is aborted without reason", "AbortError"),
    );
  });

  it("should resolve after given delay", async () => {
    const result = FakeTranslator.translate("text", {
      config: { delay: 5000 },
    });

    vi.advanceTimersByTime(3000);

    expect(vi.getTimerCount()).toBe(1);
    expect(generate).not.toHaveBeenCalled();

    vi.advanceTimersByTime(2000);

    expect(vi.getTimerCount()).toBe(0);
    await expect(result).resolves.toBe("text");
  });
});
