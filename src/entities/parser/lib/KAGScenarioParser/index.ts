import type { Parser } from "../../model/parser/types";
import { checkFile } from "./checkFile";
import { extractText } from "./extractText";
import { replaceText } from "./replaceText";

export const KAGScenarioParser: Parser = {
  name: "KiriKiri (KAG) Scenario Parser",
  version: "0.0.1",
  shortName: "kag-scenario",

  checkFile,
  extractText,
  replaceText,
};
