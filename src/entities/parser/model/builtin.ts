import type { ModuleBuiltin } from "@/shared/model/module";
import { EntisParser } from "../lib/EntisParser";
import { KAGScenarioParser } from "../lib/KAGScenarioParser";
import { RenpyTlParser } from "../lib/RenpyTlParser";
import type { Parser } from "./parser/types";

const parsers = [EntisParser, RenpyTlParser, KAGScenarioParser];

export const builtinParsersMeta: Record<string, ModuleBuiltin> =
  Object.fromEntries(
    parsers.map((parser) => [
      parser.shortName,
      {
        type: "builtin",
        id: parser.shortName,
        name: parser.name,
        version: parser.version,
        shortName: parser.shortName,
      },
    ]),
  );

export const builtinParsers: Record<string, Parser> = Object.fromEntries(
  parsers.map((parser) => [parser.shortName, parser]),
);
