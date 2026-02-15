import { stringifyJson } from "@/shared/lib/json";
import {
  selectSelectedSegment,
  useSessionStore,
} from "@/shared/model/sessionStore";
import {
  selectSegment,
  useTranslationStore,
} from "@/shared/model/translationStore";
import { Placeholder } from "@/shared/ui/Placeholder";
import { json } from "@codemirror/lang-json";
import CodeMirror from "@uiw/react-codemirror";
import { useIntlayer } from "react-intlayer";

export const SelectedSegmentRawJson = () => {
  const content = useIntlayer("SelectedSegmentRawJson");
  const selectedSegment = useSessionStore(selectSelectedSegment);
  const segment = useTranslationStore(selectSegment(selectedSegment));

  if (!segment) {
    return (
      <Placeholder
        text={content.placeholderText}
        subtext={content.placeholderSubtext}
        data-testid="SelectedSegmentRawJson.Placeholder"
      />
    );
  }

  return (
    <CodeMirror
      readOnly
      theme="dark"
      height="11.8rem"
      extensions={[json()]}
      style={{ fontSize: "14px" }}
      value={stringifyJson(segment)}
      data-testid="SelectedSegmentRawJson"
    />
  );
};
