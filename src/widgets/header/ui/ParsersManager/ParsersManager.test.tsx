import {
  addParser,
  createParserFromCode,
  removeParser,
  useParserStore,
} from "@/entities/parser";
import {
  getParserMock,
  getParserStoreStateMock,
} from "@/entities/parser/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { fileOpen } from "browser-fs-access";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ParsersManager } from "./ParsersManager";

const testFile = new File(["test code"], "file.js");

vi.mock("@/shared/model/moduleStore", { spy: true });

vi.mock("@/entities/parser", { spy: true });
vi.mocked(createParserFromCode).mockResolvedValue(getParserMock());

describe("widgets/header/ui/ParsersManager", () => {
  beforeEach(() => {
    useParserStore.setState(getParserStoreStateMock());
  });

  afterEach(() => {
    resetStore(useParserStore);
  });

  it("should show parsers list", () => {
    const { getByTestId } = render(<ParsersManager />);

    const parser1 = getByTestId("ParsersManager.Item.0");
    const parser2 = getByTestId("ParsersManager.Item.1");
    const parser3 = getByTestId("ParsersManager.Item.2");

    expect(parser1).toHaveTextContent("Test Module 1 (1.0.0)");
    expect(parser2).toHaveTextContent("Test Module 2 (1.0.0)");
    expect(parser3).toHaveTextContent("Test Module 3 (1.0.0)");
  });

  it("should show remove button only on external parsers", () => {
    const { queryByTestId } = render(<ParsersManager />);

    const removeButton1 = queryByTestId("ParsersManager.Item.0.RemoveButton");
    const removeButton2 = queryByTestId("ParsersManager.Item.1.RemoveButton");
    const removeButton3 = queryByTestId("ParsersManager.Item.2.RemoveButton");

    expect(removeButton1).toBeInTheDocument();
    expect(removeButton2).not.toBeInTheDocument();
    expect(removeButton3).not.toBeInTheDocument();
  });

  it("should remove parser and show notification", async () => {
    const { getByTestId, queryAllByTestId } = render(<ParsersManager />);

    let items = queryAllByTestId(/ParsersManager.Item.\d+$/);
    expect(items).toHaveLength(3);

    const removeButton = getByTestId("ParsersManager.Item.0.RemoveButton");
    await userEvent.click(removeButton);

    items = queryAllByTestId(/ParsersManager.Item.\d+$/);
    expect(items).toHaveLength(2);

    expect(removeParser).toHaveBeenCalledWith("test1@1.0.0");
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should add parser and show notification", async () => {
    vi.mocked(fileOpen).mockResolvedValue(testFile);
    const { getByTestId } = render(<ParsersManager />);

    const addButton = getByTestId("ParsersManager.AddParserButton");
    await userEvent.click(addButton);

    expect(addParser).toHaveBeenCalledWith({
      id: "test@1.0.0",
      name: "Test Parser",
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

    expect(addParser).not.toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });
});
