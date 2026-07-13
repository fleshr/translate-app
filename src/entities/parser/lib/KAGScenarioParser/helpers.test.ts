import { describe, expect, it } from "vitest";
import { isInsideSkip, prepareSkipPositions } from "./helpers";

const testContent = `
; test1
@iscript
{
	// test1
}
@endscript

; test2
@iscript
{
	// test2
}
@endscript
`;

const testSkipPositions: [number, number][] = [
  [9, 42],
  [52, 85],
];

describe("entities/parser/lib/KAGScenarioParser/helpers", () => {
  describe("prepareSkipPositions", () => {
    it("should prepare skip positions", () => {
      expect(prepareSkipPositions(testContent)).toEqual(testSkipPositions);
    });
  });

  describe("isInsideSkip", () => {
    it("should check if position is inside skip positions", () => {
      expect(isInsideSkip([20, 30], testSkipPositions)).toBeTruthy();
      expect(isInsideSkip([9, 42], testSkipPositions)).toBeTruthy();

      expect(isInsideSkip([1, 8], testSkipPositions)).toBeFalsy();
      expect(isInsideSkip([43, 51], testSkipPositions)).toBeFalsy();
    });
  });
});
