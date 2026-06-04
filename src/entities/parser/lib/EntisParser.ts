import escapeHtml from "escape-html";
import type {
  ExtractedData,
  ExtractedSegment,
  Parser,
  Replacement,
} from "../model/parser/types";

export const EntisParser: Parser = {
  name: "Entis Parser",
  version: "0.0.1",
  shortName: "entis",

  checkFile(file: File): boolean {
    return file.name.endsWith(".srcxml");
  },

  extractText(array: Uint8Array): ExtractedData {
    const textRegex = /text="([^"]+)"/dg;
    const nameRegex = /name="([^"]+)"/dg;

    const content = new TextDecoder("utf-8").decode(array);
    const segments: ExtractedSegment[] = [];

    for (const match of content.matchAll(textRegex)) {
      const text = match[1]?.replaceAll("\\n:", "");
      const start = match.indices?.[1]?.[0];
      const end = match.indices?.[1]?.[1];

      if (text && start && end) {
        segments.push({
          text,
          type: "file",
          position: { start, end },
        });
      }
    }

    for (const match of content.matchAll(nameRegex)) {
      const text = match[1]?.replaceAll("\\n:", "");
      const start = match.indices?.[1]?.[0];
      const end = match.indices?.[1]?.[1];

      if (text && start && end) {
        segments.push({
          text,
          type: "common",
          key: "names",
          position: { start, end },
        });
      }
    }

    return { content, segments };
  },

  replaceText(content: string, replacements: Replacement[]): Uint8Array {
    let result = content;
    const sortedReplacements = [...replacements].sort(
      (a, b) => b.position.start - a.position.start,
    );

    for (const replacement of sortedReplacements) {
      const { translation, position } = replacement;

      result =
        result.slice(0, position.start) +
        escapeHtml(translation) +
        result.slice(position.end);
    }

    return new TextEncoder().encode(result);
  },
};
