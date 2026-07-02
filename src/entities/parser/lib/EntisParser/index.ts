import type { Parser } from "../../model/parser/types";
import { checkFile } from "./checkFile";
import { extractText } from "./extractText";
import { replaceText } from "./replaceText";

export const EntisParser: Parser = {
  name: "Entis Parser",
  version: "0.0.1",
  shortName: "entis",

  checkFile,
  extractText,
  replaceText,
};
