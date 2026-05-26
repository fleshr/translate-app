import type {
  ExtractedData,
  ExtractedSegment,
  Parser,
  Replacement,
} from "@/shared/model/parser";

export const RenpyTlParser: Parser = {
  name: "Renpy Translation Parser",
  version: "0.0.1",
  shortName: "renpy-tl",

  checkFile(file: File): boolean {
    return file.name.endsWith(".rpy");
  },

  extractText(array: Uint8Array): ExtractedData {
    const stringRegex = /^[ ]{4}old "(?<old>.*)"\n^[ ]{4}new "(?<new>.*)"/dgm;
    const dialogueRegex =
      /^[ ]{4}# (?:[\w\d]+[ ])*"(?<old>.*)"\n^[ ]{4}(?:[\w\d]+[ ])*"(?<new>.*)"/dgm;

    const content = new TextDecoder("utf-8").decode(array);

    const stringMatches = content.matchAll(stringRegex);
    const dialogueMatches = content.matchAll(dialogueRegex);

    const segments: ExtractedSegment[] = [];

    for (const match of [...dialogueMatches, ...stringMatches]) {
      const text = match.groups?.old;
      const pos = match.indices?.groups?.new;

      if (text && pos) {
        segments.push({
          type: "file",
          text,
          position: { start: pos[0], end: pos[1] },
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
        translation +
        result.slice(position.end);
    }

    return new TextEncoder().encode(result);
  },
};
