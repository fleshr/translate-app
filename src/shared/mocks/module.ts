import { createMockFactory } from "../lib/testing";
import type { ModuleBuiltin, ModuleExternal } from "../model/module";

const mockModuleExternal: ModuleExternal = {
  id: "test@1.0.0",
  name: "Test Module",
  version: "1.0.0",
  shortName: "test",
  type: "external",
  code: "test code",
};

const mockModuleBuiltin: ModuleBuiltin = {
  id: "test@1.0.0",
  name: "Test Module",
  version: "1.0.0",
  shortName: "test",
  type: "builtin",
};

export const getModuleExternalMock = createMockFactory(mockModuleExternal);
export const getModuleBuiltinMock = createMockFactory(mockModuleBuiltin);
