import { getLogsStoreStateMock } from "@/shared/mocks/logsStore";
import { describe, expect, it } from "vitest";
import { selectLogs } from "./selectors";

const testStore = getLogsStoreStateMock();

describe("shared/model/logsStore/selectors", () => {
  describe("selectLogs", () => {
    it("should return logs", () => {
      const logs = selectLogs(testStore);
      expect(logs).toEqual(testStore.logs);
    });
  });
});
