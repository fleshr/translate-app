import type { ModuleExternal } from "@/shared/model/module";
import { useParserStore } from "./store";

export const addParser = (module: ModuleExternal) => {
  useParserStore.setState(
    (state) => {
      state.parsers[module.id] = module;
    },
    undefined,
    "addParser",
  );
};

export const removeParser = (id: string) => {
  useParserStore.setState(
    (state) => {
      delete state.parsers[id];
    },
    undefined,
    "removeParser",
  );
};
