import {
  selectViewShowBottomPanel,
  selectViewShowSidePanel,
  useSettingsStore,
} from "@/shared/model/settingsStore";
import { BottomPanel } from "@/widgets/bottom-panel";
import { Header } from "@/widgets/header";
import { TranslationResources } from "@/widgets/translation-resources";
import { TranslationTable } from "@/widgets/translation-table";
import { AppShell, ScrollArea } from "@mantine/core";
import { useWindowEvent } from "@mantine/hooks";
import { useLocale } from "react-intlayer";
import {
  BOTTOM_PANEL_HEIGHT,
  SIDEBAR_WIDTH,
  TOP_PANEL_HEIGHT,
} from "../../config";
import { Providers } from "../../providers";

export const App = () => {
  const { locale } = useLocale();
  const showBottomPanel = useSettingsStore(selectViewShowBottomPanel);
  const showSidePanel = useSettingsStore(selectViewShowSidePanel);

  useWindowEvent("beforeunload", (e) => {
    e.preventDefault();
  });

  return (
    <Providers locale={locale}>
      <AppShell
        header={{ height: TOP_PANEL_HEIGHT }}
        footer={{
          height: BOTTOM_PANEL_HEIGHT,
          collapsed: !showBottomPanel,
        }}
        navbar={{
          width: SIDEBAR_WIDTH,
          breakpoint: "xs",
          collapsed: {
            mobile: !showSidePanel,
            desktop: !showSidePanel,
          },
        }}
      >
        <AppShell.Header>
          <Header />
        </AppShell.Header>
        <AppShell.Navbar>
          <ScrollArea>
            <TranslationResources />
          </ScrollArea>
        </AppShell.Navbar>
        <AppShell.Main>
          <TranslationTable />
        </AppShell.Main>
        <AppShell.Footer>
          <BottomPanel />
        </AppShell.Footer>
      </AppShell>
    </Providers>
  );
};
