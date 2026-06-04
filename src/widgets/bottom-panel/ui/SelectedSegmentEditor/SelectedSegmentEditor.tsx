import {
  selectSegment,
  setTranslationSegmentField,
  useTranslationStore,
} from "@/entities/translation";
import {
  selectIsTranslating,
  selectSelectedSegment,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { Placeholder } from "@/shared/ui/Placeholder";
import { useDebouncedCallback } from "@mantine/hooks";
import { useIntlayer } from "react-intlayer";
import { forEachObj } from "remeda";
import type { SegmentEditFormValues } from "../../model/segmentEditForm";
import { SegmentEditForm } from "../SegmentEditForm/SegmentEditForm";

export const SelectedSegmentEditor = () => {
  const content = useIntlayer("SelectedSegmentEditor");
  const isTranslating = useSessionStore(selectIsTranslating);
  const selectedSegment = useSessionStore(selectSelectedSegment);
  const segment = useTranslationStore(selectSegment(selectedSegment));

  const handleChange = useDebouncedCallback(
    (values: SegmentEditFormValues, previous: SegmentEditFormValues) => {
      forEachObj(values, (value, key) => {
        if (segment && value !== previous[key]) {
          setTranslationSegmentField(segment.id, value, key);
        }
      });
    },
    300,
  );

  if (!segment) {
    return (
      <Placeholder
        text={content.placeholderText}
        subtext={content.placeholderSubtext}
        data-testid="SelectedSegmentEditor.Placeholder"
      />
    );
  }

  return (
    <SegmentEditForm
      key={segment.id}
      segment={segment}
      onChange={handleChange}
      disabled={isTranslating}
    />
  );
};
