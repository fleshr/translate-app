import { ProjectSchema, type Project } from "@/entities/project";
import {
  TranslationResourceSchema,
  type TranslationResource,
} from "@/entities/translation";
import { parseJson } from "@/shared/lib/json";
import { loadAsync } from "jszip";

export const parseProjectFile = async (
  file: File,
): Promise<{
  project: Project;
  resources: TranslationResource[];
  files: Record<string, Uint8Array<ArrayBuffer>>;
}> => {
  const zip = await loadAsync(file);

  if (!zip.files["project.json"] || !zip.files["resources.json"]) {
    throw new Error("Invalid translation file");
  }

  const projectJson = await zip.files["project.json"].async("string");
  const resourcesJson = await zip.files["resources.json"].async("string");

  const project = ProjectSchema.parse(parseJson(projectJson));
  const resources = TranslationResourceSchema.array().parse(
    parseJson(resourcesJson),
  );

  const files: Record<string, Uint8Array<ArrayBuffer>> = {};

  for (const resource of resources) {
    const { relPath, type } = resource;

    if (type === "file") {
      const zipPath = `resources/${relPath}`;

      if (!zip.files[zipPath]) {
        throw new Error("Resource file not found");
      }

      const buffer = await zip.files[zipPath].async("arraybuffer");
      files[relPath] = new Uint8Array(buffer);
    }
  }

  return { project, resources, files };
};
