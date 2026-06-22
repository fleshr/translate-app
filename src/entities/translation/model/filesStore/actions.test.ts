import { resetStore } from "@/shared/lib/testing";
import { afterEach, describe, expect, it } from "vitest";
import { getFilesStoreStateMock } from "../../mocks";
import { initFiles } from "./actions";
import { useFilesStore } from "./store";

const testStore = getFilesStoreStateMock();

describe("entities/translation/model/filesStore/actions", () => {
  afterEach(() => {
    resetStore(useFilesStore);
  });

  describe("initFiles", () => {
    it("should init files store", () => {
      initFiles(testStore.files);
      expect(useFilesStore.getState()).toEqual(testStore);
    });
  });
});
