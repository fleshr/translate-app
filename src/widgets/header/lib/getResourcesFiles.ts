import type { TranslationResource } from "@/entities/translation";

export const getResourcesFiles = async (
  files: File[],
  resources: TranslationResource[],
): Promise<Record<string, Uint8Array<ArrayBuffer>>> => {
  const filesMap: Record<string, File> = {};
  const resourceFiles: Record<string, Uint8Array<ArrayBuffer>> = {};

  for (const file of files) {
    filesMap[file.webkitRelativePath] = file;
  }

  for (const resource of resources) {
    const { type, relPath } = resource;

    if (type === "file") {
      if (!filesMap[relPath]) {
        throw new Error("Resource file not found");
      }

      const buffer = await filesMap[relPath].arrayBuffer();
      resourceFiles[relPath] = new Uint8Array(buffer);
    }
  }

  return resourceFiles;
};
