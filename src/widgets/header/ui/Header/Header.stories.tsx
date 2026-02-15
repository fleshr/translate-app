import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";

const meta = {
  title: "widgets/header/Header",
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Home: Story = {
  play: async ({ canvas, userEvent }) => {
    const tab = canvas.getByTestId("Header.HomeTab");
    await userEvent.click(tab);
  },
};

export const Translator: Story = {
  play: async ({ canvas, userEvent }) => {
    const tab = canvas.getByTestId("Header.TranslatorTab");
    await userEvent.click(tab);
  },
};
