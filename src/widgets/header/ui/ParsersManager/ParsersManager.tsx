import { readFile } from "@/shared/lib/file";
import { createParserFromCode } from "@/shared/lib/module";
import {
  addModule,
  removeModule,
  selectModules,
  useModuleStore,
} from "@/shared/model/moduleStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import { Button, Card, Group, Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCirclePlus, IconDownload, IconTrash } from "@tabler/icons-react";
import { fileOpen } from "browser-fs-access";
import { useIntlayer } from "react-intlayer";

export const ParsersManager = () => {
  const content = useIntlayer("ParsersManager");
  const parsers = useModuleStore(selectModules("parsers"));

  const handleAddParser = async () => {
    try {
      const file = await fileOpen({
        mimeTypes: ["text/javascript"],
        extensions: [".js", ".mjs"],
      });

      const code = await readFile(file);
      const { name, version, shortName } = await createParserFromCode(code);
      const id = `${shortName}@${version}`;

      addModule("parsers", {
        id,
        name,
        version,
        shortName,
        code,
        type: "external",
      });

      notifications.show({ message: content.successMessage });
    } catch {
      notifications.show({ message: content.errorMessage });
    }
  };

  const handleRemoveParser = (id: string) => () => {
    removeModule("parsers", id);
    notifications.show({ message: content.removeMessage });
  };

  return (
    <Stack h="100%" data-testid="ParsersManager">
      <Stack flex={1}>
        <Stack gap="xs" flex={1}>
          <Text size="sm">{content.listTitle}</Text>
          <Card withBorder py={4} px={8} flex={1}>
            {parsers.map((parser, index) => (
              <Group
                p={4}
                key={parser.id}
                justify="space-between"
                data-testid={`ParsersManager.Item.${index}`}
              >
                <Text size="sm">
                  {parser.name} ({parser.version})
                </Text>
                <ActionIconWithTooltip
                  data-testid={`ParsersManager.Item.${index}.RemoveButton`}
                  onClick={handleRemoveParser(parser.id)}
                  label={content.removeTooltip}
                  variant="filled"
                  color="red"
                  size="xs"
                >
                  <IconTrash size={14} />
                </ActionIconWithTooltip>
              </Group>
            ))}
          </Card>
        </Stack>
      </Stack>
      <Group grow>
        <Button
          data-testid="ParsersManager.DownloadParsersButton"
          leftSection={<IconDownload size={20} />}
          onClick={handleAddParser}
          disabled
        >
          {content.downloadParsersLabel}
        </Button>
        <Button
          onClick={handleAddParser}
          leftSection={<IconCirclePlus size={20} />}
          data-testid="ParsersManager.AddParserButton"
        >
          {content.addParserLabel}
        </Button>
      </Group>
    </Stack>
  );
};
