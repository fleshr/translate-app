import { ParserShema, type Parser } from "@/shared/model/parser";
import { createModuleFromCode } from "./createModuleFromCode";

export const createParserFromCode = async (code: string): Promise<Parser> => {
  const module = await createModuleFromCode(code);
  return ParserShema.parse(module.default);
};
