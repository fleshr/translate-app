import type { IntlayerNode } from "react-intlayer";
import { describe, expect, it } from "vitest";
import { getSearchSelectFields } from "./getSearchSelectFields";

describe("features/search/lib/getSearchSelectFields", () => {
  it("should return search select fields", () => {
    const fields = getSearchSelectFields({
      originalTextLabel: { value: "original" } as IntlayerNode<string>,
      machineTranslationLabel: { value: "machine" } as IntlayerNode<string>,
      manualTranslationLabel: { value: "manual" } as IntlayerNode<string>,
    });

    expect(fields).toEqual([
      { value: "originalText", label: "original" },
      { value: "machineTranslation", label: "machine" },
      { value: "manualTranslation", label: "manual" },
    ]);
  });
});
