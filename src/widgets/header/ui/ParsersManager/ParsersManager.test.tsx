import { createParserFromCode } from "@/shared/lib/module";
import { render, resetStore } from "@/shared/lib/testing";
import { getModuleExternalMock } from "@/shared/mocks/module";
import {
  addModule,
  removeModule,
  useModuleStore,
} from "@/shared/model/moduleStore";
import type { Parser } from "@/shared/model/parser";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { fileOpen } from "browser-fs-access";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ParsersManager } from "./ParsersManager";

const testFile = new File(["test code"], "file.js");

vi.mock("@/shared/model/moduleStore", { spy: true });
vi.mock("@/shared/lib/module", { spy: true });

vi.mocked(createParserFromCode).mockResolvedValue({
  name: "Test Module",
  version: "1.0.0",
  shortName: "test",
} as Parser);

describe("widgets/header/ui/ParsersManager", () => {
  beforeEach(() => {
    useModuleStore.setState({
      parsers: {
        "test@1.0.0": getModuleExternalMock(),
        "test@2.0.0": getModuleExternalMock({
          id: "test@2.0.0",
          version: "2.0.0",
        }),
      },
    });
  });

  afterEach(() => {
    resetStore(useModuleStore);
  });

  it("should show parsers list", () => {
    const { getByTestId } = render(<ParsersManager />);

    expect(getByTestId("ParsersManager.Item.0")).toHaveTextContent(
      "Test Module (1.0.0)",
    );
    expect(getByTestId("ParsersManager.Item.1")).toHaveTextContent(
      "Test Module (2.0.0)",
    );
  });

  it("should remove parser and show notification", async () => {
    const { getByTestId, queryByTestId } = render(<ParsersManager />);

    const removeButton = getByTestId("ParsersManager.Item.1.RemoveButton");
    await userEvent.click(removeButton);

    expect(removeModule).toHaveBeenCalledWith("parsers", "test@2.0.0");
    expect(notifications.show).toHaveBeenCalled();
    expect(queryByTestId("ParsersManager.Item.1")).not.toBeInTheDocument();
  });

  it("should add parser and show notification", async () => {
    vi.mocked(fileOpen).mockResolvedValue(testFile);
    const { getByTestId } = render(<ParsersManager />);

    const addButton = getByTestId("ParsersManager.AddParserButton");
    await userEvent.click(addButton);

    expect(addModule).toHaveBeenCalledWith("parsers", {
      id: "test@1.0.0",
      name: "Test Module",
      version: "1.0.0",
      shortName: "test",
      code: "test code",
      type: "external",
    });
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should catch errors and show notification", async () => {
    vi.mocked(fileOpen).mockRejectedValue(new Error("error"));
    const { getByTestId } = render(<ParsersManager />);

    const addButton = getByTestId("ParsersManager.AddParserButton");
    await userEvent.click(addButton);

    expect(addModule).not.toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });
});
