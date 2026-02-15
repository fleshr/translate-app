import { render } from "@/shared/lib/testing";
import { describe, expect, it } from "vitest";
import { Placeholder } from "./Placeholder";

describe("shared/ui/Placeholder", () => {
  it("should render text", () => {
    const { getByTestId, queryByTestId } = render(<Placeholder text="Text" />);

    const text = getByTestId("Placeholder.Text");
    const subtext = queryByTestId("Placeholder.Subtext");

    expect(text).toHaveTextContent("Text");
    expect(subtext).toBeNull();
  });

  it("should render text and subtext", () => {
    const { getByTestId } = render(
      <Placeholder text="Text" subtext="Subtext" />,
    );

    const text = getByTestId("Placeholder.Text");
    const subtext = getByTestId("Placeholder.Subtext");

    expect(text).toHaveTextContent("Text");
    expect(subtext).toHaveTextContent("Subtext");
  });
});
