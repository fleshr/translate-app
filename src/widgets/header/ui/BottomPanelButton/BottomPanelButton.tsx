import {
  selectViewShowBottomPanel,
  toggleSettingsBottomPanel,
  useSettingsStore,
} from "@/shared/model/settingsStore";
import { ActionIconWithTooltip } from "@/shared/ui/ActionIconWithTooltip";

import {
  IconLayoutBottombar,
  IconLayoutBottombarFilled,
} from "@tabler/icons-react";
import { useIntlayer } from "react-intlayer";

export const BottomPanelButton = () => {
  const content = useIntlayer("BottomPanelButton");
  const showBottomPanel = useSettingsStore(selectViewShowBottomPanel);

  return (
    <ActionIconWithTooltip
      label={content.tooltipLabel}
      onClick={toggleSettingsBottomPanel}
      data-testid="BottomPanelButton"
    >
      {showBottomPanel ? (
        <IconLayoutBottombar data-testid="BottomPanelButton.HideIcon" />
      ) : (
        <IconLayoutBottombarFilled data-testid="BottomPanelButton.ShowIcon" />
      )}
    </ActionIconWithTooltip>
  );
};
