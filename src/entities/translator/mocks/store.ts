import { createMockFactory } from "@/shared/lib/testing";
import type { State } from "../model/store/store";

const mockTranslatorStoreState: State = {
  selected: "openai",
  configs: {
    openai: {
      model: "gpt-3.5-turbo",
    },
  },
};

export const getTranslatorStoreStateMock = createMockFactory(
  mockTranslatorStoreState,
);
