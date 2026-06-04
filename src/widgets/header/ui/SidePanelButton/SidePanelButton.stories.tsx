import { withStoreState } from "@/shared/lib/storybook";
import { getSettingsStoreStateMock } from "@/shared/mocks/settingsStore";
import { useSettingsStore } from "@/shared/model/settingsStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { SidePanelButton } from "./SidePanelButton";

const meta = {
  title: "widgets/header/SidePanelButton",
  component: SidePanelButton,
} satisfies Meta<typeof SidePanelButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SidePanelShown: Story = {};

export const SidePanelHidden: Story = {
  decorators: [
    withStoreState(
      useSettingsStore,
      getSettingsStoreStateMock({
        view: {
          showBottomPanel: true,
          showSidePanel: false,
        },
      }),
    ),
  ],
};
