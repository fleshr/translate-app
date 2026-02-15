import {
  selectIsTranslating,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { Tabs } from "@mantine/core";
import { useIntlayer } from "react-intlayer";
import { GeneralSettings } from "../GeneralSettings/GeneralSettings";
import { ParsersManager } from "../ParsersManager/ParsersManager";
import { TranslatorSettings } from "../TranslatorSettings/TranslatorSettings";
import classes from "./SettingsTabs.module.css";

export const SettingsTabs = () => {
  const content = useIntlayer("SettingsTabs");
  const isTranslating = useSessionStore(selectIsTranslating);

  return (
    <Tabs
      variant="pills"
      orientation="vertical"
      defaultValue="general"
      classNames={classes}
      data-testid="SettingsTabs"
    >
      <Tabs.List>
        <Tabs.Tab value="general" data-testid="SettingsTabs.GeneralTab">
          {content.generalTabLabel}
        </Tabs.Tab>
        <Tabs.Tab
          value="translator"
          disabled={isTranslating}
          data-testid="SettingsTabs.TranslatorTab"
        >
          {content.translatorTabLabel}
        </Tabs.Tab>
        <Tabs.Tab
          value="parsers"
          disabled={isTranslating}
          data-testid="SettingsTabs.ParsersTab"
        >
          {content.parsersTabLabel}
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="general">
        <GeneralSettings />
      </Tabs.Panel>
      <Tabs.Panel value="translator">
        <TranslatorSettings />
      </Tabs.Panel>
      <Tabs.Panel value="parsers">
        <ParsersManager />
      </Tabs.Panel>
    </Tabs>
  );
};
