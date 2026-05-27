import { Divider, Group, Tooltip } from "@mantine/core";
import { BottomPanelButton } from "../BottomPanelButton/BottomPanelButton";
import { ExportButton } from "../ExportButton/ExportButton";
import { ImportButton } from "../ImportButton/ImportButton";
import { NewProjectButton } from "../NewProjectButton/NewProjectButton";
import { OpenProjectButton } from "../OpenProjectButton/OpenProjectButton";
import { SaveProjectButton } from "../SaveProjectButton/SaveProjectButton";
import { ScriptButton } from "../ScriptButton/ScriptButton";
import { SearchButton } from "../SearchButton/SearchButton";
import { SettingsButton } from "../SettingsButton/SettingsButton";
import { SidePanelButton } from "../SidePanelButton/SidePanelButton";

export const HomePanel = () => {
  return (
    <Tooltip.Group>
      <Group gap="xs" wrap="nowrap">
        <NewProjectButton />
        <OpenProjectButton />
        <SaveProjectButton />
        <Divider orientation="vertical" />
        <ImportButton />
        <ExportButton />
        <Divider orientation="vertical" />
        <SearchButton />
        <ScriptButton />
        <Divider orientation="vertical" />
        <SidePanelButton />
        <BottomPanelButton />
        <Divider orientation="vertical" />
        <SettingsButton />
      </Group>
    </Tooltip.Group>
  );
};
