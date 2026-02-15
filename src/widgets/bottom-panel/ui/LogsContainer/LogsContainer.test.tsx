import { logger } from "@/shared/lib/logger";
import { render } from "@/shared/lib/testing";
import { act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LogsContainer } from "./LogsContainer";

describe("widgets/bottom-panel/ui/LogsContainer", () => {
  it("should show placeholder if no logs", () => {
    const { queryByTestId } = render(<LogsContainer />);

    const placeholder = queryByTestId("LogsContainer.Placeholder");
    const logs = queryByTestId("LogsContainer");

    expect(placeholder).toBeInTheDocument();
    expect(logs).not.toBeInTheDocument();
  });

  it("should show logs", () => {
    const { queryByTestId } = render(<LogsContainer />);

    act(() => {
      logger.info("test");
    });

    const placeholder = queryByTestId("LogsContainer.Placeholder");
    const logs = queryByTestId("LogsContainer");
    const log = queryByTestId("LogsContainer.Log.0");

    expect(placeholder).not.toBeInTheDocument();
    expect(logs).toBeInTheDocument();
    expect(log).toHaveTextContent("[INFO] test");
  });

  it.todo("auto scroll test");
});
