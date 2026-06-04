import { zodTextFormat } from "openai/helpers/zod";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { defaultConfig, OpenAITranslator } from "./OpenAITranslator";

const testConfig = {
  apiKey: "testKey",
  baseURL: "testUrl",
  model: "testModel",
  instructions: "testInstructions",
};

const testSchema = z.object({
  test: z.string(),
});

const { mockCreate, mockOpenAI } = vi.hoisted(() => {
  const mockCreate = vi.fn(() => ({ output_text: "testOutput" }));
  const mockOpenAI = vi.fn(
    class {
      responses = { create: mockCreate };
    },
  );

  return { mockCreate, mockOpenAI };
});

vi.mock("openai", () => ({ default: mockOpenAI }));

describe("entities/translator/lib/OpenAITranslator", () => {
  it("should apply config to OpenAI client", async () => {
    const abortController = new AbortController();

    await OpenAITranslator.translate("test", {
      config: testConfig,
      signal: abortController.signal,
      schema: testSchema,
    });

    expect(mockOpenAI).toHaveBeenCalledWith({
      apiKey: testConfig.apiKey,
      baseURL: testConfig.baseURL,
      dangerouslyAllowBrowser: true,
    });

    expect(mockCreate).toHaveBeenCalledWith(
      {
        input: "test",
        instructions: testConfig.instructions,
        model: testConfig.model,
        stream: false,
        text: { format: zodTextFormat(testSchema, "response") },
      },
      { signal: abortController.signal },
    );
  });

  it("should apply defaults to OpenAI client", async () => {
    await OpenAITranslator.translate("test");

    expect(mockOpenAI).toHaveBeenCalledWith({
      apiKey: defaultConfig.apiKey,
      baseURL: defaultConfig.baseURL,
      dangerouslyAllowBrowser: true,
    });

    expect(mockCreate).toHaveBeenCalledWith(
      {
        input: "test",
        instructions: defaultConfig.instructions,
        model: defaultConfig.model,
        stream: false,
        text: { format: zodTextFormat(z.object(), "response") },
      },
      { signal: undefined },
    );
  });

  it("should translate text with OpenAI client", async () => {
    const result = await OpenAITranslator.translate("test");

    expect(result).toBe("testOutput");
  });
});
