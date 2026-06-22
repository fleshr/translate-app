import { useProjectStore, type State } from "./store";

export const initProject = (project: State) => {
  useProjectStore.setState(project, undefined, "initProject");
};
