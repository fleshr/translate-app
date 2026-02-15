import type { Decorator } from "@storybook/react-vite";

export const withWidth = (width = 300): Decorator => {
  return (Story) => {
    return (
      <div style={{ width: `${width}px` }}>
        <Story />
      </div>
    );
  };
};
