import { describe, expect, it } from "vitest";
import { EntisParser } from "./EntisParser";

const content = `
<?xml version="1.0" encoding="utf-8"?>
<xscript>
	<debug editor="test" src="test.txt"/>
	<code>
		<description @l="1" text="testText1"/>
		<wait_chgmv/>
		<bg @l="6" src="bg08c" time="1000"/>
		<bgm @l="7" src="bgm06" volume="1."/>
		<se @l="8" buf="1" src="se006" volume="1."/>
		<wait_chgmv/>
		<bg @l="9" src="bg09c" time="1000"/>
		<waitse @l="10" buf="1"/>
		<chgmview @l="11" mode="0"/>
		<msg @l="13" char_id="-1" frame_id="0" name="testName1" text="testText2" voices="v00000"/>
		<msg @l="14" char_id="0" frame_id="0" name="testName2" text="testText3" voices="v01000"/>
		<return @l="103" value=""/>
	</code>
</xscript>
`;

describe("entities/parser/lib/EntisParser", () => {
  it("should check file", () => {
    expect(EntisParser.checkFile(new File(["test"], "test.srcxml"))).toBe(true);
    expect(EntisParser.checkFile(new File(["test"], "test.js"))).toBe(false);
  });

  it("should extract text", () => {
    const result = EntisParser.extractText(new TextEncoder().encode(content));

    expect(result).toMatchSnapshot();
  });

  it("should replace text", () => {
    const result = EntisParser.replaceText(content, [
      {
        position: { end: 134, start: 125 },
        original: "testText1",
        translation: "test1",
      },
      {
        position: { end: 467, start: 458 },
        original: "testText2",
        translation: "test2",
      },
      {
        position: { end: 559, start: 550 },
        original: "testText3",
        translation: "test3",
      },
      {
        position: { end: 450, start: 441 },
        original: "testName1",
        translation: "test4",
      },
      {
        position: { end: 542, start: 533 },
        original: "testName2",
        translation: "test5",
      },
    ]);

    expect(new TextDecoder("utf-8").decode(result)).toMatchSnapshot();
  });
});
