import {
  ActionIcon,
  Center,
  createTheme,
  Modal,
  ScrollArea,
  Select,
  Tooltip,
} from "@mantine/core";

export const theme = createTheme({
  autoContrast: true,
  cursorType: "pointer",
  primaryColor: "dark",
  defaultRadius: "sm",
  components: {
    ActionIcon: ActionIcon.extend({
      defaultProps: {
        variant: "subtle",
        size: "lg",
      },
    }),
    ScrollArea: ScrollArea.extend({
      defaultProps: {
        scrollbarSize: 6,
        h: "100%",
      },
    }),
    Tooltip: Tooltip.extend({
      defaultProps: {
        withArrow: true,
        openDelay: 300,
      },
    }),
    TooltipGroup: Tooltip.Group.extend({
      defaultProps: {
        openDelay: 300,
      },
    }),
    Select: Select.extend({
      defaultProps: {
        allowDeselect: false,
        checkIconPosition: "right",
      },
    }),
    Modal: Modal.extend({
      defaultProps: {
        centered: true,
      },
    }),
    Center: Center.extend({
      defaultProps: {
        h: "100%",
      },
    }),
  },
});
