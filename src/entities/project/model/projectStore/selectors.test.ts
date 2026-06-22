import { getModuleExternalMock } from "@/shared/mocks/module";
import { describe, expect, it } from "vitest";
import { selectProject, selectProjectParser } from "./selectors";
import { type State } from "./store";

const testStore: State = { parser: getModuleExternalMock() };

describe("entities/project/model/projectStore/selectors", () => {
  describe("selectProjectParser", () => {
    it("should return project parser", () => {
      const parser = selectProjectParser(testStore);

      expect(parser).toEqual(testStore.parser);
    });
  });

  describe("selectProject", () => {
    it("should return whole project", () => {
      const project = selectProject(testStore);

      expect(project).toEqual(testStore);
    });
  });
});
