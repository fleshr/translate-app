import { describe, expect, it } from "vitest";
import { extractText } from "./extractText";

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

const sourceContent1 = new TextEncoder().encode(content1);
const sourceContent2 = new TextEncoder().encode(content2);

describe("entities/parser/lib/RenpyTlParser/extractText", () => {
  it("should extract text", () => {
    const result1 = extractText(sourceContent1);
    expect(result1).toMatchSnapshot();

    const result2 = extractText(sourceContent2);
    expect(result2).toMatchSnapshot();
  });
});
