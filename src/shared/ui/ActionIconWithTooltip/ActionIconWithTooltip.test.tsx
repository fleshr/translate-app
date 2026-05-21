import { render } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ActionIconWithTooltip } from "./ActionIconWithTooltip";

describe("shared/ui/ActionIconWithTooltip", () => {
  it("should render button and tooltip", async () => {
    const { getByTestId, findByTestId } = render(
      <ActionIconWithTooltip label="Tooltip">Button</ActionIconWithTooltip>,
    );

    const button = getByTestId("ActionIconWithTooltip");
    await userEvent.hover(button);
    const tooltip = await findByTestId("ActionIconWithTooltip.Tooltip");

    expect(button).toHaveTextContent("Button");
    expect(tooltip).toHaveTextContent("Tooltip");
  });
});
