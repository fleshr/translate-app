import { withStoreState } from "@/shared/lib/storybook";
import { useSettingsStore } from "@/shared/model/settingsStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BottomPanelButton } from "./BottomPanelButton";

const meta = {
  title: "widgets/header/BottomPanelButton",
  component: BottomPanelButton,
} satisfies Meta<typeof BottomPanelButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BottomPanelShown: Story = {};

export const BottomPanelHidden: Story = {
  decorators: [
    withStoreState(useSettingsStore, { view: { showBottomPanel: false } }),
  ],
};
