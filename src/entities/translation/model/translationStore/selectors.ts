import type { Id, Progress } from "@/shared/model/common";
import { filter, isDefined, isEmpty, map, pipe } from "remeda";
import { isSegmentTranslated, isSegmentUntranslated } from "../../lib/helpers";
import type {
  TranslationBaseResource,
  TranslationResource,
} from "../resource/types";
import type { TranslationSegment } from "../segment/types";
import { type State } from "./store";

export const selectBaseResource = (id: Id) => {
  return (state: State): TranslationBaseResource | undefined => {
    return state.resources.byId[id];
  };
};

export const selectBaseResources = (
  state: State,
): TranslationBaseResource[] => {
  return pipe(
    state.resources.allIds,
    map((id) => selectBaseResource(id)(state)),
    filter(isDefined),
  );
};

export const selectResource = (id: Id) => {
  return (state: State): TranslationResource | undefined => {
    const resource = state.resources.byId[id];
    const segments = selectResourceSegments(id)(state);

    return resource && { ...resource, segments };
  };
};

export const selectResources = (state: State): TranslationResource[] => {
  return pipe(
    state.resources.allIds,
    map((id) => selectResource(id)(state)),
    filter(isDefined),
  );
};

export const selectSegment = (id: Id | null) => {
  return (state: State): TranslationSegment | undefined => {
    return id ? state.segments.byId[id] : undefined;
  };
};

export const selectResourceSegments = (id: Id | null) => {
  return (state: State): TranslationSegment[] => {
    if (!id || !state.relations.resourceSegments[id]) {
      return [];
    }

    return pipe(
      state.relations.resourceSegments[id],
      map((id) => selectSegment(id)(state)),
      filter(isDefined),
    );
  };
};

export const selectSegments = (state: State): TranslationSegment[] => {
  return pipe(
    state.segments.allIds,
    map((id) => selectSegment(id)(state)),
    filter(isDefined),
  );
};

export const selectUntranslatedResources = (
  state: State,
): TranslationResource[] => {
  return pipe(
    selectResources(state),
    map((resource) => ({
      ...resource,
      segments: filter(resource.segments, isSegmentUntranslated),
    })),
    filter(({ segments }) => !isEmpty(segments)),
  );
};

export const selectSegmentsProgress = (id: Id | null) => {
  return (state: State): Progress | undefined => {
    if (!id || !state.resources.byId[id]) {
      return;
    }

    const segments = selectResourceSegments(id)(state);
    const translated = segments.filter(isSegmentTranslated);

    return { done: translated.length, total: segments.length };
  };
};

export const selectResourcesProgress = (state: State): Progress => {
  const resources = state.resources.allIds;
  const done = resources.filter((id) => {
    const progress = selectSegmentsProgress(id)(state);

    return progress && progress.done === progress.total;
  });

  return { done: done.length, total: resources.length };
};
