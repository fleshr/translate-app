import { APIUserAbortError, OpenAI } from "openai";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { TranslatorOptions } from "../../model/translator";
import { type Config } from "./config";
import { translate } from "./translate";

const testOptions: TranslatorOptions<Config> = {
  source: "ja",
  target: "ru",
};

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

describe("entities/translator/lib/OpenAITranslator/translate", () => {
  beforeAll(() => {
    mockCreate.mockResolvedValue({ output_text: "testOutput" });
  });

  it("should apply config to OpenAI client", async () => {
    await translate("test", {
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

    await translate("test", {
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

    await expect(translate("test", testOptions)).rejects.toThrow(DOMException);
  });

  it("should translate text with OpenAI client", async () => {
    const result = await translate("test", testOptions);

    expect(result).toBe("testOutput");
  });
});
