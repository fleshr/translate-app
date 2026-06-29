import type { TranslationSegment } from "@/entities/translation";
import { getTranslationSegmentMock } from "@/entities/translation/mocks";
import { describe, expect, it } from "vitest";
import { applyFunctionToSegments } from "./applyFunctionToSegments";

const testSegment1 = getTranslationSegmentMock({ id: "segment-1" });
const testSegment2 = getTranslationSegmentMock({ id: "segment-2" });

const testFn = (segment: TranslationSegment) => {
  if (segment.id === "segment-1") {
    segment.originalText = "123";
  }
};

describe("features/script-editor/lib/applyFunctionToSegments", () => {
  it("should apply function and return changed segments", async () => {
    const changedSegments = await applyFunctionToSegments(
      [testSegment1, testSegment2],
      testFn,
    );

    expect(changedSegments).toEqual([{ ...testSegment1, originalText: "123" }]);
  });
});
