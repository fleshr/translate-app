import type { ExtractedSegment } from "../../model/parser/types";

export const extractText = (
  source: Uint8Array<ArrayBuffer>,
): ExtractedSegment[] => {
  const stringRegex = /^[ ]{4}old "(?<old>.*)"\n^[ ]{4}new "(?<new>.*)"/dgm;
  const dialogueRegex =
    /^[ ]{4}# (?:[\w\d]+[ ])*"(?<old>.*)"\n^[ ]{4}(?:[\w\d]+[ ])*"(?<new>.*)"/dgm;

  const content = new TextDecoder("utf-8").decode(source);

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

  return segments;
};
