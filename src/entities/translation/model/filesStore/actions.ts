import { useFilesStore } from "./store";

export const initFiles = (files: Record<string, Uint8Array<ArrayBuffer>>) => {
  useFilesStore.setState({ files }, undefined, "initFiles");
};
