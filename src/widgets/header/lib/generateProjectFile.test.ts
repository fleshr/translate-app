import {
  getTranslationCommonMock,
  getTranslationFileMock,
} from "@/entities/translation/mocks";
import { stringifyJson } from "@/shared/lib/json";
import { loadAsync } from "jszip";
import { describe, expect, it } from "vitest";
import { generateProjectFile } from "./generateProjectFile";

const testResources = [
  getTranslationCommonMock(),
  getTranslationFileMock({ id: "file-1", relPath: "files/file-1" }),
  getTranslationFileMock({ id: "file-2", relPath: "files/file-2" }),
];

const testFiles = {
  "files/file-1": new TextEncoder().encode("content-1").buffer,
  "files/file-2": new TextEncoder().encode("content-2").buffer,
};

const testProject = {
  parser: "test",
};

describe("widgets/header/lib/generateProjectFile", () => {
  it("should throw error if resource file not found", async () => {
    const promise = generateProjectFile({}, testProject, testResources);
    await expect(promise).rejects.toThrow("Resource file not found");
  });

  it("should generate project file with metadata", async () => {
    const blob = await generateProjectFile(
      testFiles,
      testProject,
      testResources,
    );

    const { files } = await loadAsync(blob);

    expect(files).toHaveProperty("project.json");
    expect(files).toHaveProperty("resources.json");

    const projectJson = await files["project.json"]?.async("string");
    expect(projectJson).toBe(stringifyJson(testProject));

    const resourcesJson = await files["resources.json"]?.async("string");
    expect(resourcesJson).toBe(stringifyJson(testResources));
  });

  it("should generate project file with resource files", async () => {
    const blob = await generateProjectFile(
      testFiles,
      testProject,
      testResources,
    );

    const { files } = await loadAsync(blob);

    expect(files).toHaveProperty("resources/files/file-1");
    expect(files).toHaveProperty("resources/files/file-2");

    const file1 = await files["resources/files/file-1"]?.async("string");
    expect(file1).toBe("content-1");

    const file2 = await files["resources/files/file-2"]?.async("string");
    expect(file2).toBe("content-2");
  });
});
