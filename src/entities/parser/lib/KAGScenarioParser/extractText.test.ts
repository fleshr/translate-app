import { describe, expect, it } from "vitest";
import { extractText } from "./extractText";

const content = `
*test
[eval exp="test"]

@test
@name chara="name1"

; test comment
@name chara="name2"
text1
@e
*|

text2

@iscript
{
	function test()
	{
		var i = 0;
		return i;
	}
}
@endscript
`;

const sourceContent = new TextEncoder().encode(content);

describe("entities/parser/lib/KAGScenarioParser/extractText", () => {
  it("should extract text", () => {
    const result = extractText(sourceContent);
    expect(result).toMatchSnapshot();
  });
});
