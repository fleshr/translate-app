import { useFilesStore } from "./store";

export const initFiles = (files: Record<string, ArrayBuffer>) => {
  useFilesStore.setState({ files }, undefined, "initFiles");
};
