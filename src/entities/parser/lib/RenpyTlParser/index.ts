import type { Parser } from "../../model/parser/types";
import { checkFile } from "./checkFile";
import { extractText } from "./extractText";
import { replaceText } from "./replaceText";

export const RenpyTlParser: Parser = {
  name: "Renpy Translation Parser",
  version: "0.0.1",
  shortName: "renpy-tl",

  checkFile,
  extractText,
  replaceText,
};
