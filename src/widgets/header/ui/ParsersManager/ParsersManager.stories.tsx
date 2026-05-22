import { withStoreState } from "@/shared/lib/storybook";
import { getModuleExternalMock } from "@/shared/mocks/module";
import { useModuleStore } from "@/shared/model/moduleStore";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ParsersManager } from "./ParsersManager";

const meta = {
  title: "widgets/header/ParsersManager",
  component: ParsersManager,
} satisfies Meta<typeof ParsersManager>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithParsers: Story = {
  decorators: [
    withStoreState(useModuleStore, {
      parsers: {
        "test@1.0.0": getModuleExternalMock(),
        "test@2.0.0": getModuleExternalMock({ version: "2.0.0" }),
      },
    }),
  ],
};
