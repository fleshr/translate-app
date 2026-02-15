import { describe, expect, it } from "vitest";
import { readFile } from "./readFile";

const testFile = new File(["test"], "test.txt");
const resultArray = new Uint8Array([116, 101, 115, 116]);
const resultString = "test";

describe("shared/lib/file/readFile", () => {
  it("should read a file as ArrayBuffer", async () => {
    const result = await readFile(testFile, "array");
    expect(result).toEqual(resultArray);
  });

  it("should read a file as string", async () => {
    const result = await readFile(testFile, "string");
    expect(result).toEqual(resultString);
  });

  it("should read a file as string by default", async () => {
    const result = await readFile(testFile);
    expect(result).toEqual(resultString);
  });

  it("should throw error", async () => {
    const result = readFile(undefined as unknown as File);
    await expect(result).rejects.toThrow();
  });
});
