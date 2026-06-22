import { createMockFactory } from "@/shared/lib/testing";
import type { State } from "../model/projectStore/store";

const mockProjectStoreState: State = {
  parser: "entis",
};

export const getProjectStoreStateMock = createMockFactory(
  mockProjectStoreState,
);
