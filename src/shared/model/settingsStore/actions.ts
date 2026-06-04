import { useSettingsStore } from "./store";

export const toggleSettingsBottomPanel = () => {
  useSettingsStore.setState(
    (state) => {
      state.view.showBottomPanel = !state.view.showBottomPanel;
    },
    undefined,
    "toggleSettingsBottomPanel",
  );
};

export const toggleSettingsSidePanel = () => {
  useSettingsStore.setState(
    (state) => {
      state.view.showSidePanel = !state.view.showSidePanel;
    },
    undefined,
    "toggleSettingsSidePanel",
  );
};
