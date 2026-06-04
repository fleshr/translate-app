import { isDeepEqual } from "remeda";
import type { DistributedOmit } from "type-fest";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { createWithEqualityFn } from "zustand/traditional";
import type {
  TranslationResource,
  TranslationSegment,
} from "../translation/types";

type StoreResource = DistributedOmit<TranslationResource, "segments"> & {
  segments: TranslationSegment["id"][];
};

export interface State {
  resources: {
    byId: Record<TranslationResource["id"], StoreResource>;
    allIds: TranslationResource["id"][];
  };
  segments: {
    byId: Record<TranslationSegment["id"], TranslationSegment>;
    allIds: TranslationSegment["id"][];
  };
}

const defaultState: State = {
  resources: { byId: {}, allIds: [] },
  segments: { byId: {}, allIds: [] },
};

export const useTranslationStore = createWithEqualityFn<State>()(
  devtools(
    immer(() => defaultState),
    { name: "translationStore" },
  ),
  isDeepEqual,
);
