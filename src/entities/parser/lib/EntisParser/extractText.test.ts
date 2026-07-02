import { describe, expect, it } from "vitest";
import { extractText } from "./extractText";

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

const buffer = new TextEncoder().encode(content).buffer;

describe("entities/parser/lib/EntisParser/extractText", () => {
  it("should extract text", () => {
    const result = extractText(buffer);
    expect(result).toMatchSnapshot();
  });
});
