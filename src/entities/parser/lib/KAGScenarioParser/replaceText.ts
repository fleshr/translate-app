import Encoding from "encoding-japanese";
import type { Replacement } from "../../model/parser/types";

export const replaceText = (
  source: Uint8Array<ArrayBuffer>,
  replacements: Replacement[],
): Uint8Array<ArrayBuffer> => {
  let result = Encoding.convert(source, {
    type: "string",
    from: "SJIS",
    to: "UNICODE",
  });
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

  const encodedResult = Encoding.convert(result, {
    type: "arraybuffer",
    from: "UNICODE",
    to: "SJIS",
  });

  return new Uint8Array(encodedResult);
};
