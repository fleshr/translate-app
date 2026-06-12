import type { TranslationResource } from "@/entities/translation";
import { stringifyJson } from "@/shared/lib/json";
import type { Project } from "@/shared/model/project";
import JSZip from "jszip";

export const generateProjectFile = async (
  files: Record<string, ArrayBuffer>,
  project: Project,
  resources: TranslationResource[],
): Promise<Blob> => {
  const zip = new JSZip();

  zip.file("project.json", stringifyJson(project));
  zip.file("resources.json", stringifyJson(resources));

  for (const resource of resources) {
    const { relPath, type } = resource;

    if (type === "file") {
      if (!files[relPath]) {
        throw new Error("Resource file not found");
      }

      zip.file(`resources/${relPath}`, files[relPath]);
    }
  }

  return zip.generateAsync({ type: "blob" });
};
