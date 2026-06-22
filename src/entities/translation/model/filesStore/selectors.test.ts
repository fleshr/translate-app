import { describe, expect, it } from "vitest";
import { getFilesStoreStateMock } from "../../mocks";
import { selectFile, selectFiles } from "./selectors";

const testStore = getFilesStoreStateMock();

describe("entities/translation/model/filesStore/selectors", () => {
  describe("selectFile", () => {
    it("should return file", () => {
      const result = selectFile("files/file-1")(testStore);
      expect(result).toEqual(testStore.files["files/file-1"]);
    });
  });

  describe("selectFiles", () => {
    it("should return files", () => {
      const result = selectFiles(testStore);
      expect(result).toEqual(testStore.files);
    });
  });
});
