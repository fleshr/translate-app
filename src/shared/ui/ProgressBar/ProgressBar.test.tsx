import { render } from "@/shared/lib/testing";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProgressBar } from "./ProgressBar";

describe("shared/ui/ProgressBar", () => {
  it("should render title, progress and tooltip", async () => {
    const { getByTestId, findByTestId } = render(
      <ProgressBar title="Title" done={50} total={100} />,
    );

    await userEvent.hover(getByTestId("ProgressBar.Progress"));

    const title = getByTestId("ProgressBar.Title");
    const tooltip = await findByTestId("ProgressBar.Tooltip");
    const progressLabel = getByTestId("ProgressBar.ProgressLabel");

    expect(title).toHaveTextContent("Title");
    expect(tooltip).toHaveTextContent("50/100");
    expect(progressLabel).toHaveTextContent("50/100");
  });
});
