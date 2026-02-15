import { selectBaseModules, useModuleStore } from "@/shared/model/moduleStore";
import { initProject } from "@/shared/model/projectStore";
import { initSession } from "@/shared/model/sessionStore";
import { initTranslation } from "@/shared/model/translationStore";
import { Button, Group, Select, Stack, type ComboboxItem } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useIntlayer } from "react-intlayer";
import {
  CreateProjectFormSchema,
  type CreateProjectFormValues,
} from "../../model/createProjectForm";

interface CreateProjectFormProps {
  onCancel?: () => void;
  onSubmit?: (values: CreateProjectFormValues) => void;
}

export const CreateProjectForm = (props: CreateProjectFormProps) => {
  const { onCancel, onSubmit } = props;
  const content = useIntlayer("CreateProjectForm");
  const parsers = useModuleStore(selectBaseModules("parsers"));

  const items: ComboboxItem[] = parsers.map((parser) => ({
    label: `${parser.name} (${parser.version})`,
    value: parser.id,
  }));

  const form = useForm<CreateProjectFormValues>({
    validate: zod4Resolver(CreateProjectFormSchema),
  });

  const handleSubmit = form.onSubmit((values) => {
    initSession([]);
    initProject(values);
    initTranslation([]);

    notifications.show({ message: content.createdNotification });
    onSubmit?.(values);
  });

  return (
    <form onSubmit={handleSubmit} data-testid="CreateProjectForm">
      <Stack>
        <Select
          data={items}
          label={content.parserSelectLabel}
          placeholder={content.parserSelectPlaceholder.value}
          data-testid="CreateProjectForm.ParserSelect"
          key={form.key("parser")}
          {...form.getInputProps("parser")}
        />
        <Group justify="flex-end">
          <Button
            variant="outline"
            onClick={onCancel}
            data-testid="CreateProjectForm.CancelButton"
          >
            {content.cancelButtonLabel}
          </Button>
          <Button
            type="submit"
            disabled={!form.isValid()}
            data-testid="CreateProjectForm.CreateButton"
          >
            {content.createButtonLabel}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
