/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Providers } from "@/app/providers";
import { theme } from "@/app/styles/theme";
import { Portal } from "@mantine/core";
import type { Decorator } from "@storybook/react-vite";
import { Locales } from "intlayer";
import { mergeDeep } from "remeda";

const defaultTheme = mergeDeep(theme, {
  components: {
    Portal: Portal.extend({
      defaultProps: { target: "#storybook-root" },
    }),
  },
});

export const withProviders: Decorator = (Story, context) => {
  const locale = context.globals.locale ?? Locales.ENGLISH;
  const scheme = context.globals.theme ?? "light";

  return (
    <Providers locale={locale} colorScheme={scheme} defaultTheme={defaultTheme}>
      <Story />
    </Providers>
  );
};
