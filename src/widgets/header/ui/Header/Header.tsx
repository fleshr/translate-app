import { Scroller, Tabs } from "@mantine/core";
import { useIntlayer } from "react-intlayer";
import { HomePanel } from "../HomePanel/HomePanel";
import { TranslatorPanel } from "../TranslatorPanel/TranslatorPanel";

export const Header = () => {
  const content = useIntlayer("Header");

  return (
    <Tabs defaultValue="home" variant="outline" data-testid="Header">
      <Tabs.List>
        <Tabs.Tab value="home" data-testid="Header.HomeTab">
          {content.homeTabLabel}
        </Tabs.Tab>
        <Tabs.Tab value="translator" data-testid="Header.TranslatorTab">
          {content.settingsTabLabel}
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="home" p="xs">
        <Scroller>
          <HomePanel />
        </Scroller>
      </Tabs.Panel>
      <Tabs.Panel value="translator" p="xs">
        <Scroller>
          <TranslatorPanel />
        </Scroller>
      </Tabs.Panel>
    </Tabs>
  );
};
