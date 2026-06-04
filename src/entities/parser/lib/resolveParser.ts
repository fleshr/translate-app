import type { Module } from "@/shared/model/module";
import { builtinParsers } from "../model/builtin";
import type { Parser } from "../model/parser/types";
import { selectParser } from "../model/store/selectors";
import { useParserStore } from "../model/store/store";
import { createParserFromCode } from "./createParserFromCode";

export const resolveParser = async (
  parser: Module | string,
): Promise<Parser | undefined> => {
  const parserModule =
    typeof parser === "string"
      ? selectParser(parser)(useParserStore.getState())
      : parser;

  if (!parserModule) {
    return;
  }

  return parserModule.type === "external"
    ? await createParserFromCode(parserModule.code)
    : builtinParsers[parserModule.id];
};
