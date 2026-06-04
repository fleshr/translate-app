import { selectParser, selectParsers, useParserStore } from "@/entities/parser";
import { initTranslation } from "@/entities/translation";
import { initProject } from "@/shared/model/projectStore";
import { initSession } from "@/shared/model/sessionStore";
import {
  Button,
  Checkbox,
  Group,
  Select,
  Stack,
  type ComboboxItem,
} from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
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
  const parsers = useParserStore(selectParsers);

  const items: ComboboxItem[] = parsers.map((parser) => ({
    label: `${parser.name} (${parser.version})`,
    value: parser.id,
  }));

  const form = useForm<CreateProjectFormValues>({
    validate: schemaResolver(CreateProjectFormSchema, { sync: true }),
    enhanceGetInputProps({ inputProps, field, form }) {
      if (field === "parserSaveFully") {
        const parser = parsers.find(
          (parser) => parser.id === form.values.parser,
        );

        return {
          ...inputProps,
          disabled: parser?.type !== "external",
        };
      }

      return inputProps;
    },
    initialValues: {
      parser: parsers[0]?.id ?? "",
      parserSaveFully: false,
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    const { parser, parserSaveFully } = values;
    const parserModule = selectParser(parser)(useParserStore.getState());

    const isSaveFully = parserSaveFully && parserModule?.type === "external";

    initSession(null);
    initTranslation([]);
    initProject({ parser: isSaveFully ? parserModule : parser });

    notifications.show({ message: content.createdNotification });
    onSubmit?.(values);
  });

  return (
    <form onSubmit={handleSubmit} data-testid="CreateProjectForm">
      <Stack>
        <Stack gap="sm">
          <Select
            data={items}
            label={content.parserSelectLabel}
            placeholder={content.parserSelectPlaceholder.value}
            data-testid="CreateProjectForm.ParserSelect"
            key={form.key("parser")}
            {...form.getInputProps("parser")}
          />
          <Checkbox
            label={content.parserSaveFullyCheckboxLabel}
            data-testid="CreateProjectForm.ParserSaveFullyCheckbox"
            key={form.key("parserSaveFully")}
            {...form.getInputProps("parserSaveFully")}
          />
        </Stack>
        <Group justify="flex-end">
          <Button
            variant="outline"
            onClick={onCancel}
            data-testid="CreateProjectForm.CancelButton"
          >
            {content.cancelButtonLabel}
          </Button>
          <Button type="submit" data-testid="CreateProjectForm.CreateButton">
            {content.createButtonLabel}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
