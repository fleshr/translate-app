import { useTranslationProcessStore, type State } from "./store";

export const setTranslationProcessStatus = (status: State["status"]) => {
  useTranslationProcessStore.setState(
    { status },
    undefined,
    "setTranslationProcessStatus",
  );
};

export const setTranslationProcessTranslatingResource = (
  translatingResource: State["translatingResource"],
) => {
  useTranslationProcessStore.setState(
    { translatingResource },
    undefined,
    "setTranslationProcessTranslatingResource",
  );
};
