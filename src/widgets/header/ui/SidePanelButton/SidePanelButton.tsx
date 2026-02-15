import {
  selectViewShowSidePanel,
  toggleSettingsSidePanel,
  useSettingsStore,
} from "@/shared/model/settingsStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";
import {
  IconLayoutSidebar,
  IconLayoutSidebarFilled,
} from "@tabler/icons-react";
import { useIntlayer } from "react-intlayer";

export const SidePanelButton = () => {
  const content = useIntlayer("SidePanelButton");
  const showSidePanel = useSettingsStore(selectViewShowSidePanel);

  return (
    <ActionIconWithTooltip
      label={content.tooltipLabel}
      onClick={toggleSettingsSidePanel}
      data-testid="SidePanelButton"
    >
      {showSidePanel ? (
        <IconLayoutSidebar data-testid="SidePanelButton.HideIcon" />
      ) : (
        <IconLayoutSidebarFilled data-testid="SidePanelButton.ShowIcon" />
      )}
    </ActionIconWithTooltip>
  );
};
