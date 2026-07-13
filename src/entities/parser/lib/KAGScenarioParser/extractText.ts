import Encoding from "encoding-japanese";
import type { ExtractedSegment } from "../../model/parser/types";
import { nameRegex, textRegex } from "./constants";
import { isInsideSkip, prepareSkipPositions } from "./helpers";

export const extractText = (
  source: Uint8Array<ArrayBuffer>,
): ExtractedSegment[] => {
  const content = Encoding.convert(source, {
    type: "string",
    from: "SJIS",
    to: "UNICODE",
  });

  const skipPositions = prepareSkipPositions(content);
  const segments: ExtractedSegment[] = [];

  for (const match of content.matchAll(textRegex)) {
    const text = match.groups?.text;
    const pos = match.indices?.groups?.text;

    if (text && pos && !isInsideSkip(pos, skipPositions)) {
      segments.push({
        text,
        type: "file",
        position: { start: pos[0], end: pos[1] },
      });
    }
  }

  for (const match of content.matchAll(nameRegex)) {
    const text = match.groups?.name;
    const pos = match.indices?.groups?.name;

    if (text && pos && !isInsideSkip(pos, skipPositions)) {
      segments.push({
        text,
        type: "common",
        key: "names",
        position: { start: pos[0], end: pos[1] },
      });
    }
  }

  return segments;
};
