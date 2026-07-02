import {
  getTranslationCommonMock,
  getTranslationFileMock,
} from "@/entities/translation/mocks";
import { describe, expect, it } from "vitest";
import { getResourcesFiles } from "./getResourcesFiles";

const testResources = [
  getTranslationCommonMock(),
  getTranslationFileMock({ id: "file-1", relPath: "files/file-1" }),
  getTranslationFileMock({ id: "file-2", relPath: "files/file-2" }),
];

const testFiles = [
  new File(["content-1"], "file-1"),
  new File(["content-2"], "file-2"),
  new File(["content-3"], "file-3"),
];

// @ts-expect-error not exist in node env
testFiles[0].webkitRelativePath = "files/file-1";
// @ts-expect-error not exist in node env
testFiles[1].webkitRelativePath = "files/file-2";
// @ts-expect-error not exist in node env
testFiles[2].webkitRelativePath = "files/file-3";

describe("widgets/header/lib/getResourcesFiles", () => {
  it("should throw error if resource file not found", async () => {
    const promise = getResourcesFiles([], testResources);
    await expect(promise).rejects.toThrow("Resource file not found");
  });

  it("should return resources files", async () => {
    const files = await getResourcesFiles(testFiles, testResources);

    expect(files).toHaveProperty("files/file-1");
    expect(files).toHaveProperty("files/file-2");
    expect(files).not.toHaveProperty("files/file-3");

    const fileContent1 = new Uint8Array(await testFiles[0]!.arrayBuffer());
    const fileContent2 = new Uint8Array(await testFiles[1]!.arrayBuffer());

    expect(files["files/file-1"]).toEqual(fileContent1);
    expect(files["files/file-2"]).toEqual(fileContent2);
  });
});
