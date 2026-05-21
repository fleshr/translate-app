import {
  MantineProvider,
  v8CssVariablesResolver,
  type MantineProviderProps,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Locales, type LocalesValues } from "intlayer";
import type { PropsWithChildren } from "react";
import { IntlayerProvider } from "react-intlayer";
import { theme } from "./styles/theme";

export interface ProvidersProps extends PropsWithChildren {
  colorScheme?: MantineProviderProps["forceColorScheme"];
  defaultTheme?: MantineProviderProps["theme"];
  env?: MantineProviderProps["env"];
  locale?: LocalesValues;
}

export const Providers = (props: ProvidersProps) => {
  const {
    children,
    env = "default",
    defaultTheme = theme,
    locale = Locales.ENGLISH,
    colorScheme = undefined,
  } = props;

  return (
    <IntlayerProvider locale={locale}>
      <MantineProvider
        env={env}
        theme={defaultTheme}
        forceColorScheme={colorScheme}
        cssVariablesResolver={v8CssVariablesResolver}
      >
        <Notifications />
        {children}
      </MantineProvider>
    </IntlayerProvider>
  );
};
