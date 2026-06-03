import type { Id, Progress } from "@/shared/model/common";
import { groupByProp, mapValues } from "remeda";
import type { TranslationResource } from "../model/translation/types";

export const calculateResourcesPogress = (
  resources: TranslationResource[],
): Record<Id, Progress> => {
  return mapValues(groupByProp(resources, "id"), ([{ segments }]) => {
    const translated = segments.filter(
      (segment) => segment.manualTranslation || segment.machineTranslation,
    );

    return { done: translated.length, total: segments.length };
  });
};
