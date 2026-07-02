import {
  getTranslationCommonMock,
  getTranslationFileMock,
} from "@/entities/translation/mocks";
import { stringifyJson } from "@/shared/lib/json";
import JSZip from "jszip";
import { describe, expect, it } from "vitest";
import { parseProjectFile } from "./parseProjectFile";

const testProject = {
  parser: "test",
};

const testResources = [
  getTranslationCommonMock(),
  getTranslationFileMock({ id: "file-1", relPath: "files/file-1" }),
];

const testFile = new TextEncoder().encode("content-1");

const testProjectFile = await JSZip()
  .file("project.json", stringifyJson(testProject))
  .file("resources.json", stringifyJson(testResources))
  .file("resources/files/file-1", testFile)
  .generateAsync({ type: "blob" });

const testNoMetaFile = await JSZip()
  .file("resources/files/file-1", testFile)
  .generateAsync({ type: "blob" });

const testNoResourcesFile = await JSZip()
  .file("project.json", stringifyJson(testProject))
  .file("resources.json", stringifyJson(testResources))
  .generateAsync({ type: "blob" });

describe("widgets/header/lib/parseProjectFile", () => {
  it("should throw error if no metadata files", async () => {
    const promise = parseProjectFile(new File([testNoMetaFile], "test.zip"));
    await expect(promise).rejects.toThrow("Invalid translation file");
  });

  it("should throw error if no resources files", async () => {
    const promise = parseProjectFile(
      new File([testNoResourcesFile], "test.zip"),
    );
    await expect(promise).rejects.toThrow("Resource file not found");
  });

  it("should parse project file", async () => {
    const { project, resources, files } = await parseProjectFile(
      new File([testProjectFile], "test.zip"),
    );

    expect(project).toEqual(testProject);
    expect(resources).toEqual(testResources);
    expect(files).toHaveProperty("files/file-1");
    expect(files["files/file-1"]).toEqual(testFile);
  });
});
