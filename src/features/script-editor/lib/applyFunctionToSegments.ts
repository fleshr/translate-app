import type { TranslationSegment } from "@/entities/translation";
import { createDraft, finishDraft } from "immer";
import { isDeepEqual } from "remeda";
import type { UserFunction } from "../model/userFunction";

export const applyFunctionToSegments = async (
  segments: TranslationSegment[],
  userFunction: UserFunction,
): Promise<TranslationSegment[]> => {
  const changedSegments: TranslationSegment[] = [];

  for (const segment of segments) {
    const draft = createDraft(segment);
    await userFunction(draft);
    const editedSegment = finishDraft(draft);

    if (!isDeepEqual(segment, editedSegment)) {
      changedSegments.push(editedSegment);
    }
  }

  return changedSegments;
};
