import { resetStore } from "@/shared/lib/testing";
import { afterEach, describe, expect, it } from "vitest";
import { addLog } from "./actions";
import { useLogsStore } from "./store";

describe("shared/model/logsStore/actions", () => {
  afterEach(() => {
    resetStore(useLogsStore);
  });

  describe("addLog", () => {
    it("should add log", () => {
      addLog("info", "test");
      expect(useLogsStore.getState().logs).toEqual([
        { id: expect.any(String), type: "info", message: "test" },
      ]);
    });

    it("should trim logs to limit", () => {
      useLogsStore.setState({ limit: 1 });

      addLog("info", "test1");
      expect(useLogsStore.getState().logs).toEqual([
        { id: expect.any(String), type: "info", message: "test1" },
      ]);

      addLog("debug", "test2");
      expect(useLogsStore.getState().logs).toEqual([
        { id: expect.any(String), type: "debug", message: "test2" },
      ]);
    });
  });
});
