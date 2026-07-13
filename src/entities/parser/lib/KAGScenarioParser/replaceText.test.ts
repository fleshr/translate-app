import Encoding from "encoding-japanese";
import { describe, expect, it } from "vitest";
import { replaceText } from "./replaceText";

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

const sourceContent = Encoding.convert(content, {
  type: "arraybuffer",
  to: "SJIS",
});

describe("entities/parser/lib/KAGScenarioParser/replaceText", () => {
  it("should replace text", () => {
    const result = replaceText(new Uint8Array(sourceContent), [
      {
        position: {
          end: 93,
          start: 88,
        },
        original: "text1",
        translation: "test1",
      },
      {
        position: {
          end: 106,
          start: 101,
        },
        original: "text2",
        translation: "test2",
      },
      {
        position: {
          end: 50,
          start: 45,
        },
        original: "name1",
        translation: "test3",
      },
      {
        position: {
          end: 86,
          start: 81,
        },
        original: "name2",
        translation: "test4",
      },
    ]);

    expect(
      Encoding.convert(result, { type: "string", to: "UNICODE" }),
    ).toMatchSnapshot();
  });
});
