import type { BaseProps } from "@/shared/model/component";
import { javascript } from "@codemirror/lang-javascript";
import { Box, Stack } from "@mantine/core";
import CodeMirror from "@uiw/react-codemirror";
import { setUserScriptCode } from "../../model/scriptStore/actions";
import { selectCode } from "../../model/scriptStore/selectors";
import { useUserScriptStore } from "../../model/scriptStore/store";
import { EditorToolbar } from "../EditorToolbar/EditorToolbar";

export const ScriptEditor = (props: BaseProps) => {
  const { "data-testid": dataTestId = "ScriptEditor" } = props;
  const userCode = useUserScriptStore(selectCode);

  return (
    <Stack gap={0} data-testid={dataTestId}>
      <Box p="xs">
        <EditorToolbar data-testid={`${dataTestId}.EditorToolbar`} />
      </Box>
      <CodeMirror
        theme="dark"
        height="60dvh"
        value={userCode}
        onChange={setUserScriptCode}
        extensions={[javascript()]}
        style={{ fontSize: "14px" }}
        data-testid={`${dataTestId}.CodeContainer`}
      />
    </Stack>
  );
};
