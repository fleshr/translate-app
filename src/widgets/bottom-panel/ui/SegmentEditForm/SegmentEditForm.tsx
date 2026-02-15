import type { BaseProps } from "@/shared/model/component";
import { type TranslationBaseSegment } from "@/shared/model/translation";
import { Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useIntlayer } from "react-intlayer";
import {
  segmentEditFormSchema,
  type SegmentEditFormValues,
} from "../../model/segmentEditForm";

interface SegmentEditFormProps {
  segment: TranslationBaseSegment;
  onChange?: (
    values: SegmentEditFormValues,
    previous: SegmentEditFormValues,
  ) => void;
  disabled?: boolean;
}

export const SegmentEditForm = (props: BaseProps<SegmentEditFormProps>) => {
  const {
    segment,
    onChange,
    disabled,
    "data-testid": dataTestId = "SegmentEditForm",
  } = props;
  const { originalText, machineTranslation, manualTranslation } = segment;
  const content = useIntlayer("SegmentEditForm");

  const form = useForm<SegmentEditFormValues>({
    onValuesChange: onChange,
    validate: zod4Resolver(segmentEditFormSchema),
    enhanceGetInputProps: () => ({ disabled }),
    initialValues: {
      originalText,
      machineTranslation,
      manualTranslation,
    },
  });

  return (
    <Stack gap={0} data-testid={dataTestId}>
      <Textarea
        label={content.originalTextLabel}
        autosize
        minRows={1}
        maxRows={4}
        readOnly
        data-testid={`${dataTestId}.originalText`}
        key={form.key("originalText")}
        {...form.getInputProps("originalText")}
      />
      <Textarea
        label={content.machineTranslationLabel}
        autosize
        minRows={1}
        maxRows={4}
        data-testid={`${dataTestId}.machineTranslation`}
        key={form.key("machineTranslation")}
        {...form.getInputProps("machineTranslation")}
      />
      <Textarea
        label={content.manualTranslationLabel}
        autosize
        minRows={1}
        maxRows={4}
        data-testid={`${dataTestId}.manualTranslation`}
        key={form.key("manualTranslation")}
        {...form.getInputProps("manualTranslation")}
      />
    </Stack>
  );
};
