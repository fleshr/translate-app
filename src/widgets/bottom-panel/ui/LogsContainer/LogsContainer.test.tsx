import { render, resetStore } from "@/shared/lib/testing";
import { getLogsStoreStateMock } from "@/shared/mocks/logsStore";
import { useLogsStore } from "@/shared/model/logsStore";
import { afterEach, describe, expect, it } from "vitest";
import { LogsContainer } from "./LogsContainer";

describe("widgets/bottom-panel/ui/LogsContainer", () => {
  afterEach(() => {
    resetStore(useLogsStore);
  });

  it("should show placeholder if no logs", () => {
    useLogsStore.setState({ logs: [] });
    const { queryByTestId } = render(<LogsContainer />);

    const placeholder = queryByTestId("LogsContainer.Placeholder");
    const logs = queryByTestId("LogsContainer");

    expect(placeholder).toBeInTheDocument();
    expect(logs).not.toBeInTheDocument();
  });

  it("should show logs", () => {
    useLogsStore.setState(getLogsStoreStateMock());
    const { queryByTestId } = render(<LogsContainer />);

    const logs = queryByTestId("LogsContainer");
    const logInfo = queryByTestId("LogsContainer.Log.0");
    const logDebug = queryByTestId("LogsContainer.Log.1");
    const logError = queryByTestId("LogsContainer.Log.2");

    expect(logs).toBeInTheDocument();
    expect(logInfo).toHaveTextContent("[INFO] Info message");
    expect(logDebug).toHaveTextContent("[DEBUG] Debug message");
    expect(logError).toHaveTextContent("[ERROR] Error message");
  });

  it.todo("auto scroll test");
});
