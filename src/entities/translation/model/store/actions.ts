import type { Id } from "@/shared/model/common";
import { forEach, omit } from "remeda";
import type { TranslationResource } from "../resource/types";
import type { TranslationSegment } from "../segment/types";
import { useTranslationStore, type State } from "./store";

export const initTranslation = (resources: TranslationResource[]) => {
  useTranslationStore.setState(
    () => {
      const result: State = {
        resources: { byId: {}, allIds: [] },
        segments: { byId: {}, allIds: [] },
        relations: { resourceSegments: {}, segmentResource: {} },
      };

      for (const resource of resources) {
        result.resources.allIds.push(resource.id);
        result.resources.byId[resource.id] = omit(resource, ["segments"]);
        result.relations.resourceSegments[resource.id] = [];

        for (const segment of resource.segments) {
          result.segments.allIds.push(segment.id);
          result.segments.byId[segment.id] = segment;

          result.relations.segmentResource[segment.id] = resource.id;
          result.relations.resourceSegments[resource.id]!.push(segment.id);
        }
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
  field: Extract<
    keyof TranslationSegment,
    "originalText" | "machineTranslation" | "manualTranslation"
  > = "machineTranslation",
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
  field: Extract<
    keyof TranslationSegment,
    "originalText" | "machineTranslation" | "manualTranslation"
  > = "machineTranslation",
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
  field: Extract<
    keyof TranslationSegment,
    "originalText" | "machineTranslation" | "manualTranslation"
  > = "machineTranslation",
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
