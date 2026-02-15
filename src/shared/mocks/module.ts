import { createMockFactory } from "../lib/testing";
import type { BaseModule, Module } from "../model/module";

const mockBaseModule: BaseModule = {
  id: "test@1.0.0",
  name: "Test Module",
  version: "1.0.0",
  shortName: "test",
};

export const getBaseModuleMock = createMockFactory(mockBaseModule);

const mockModule: Module = {
  ...mockBaseModule,
  code: "test code",
};

export const getModuleMock = createMockFactory(mockModule);
