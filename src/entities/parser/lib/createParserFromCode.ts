import { createModuleFromCode } from "@/shared/lib/module";
import { ParserShema } from "../model/parser/schemas";
import type { Parser } from "../model/parser/types";

export const createParserFromCode = async (code: string): Promise<Parser> => {
  const module = await createModuleFromCode(code);
  return ParserShema.parse(module.default);
};
