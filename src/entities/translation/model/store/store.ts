import type { Id } from "@/shared/model/common";
import { isDeepEqual } from "remeda";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import type { TranslationBaseResource } from "../resource/types";
import type { TranslationSegment } from "../segment/types";

export interface State {
  resources: {
    byId: Record<Id, TranslationBaseResource>;
    allIds: Id[];
  };
  segments: {
    byId: Record<Id, TranslationSegment>;
    allIds: Id[];
  };
  relations: {
    resourceSegments: Record<Id, Id[]>;
    segmentResource: Record<Id, Id>;
  };
}

const defaultState: State = {
  resources: { byId: {}, allIds: [] },
  segments: { byId: {}, allIds: [] },
  relations: { resourceSegments: {}, segmentResource: {} },
};

export const useTranslationStore = createWithEqualityFn<State>()(
  devtools(
    immer(() => defaultState),
    { name: "translationStore" },
  ),
  isDeepEqual,
);
