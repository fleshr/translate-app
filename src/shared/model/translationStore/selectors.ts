import { filter, isDefined, map, pick, pipe } from "remeda";
import type {
  TranslationBaseResource,
  TranslationResource,
  TranslationSegment,
} from "../translation";
import { type State } from "./store";

export const selectBaseResource = (id: TranslationResource["id"]) => {
  return (state: State): TranslationBaseResource | undefined => {
    const resource = state.resources.byId[id];
    return resource && pick(resource, ["id", "name", "relPath"]);
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

export const selectResource = (id: TranslationResource["id"]) => {
  return (state: State): TranslationResource | undefined => {
    const resource = state.resources.byId[id];

    return (
      resource && {
        ...resource,
        segments: selectResourceSegments(id)(state),
      }
    );
  };
};

export const selectResources = (state: State): TranslationResource[] => {
  return pipe(
    state.resources.allIds,
    map((id) => selectResource(id)(state)),
    filter(isDefined),
  );
};

export const selectSegment = (id: TranslationSegment["id"] | null) => {
  return (state: State): TranslationSegment | undefined => {
    return id ? state.segments.byId[id] : undefined;
  };
};

export const selectResourceSegments = (id: TranslationSegment["id"] | null) => {
  return (state: State): TranslationSegment[] => {
    const list = id ? (state.resources.byId[id]?.segments ?? []) : [];

    return pipe(
      list,
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

export const selectUntranslatedSegments = (
  state: State,
): TranslationSegment[] => {
  return pipe(
    state.segments.allIds,
    map((id) => selectSegment(id)(state)),
    filter(isDefined),
    filter((segment) => {
      return !segment.machineTranslation && !segment.manualTranslation;
    }),
  );
};
