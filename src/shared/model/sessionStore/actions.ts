import { calculateResourcesPogress } from "@/shared/lib/calculateResourcesPogress";
import type { TranslationResource } from "../translation";
import { useSessionStore, type State } from "./store";

export const setSessionSelectedResource = (
  selectedResource: State["selectedResource"],
) => {
  useSessionStore.setState(
    { selectedResource },
    undefined,
    "setSessionSelectedResource",
  );
};

export const setSessionSelectedSegment = (
  selectedSegment: State["selectedSegment"],
) => {
  useSessionStore.setState(
    { selectedSegment },
    undefined,
    "setSessionSelectedSegment",
  );
};

export const setSessionStatus = (status: State["status"]) => {
  useSessionStore.setState({ status }, undefined, "setSessionStatus");
};

export const setSessionResourcesProgress = (
  resourcesProgress: State["resourcesProgress"],
) => {
  useSessionStore.setState(
    { resourcesProgress },
    undefined,
    "setSessionResourcesProgress",
  );
};

export const addSessionTranslatingResourceProgress = (count = 1) => {
  useSessionStore.setState(
    (state) => {
      const resourceProgress =
        state.resourcesProgress[state.translatingResource ?? ""];

      if (resourceProgress) {
        resourceProgress.done += count;
      }
    },
    undefined,
    "addSessionTranslatingResourceProgress",
  );
};

export const setSessionTranslatingResource = (
  translatingResource: State["translatingResource"],
) => {
  useSessionStore.setState(
    { translatingResource },
    undefined,
    "setSessionTranslatingResource",
  );
};

export const initSession = (resources: TranslationResource[]) => {
  useSessionStore.setState(
    (): State => {
      const resourcesProgress = calculateResourcesPogress(resources);
      const selectedResource = resources[0]?.id ?? null;

      return {
        ...useSessionStore.getInitialState(),
        resourcesProgress,
        selectedResource,
      };
    },
    undefined,
    "initSession",
  );
};
