import { describe, expect, it } from "vitest";
import { replaceText } from "./replaceText";

const content1 = `
# TODO: Translation updated at 2026-05-26 10:11

# game/script.rpy:27
translate russian start_a170b500:

    # e "You've created a new Ren'Py game."
    e ""

# game/script.rpy:29
translate russian start_f41f55d7:

    # e "Once you add a story, pictures, and music, you can release it to the world!"
    e ""
`;

const content2 = `
# TODO: Translation updated at 2026-05-26 10:11

translate russian strings:

    # game/options.rpy:15
    old "Test"
    new ""
`;

const buffer1 = new TextEncoder().encode(content1).buffer;
const buffer2 = new TextEncoder().encode(content2).buffer;

describe("entities/parser/lib/RenpyTlParser/replaceText", () => {
  it("should replace text", () => {
    const result1 = replaceText(buffer1, [
      {
        position: { end: 157, start: 157 },
        original: "You've created a new Ren'Py game.",
        translation: "test1",
      },
      {
        position: { end: 309, start: 309 },
        original:
          "Once you add a story, pictures, and music, you can release it to the world!",
        translation: "test2",
      },
    ]);

    expect(new TextDecoder("utf-8").decode(result1)).toMatchSnapshot();

    const result2 = replaceText(buffer2, [
      {
        position: { end: 128, start: 128 },
        original: "Test",
        translation: "test1",
      },
    ]);

    expect(new TextDecoder("utf-8").decode(result2)).toMatchSnapshot();
  });
});
