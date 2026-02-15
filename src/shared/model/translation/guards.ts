import type {
  TranslationCommon,
  TranslationFile,
  TranslationResource,
} from "./types";

export const isTranslationFile = (
  resource: TranslationResource,
): resource is TranslationFile => {
  return resource.type === "file";
};

export const isTranslationCommon = (
  resource: TranslationResource,
): resource is TranslationCommon => {
  return resource.type === "common";
};
