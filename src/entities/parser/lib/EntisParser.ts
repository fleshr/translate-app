import escapeHtml from "escape-html";
import type {
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

  extractText(buffer: ArrayBuffer): ExtractedSegment[] {
    const textRegex = /text="([^"]+)"/dg;
    const nameRegex = /name="([^"]+)"/dg;

    const content = new TextDecoder("utf-8").decode(buffer);
    const segments: ExtractedSegment[] = [];

    for (const match of content.matchAll(textRegex)) {
      const text = match[1];
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
      const text = match[1];
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

    return segments;
  },

  replaceText(buffer: ArrayBuffer, replacements: Replacement[]): ArrayBuffer {
    let result = new TextDecoder("utf-8").decode(buffer);
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

    return new TextEncoder().encode(result).buffer;
  },
};
