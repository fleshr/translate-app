import OpenAI, { APIUserAbortError } from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { OpenAITranslator, type Config } from "./OpenAITranslator";

const testOptions = {
  source: "ja",
  target: "ru",
} as const;

const testConfig: Config = {
  apiKey: "testKey",
  baseURL: "testUrl",
  model: "testModel",
  promptLang: "en",
  systemPrompt: "test {source_lang} {target_lang}",
};

const { mockCreate, mockOpenAI } = vi.hoisted(() => {
  const mockCreate = vi.fn();
  const mockOpenAI = vi.fn(
    class {
      responses = { create: mockCreate };
    } as unknown as typeof OpenAI,
  );

  return { mockCreate, mockOpenAI };
});

vi.mock("openai", { spy: true });
vi.mocked(OpenAI).mockImplementation(mockOpenAI);

describe("entities/translator/lib/OpenAITranslator", () => {
  describe("translate", () => {
    beforeAll(() => {
      mockCreate.mockResolvedValue({ output_text: "testOutput" });
    });

    it("should apply config to OpenAI client", async () => {
      await OpenAITranslator.translate("test", {
        ...testOptions,
        config: testConfig,
      });

      expect(mockOpenAI).toHaveBeenCalledWith({
        apiKey: testConfig.apiKey,
        baseURL: testConfig.baseURL,
        dangerouslyAllowBrowser: true,
      });
    });

    it("should apply config to request", async () => {
      const abortController = new AbortController();

      await OpenAITranslator.translate("test", {
        ...testOptions,
        config: testConfig,
        signal: abortController.signal,
      });

      expect(mockCreate).toHaveBeenCalledWith(
        {
          input: "test",
          instructions: "test Japanese Russian",
          model: testConfig.model,
          stream: false,
        },
        { signal: abortController.signal },
      );
    });

    it("should throw DOMException on abort", async () => {
      mockCreate.mockRejectedValueOnce(new APIUserAbortError());

      await expect(
        OpenAITranslator.translate("test", testOptions),
      ).rejects.toThrow(DOMException);
    });

    it("should translate text with OpenAI client", async () => {
      const result = await OpenAITranslator.translate("test", testOptions);

      expect(result).toBe("testOutput");
    });
  });

  describe("translateBatch", () => {
    beforeAll(() => {
      mockCreate.mockResolvedValue({
        output_text: '{"Line1":"text1","Line2":"text2"}',
      });
    });

    it("should apply config to OpenAI client", async () => {
      await OpenAITranslator.translateBatch(["test1", "test2"], {
        ...testOptions,
        config: testConfig,
      });

      expect(mockOpenAI).toHaveBeenCalledWith({
        apiKey: testConfig.apiKey,
        baseURL: testConfig.baseURL,
        dangerouslyAllowBrowser: true,
      });
    });

    it("should apply config to request", async () => {
      const abortController = new AbortController();

      await OpenAITranslator.translateBatch(["test1", "test2"], {
        ...testOptions,
        config: testConfig,
        signal: abortController.signal,
      });

      expect(mockCreate).toHaveBeenCalledWith(
        {
          input: '{\n  "Line1": "test1",\n  "Line2": "test2"\n}',
          instructions: "test Japanese Russian",
          model: testConfig.model,
          stream: false,
          text: {
            format: zodTextFormat(
              z.object({ Line1: z.string(), Line2: z.string() }),
              "response",
            ),
          },
        },
        { signal: abortController.signal },
      );
    });

    it("should throw DOMException on abort", async () => {
      mockCreate.mockRejectedValueOnce(new APIUserAbortError());

      await expect(
        OpenAITranslator.translateBatch(["test1", "test2"], testOptions),
      ).rejects.toThrow(DOMException);
    });

    it("should translate text with OpenAI client", async () => {
      const result = await OpenAITranslator.translateBatch(
        ["test1", "test2"],
        testOptions,
      );

      expect(result).toEqual(["text1", "text2"]);
    });
  });
});
