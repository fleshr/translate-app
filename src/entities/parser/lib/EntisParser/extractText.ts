import type { ExtractedSegment } from "../../model/parser/types";

export const extractText = (buffer: ArrayBuffer): ExtractedSegment[] => {
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
};
