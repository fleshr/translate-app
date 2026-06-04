import { resetStore } from "@/shared/lib/testing";
import { afterEach, describe, expect, it } from "vitest";
import { setSelectedTranslator, setTranslatorConfig } from "./actions";
import { useTranslatorStore } from "./store";

describe("entities/translator/model/store/actions", () => {
  afterEach(() => {
    resetStore(useTranslatorStore);
  });

  describe("setTranslatorConfig", () => {
    it("should set translator config", () => {
      setTranslatorConfig("test", { testField1: "testValue1" });

      expect(useTranslatorStore.getState().configs).toEqual({
        test: { testField1: "testValue1" },
      });
    });
  });

  describe("setSelectedTranslator", () => {
    it("should set selected translator", () => {
      setSelectedTranslator("test");

      expect(useTranslatorStore.getState().selected).toEqual("test");
    });
  });
});
