import { APIUserAbortError, OpenAI } from "openai";
import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import type { Config } from "./config";
import { batchAddition } from "./constants";
import {
  abortWrapper,
  createClient,
  getBatchJson,
  getBatchSchema,
  parseResponse,
  prepareInstructions,
} from "./helpers";

const systemPrompt1 = "test {source_lang} {target_lang} {batch_addition}";
const systemPrompt2 = "test {source_lang} {target_lang}";

const testConfig: Config = {
  apiKey: "testKey",
  baseURL: "testUrl",
  model: "testModel",
  promptLang: "en",
  systemPrompt: systemPrompt1,
};

vi.mock("openai", { spy: true });

describe("entities/translator/lib/OpenAITranslator/helpers", () => {
  describe("prepareInstructions", () => {
    it("should replace only languages tags when not batch", () => {
      const instructions = prepareInstructions(systemPrompt1, {
        source: "ja",
        target: "en",
      });
      expect(instructions).toBe("test Japanese English");
    });

    it("should replace languages and batch tags when batch", () => {
      const instructions = prepareInstructions(systemPrompt1, {
        source: "ja",
        target: "en",
        isBatch: true,
      });
      expect(instructions).toBe(`test Japanese English ${batchAddition}`);
    });

    it("should add batch addition to prompt without batch tag when batch", () => {
      const instructions = prepareInstructions(systemPrompt2, {
        source: "ja",
        target: "en",
        isBatch: true,
      });
      expect(instructions).toBe(`test Japanese English\n${batchAddition}`);
    });
  });

  describe("getBatchSchema", () => {
    it("should return correct schema", () => {
      const schema = getBatchSchema(2);
      expect(schema.shape).toEqual({
        Line1: expect.any(z.ZodString),
        Line2: expect.any(z.ZodString),
      });
    });
  });

  describe("getBatchJson", () => {
    it("should return correct json", () => {
      const json = getBatchJson(["test1", "test2"]);
      expect(json).toBe('{\n  "Line1": "test1",\n  "Line2": "test2"\n}');
    });
  });

  describe("parseResponse", () => {
    it("should parse response", () => {
      const response = parseResponse(
        '{"Line1": "text1", "Line2": "text2"}',
        z.object({ Line1: z.string(), Line2: z.string() }),
      );
      expect(response).toEqual(["text1", "text2"]);
    });

    it("should throw error on invalid response", () => {
      expect(() =>
        parseResponse(
          '{"Line1": "text1"}',
          z.object({ Line1: z.string(), Line2: z.string() }),
        ),
      ).toThrow();
    });
  });

  describe("createClient", () => {
    it("should create client with config", () => {
      const client = createClient(testConfig);

      expect(client).toBeInstanceOf(OpenAI);
      expect(OpenAI).toHaveBeenCalledWith({
        apiKey: testConfig.apiKey,
        baseURL: testConfig.baseURL,
        dangerouslyAllowBrowser: true,
      });
    });
  });

  describe("abortWrapper", () => {
    it("should rethrow not openai abort errors", async () => {
      await expect(
        abortWrapper(() => Promise.reject(new Error("test"))),
      ).rejects.toThrow("test");
    });

    it("should throw DOMException on openai abort error", async () => {
      await expect(
        abortWrapper(() => Promise.reject(new APIUserAbortError())),
      ).rejects.toThrow(DOMException);
    });
  });
});
