import { builtinParsers } from "@/shared/constants/parsers";
import { createParserFromCode } from "@/shared/lib/module";
import { selectModule, useModuleStore } from "@/shared/model/moduleStore";
import type { Parser } from "@/shared/model/parser";
import {
  selectProjectParser,
  useProjectStore,
} from "@/shared/model/projectStore";

export const resolveParser = async (): Promise<Parser | undefined> => {
  const selectedParser = selectProjectParser(useProjectStore.getState());

  const parserModule =
    typeof selectedParser === "string"
      ? selectModule("parsers", selectedParser)(useModuleStore.getState())
      : selectedParser;

  if (!parserModule) {
    return;
  }

  return parserModule.type === "external"
    ? await createParserFromCode(parserModule.code)
    : builtinParsers[parserModule.id];
};
