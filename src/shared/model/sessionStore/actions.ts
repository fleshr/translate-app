import type { Id } from "../common";
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

export const setSessionTranslatingResource = (
  translatingResource: State["translatingResource"],
) => {
  useSessionStore.setState(
    { translatingResource },
    undefined,
    "setSessionTranslatingResource",
  );
};

export const initSession = (selectedResource: Id | null) => {
  useSessionStore.setState(
    { ...useSessionStore.getInitialState(), selectedResource },
    undefined,
    "initSession",
  );
};
