import { render } from "@/shared/lib/testing";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("app/ui/App", () => {
  it("should render all components", () => {
    const { getByTestId } = render(<App />);

    const header = getByTestId("Header");
    const table = getByTestId("TranslationTable");
    const resources = getByTestId("TranslationResources");
    const bottomPanel = getByTestId("BottomPanel");

    expect(header).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(resources).toBeInTheDocument();
    expect(bottomPanel).toBeInTheDocument();
  });

  it.todo("panels collapse");
  it.todo("page level alert");
});
