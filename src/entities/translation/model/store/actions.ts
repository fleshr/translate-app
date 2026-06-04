import type { Id } from "@/shared/model/common";
import { forEach } from "remeda";
import type {
  TranslationBaseSegment,
  TranslationResource,
  TranslationSegment,
} from "../translation/types";
import { useTranslationStore, type State } from "./store";

export const initTranslation = (resources: TranslationResource[]) => {
  useTranslationStore.setState(
    () => {
      const result: State = {
        resources: { byId: {}, allIds: [] },
        segments: { byId: {}, allIds: [] },
      };

      for (const resource of resources) {
        const { id, segments } = resource;
        const segmentsIds: Id[] = [];

        for (const segment of segments) {
          const { id } = segment;

          segmentsIds.push(id);
          result.segments.allIds.push(id);
          result.segments.byId[id] = segment;
        }

        result.resources.allIds.push(id);
        result.resources.byId[id] = {
          ...resource,
          segments: segmentsIds,
        };
      }

      return result;
    },
    undefined,
    "initTranslation",
  );
};

export const setTranslationSegmentField = (
  id: Id,
  translation: string,
  field: Exclude<keyof TranslationBaseSegment, "id"> = "machineTranslation",
) => {
  useTranslationStore.setState(
    (state) => {
      if (state.segments.byId[id]) {
        state.segments.byId[id][field] = translation;
      }
    },
    undefined,
    "setTranslationSegmentField",
  );
};

export const setTranslationSegmentsField = (
  translations: { id: Id; translation: string }[],
  field: Exclude<keyof TranslationBaseSegment, "id"> = "machineTranslation",
) => {
  useTranslationStore.setState(
    (state) => {
      forEach(translations, ({ id, translation }) => {
        if (state.segments.byId[id]) {
          state.segments.byId[id][field] = translation;
        }
      });
    },
    undefined,
    "setTranslationSegmentsField",
  );
};

export const setTranslationSegments = (segments: TranslationSegment[]) => {
  useTranslationStore.setState(
    (state) => {
      forEach(segments, (segment) => {
        const { id } = segment;

        if (state.segments.byId[id]) {
          state.segments.byId[id] = segment;
        }
      });
    },
    undefined,
    "setTranslationSegments",
  );
};

export const replaceTranslationSegmentsField = (
  ids: Id[],
  searchText: string,
  replaceText: string,
  field: Exclude<keyof TranslationBaseSegment, "id"> = "machineTranslation",
) => {
  useTranslationStore.setState(
    (state) => {
      forEach(ids, (id) => {
        const segement = state.segments.byId[id];

        if (segement) {
          segement[field] = segement[field].replaceAll(searchText, replaceText);
        }
      });
    },
    undefined,
    "replaceTranslationSegmentsField",
  );
};
