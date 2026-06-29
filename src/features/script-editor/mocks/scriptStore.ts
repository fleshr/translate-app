import { createMockFactory } from "@/shared/lib/testing";
import type { State } from "../model/scriptStore/store";

const mockUserScriptStoreState: State = {
  code: "return async function () { console.log('Test') }",
};

export const getUserScriptStoreStateMock = createMockFactory(
  mockUserScriptStoreState,
);
