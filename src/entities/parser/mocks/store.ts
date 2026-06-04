import { createMockFactory } from "@/shared/lib/testing";
import {
  getModuleBuiltinMock,
  getModuleExternalMock,
} from "@/shared/mocks/module";
import type { State } from "../model/store/store";

const mockParserStoreState: State = {
  parsers: {
    "test1@1.0.0": getModuleExternalMock({
      id: "test1@1.0.0",
      name: "Test Module 1",
      code: "test1",
    }),
    "test2@1.0.0": getModuleBuiltinMock({
      id: "test2@1.0.0",
      name: "Test Module 2",
    }),
    "test3@1.0.0": getModuleBuiltinMock({
      id: "test3@1.0.0",
      name: "Test Module 3",
    }),
  },
};

export const getParserStoreStateMock = createMockFactory(mockParserStoreState);
