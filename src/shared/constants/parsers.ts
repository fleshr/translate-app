import { EntisParser, RenpyTlParser } from "@/shared/lib/parsers";
import type { ModuleBuiltin } from "../model/module";
import type { Parser } from "../model/parser";

const parsers = [EntisParser, RenpyTlParser];

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
