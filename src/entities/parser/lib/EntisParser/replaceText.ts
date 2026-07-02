import escapeHtml from "escape-html";
import type { Replacement } from "../../model/parser/types";

export const replaceText = (
  source: Uint8Array<ArrayBuffer>,
  replacements: Replacement[],
): Uint8Array<ArrayBuffer> => {
  let result = new TextDecoder("utf-8").decode(source);
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
};
