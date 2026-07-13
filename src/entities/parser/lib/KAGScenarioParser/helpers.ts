import { scriptRegex } from "./constants";

export const prepareSkipPositions = (content: string) => {
  const skipPositions: [number, number][] = [];

  for (const match of content.matchAll(scriptRegex)) {
    const scriptPos = match.indices?.groups?.script;

    if (scriptPos) {
      skipPositions.push(scriptPos);
    }
  }

  return skipPositions;
};

export const isInsideSkip = (
  position: [number, number],
  skipPositions: [number, number][],
) => {
  const [start, end] = position;

  for (const skipPos of skipPositions) {
    if (start >= skipPos[0] && end <= skipPos[1]) {
      return true;
    }
  }

  return false;
};
