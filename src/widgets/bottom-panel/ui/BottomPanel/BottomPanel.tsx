import { ScrollArea, Tabs, Tooltip } from "@mantine/core";
import {
  IconAlignBoxLeftTop,
  IconTerminal2,
  IconTextRecognition,
} from "@tabler/icons-react";
import { useIntlayer } from "react-intlayer";
import { LogsContainer } from "../LogsContainer/LogsContainer";
import { SelectedSegmentEditor } from "../SelectedSegmentEditor/SelectedSegmentEditor";
import { SelectedSegmentRawJson } from "../SelectedSegmentRawJson/SelectedSegmentRawJson";
import classes from "./BottomPanel.module.css";

export const BottomPanel = () => {
  const content = useIntlayer("BottomPanel");

  return (
    <Tabs
      variant="pills"
      defaultValue="logs"
      orientation="vertical"
      classNames={classes}
      keepMounted={false}
      data-testid="BottomPanel"
    >
      <Tabs.List>
        <Tooltip.Group>
          <Tooltip label={content.logsTooltipLabel} position="right">
            <Tabs.Tab value="logs" data-testid="BottomPanel.LogsTab">
              <IconTerminal2 />
            </Tabs.Tab>
          </Tooltip>
          <Tooltip label={content.segmentTooltipLabel} position="right">
            <Tabs.Tab
              value="segmentEditor"
              data-testid="BottomPanel.SegmentEditorTab"
            >
              <IconTextRecognition />
            </Tabs.Tab>
          </Tooltip>
          <Tooltip label={content.rawTooltipLabel} position="right">
            <Tabs.Tab
              value="segmentRaw"
              data-testid="BottomPanel.SegmentRawTab"
            >
              <IconAlignBoxLeftTop />
            </Tabs.Tab>
          </Tooltip>
        </Tooltip.Group>
      </Tabs.List>
      <Tabs.Panel value="logs" keepMounted>
        <ScrollArea classNames={{ content: classes.content }}>
          <LogsContainer />
        </ScrollArea>
      </Tabs.Panel>
      <Tabs.Panel value="segmentEditor">
        <ScrollArea classNames={{ content: classes.content }}>
          <SelectedSegmentEditor />
        </ScrollArea>
      </Tabs.Panel>
      <Tabs.Panel value="segmentRaw">
        <ScrollArea classNames={{ content: classes.content }}>
          <SelectedSegmentRawJson />
        </ScrollArea>
      </Tabs.Panel>
    </Tabs>
  );
};
