import { useUserScriptStore } from "./store";

export const setUserScriptCode = (code: string) => {
  useUserScriptStore.setState({ code }, undefined, "setUserScriptCode");
};
