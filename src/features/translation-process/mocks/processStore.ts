import { createMockFactory } from "@/shared/lib/testing";
import type { State } from "../model/processStore/store";

const processStoreStateMock: State = {
  status: "idle",
  translatingResource: null,
};

export const getTranslationProcessStoreStateMock = createMockFactory(
  processStoreStateMock,
);
