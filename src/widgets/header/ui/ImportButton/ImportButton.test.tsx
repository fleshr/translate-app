import { resolveParser } from "@/entities/parser";
import { getParserMock } from "@/entities/parser/mocks";
import { useProjectStore } from "@/entities/project";
import { getProjectStoreStateMock } from "@/entities/project/mocks";
import { initFiles, initTranslation } from "@/entities/translation";
import { getTranslationFileMock } from "@/entities/translation/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { render, resetStore } from "@/shared/lib/testing";
import { initSession } from "@/shared/model/sessionStore";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { directoryOpen } from "browser-fs-access";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { extractResources } from "../../lib/extractResources";
import { getResourcesFiles } from "../../lib/getResourcesFiles";
import { ImportButton } from "./ImportButton";

const testFile = new File(["test"], "file.js");
const testParser = getParserMock();
const testResource = getTranslationFileMock();
const testFiles = { test: new TextEncoder().encode("test").buffer };
const testProjectStore = getProjectStoreStateMock();

vi.mock("@/entities/parser", { spy: true });
vi.mocked(resolveParser).mockResolvedValue(testParser);

vi.mock("../../lib/extractResources");
vi.mocked(extractResources).mockResolvedValue([testResource]);

vi.mock("../../lib/getResourcesFiles");
vi.mocked(getResourcesFiles).mockResolvedValue(testFiles);

vi.mock("@/shared/model/sessionStore", { spy: true });
vi.mock("@/entities/translation", { spy: true });

vi.mocked(directoryOpen).mockResolvedValue([testFile]);

describe("widgets/header/ui/ImportButton", () => {
  beforeEach(() => {
    useProjectStore.setState(testProjectStore);
  });

  afterEach(() => {
    resetStore(useProjectStore, useTranslationProcessStore);
  });

  it("should be disabled when translating", () => {
    useTranslationProcessStore.setState({ status: "translating" });
    const { getByTestId } = render(<ImportButton />);

    const button = getByTestId("ImportButton");
    expect(button).toBeDisabled();
  });

  it("should open directory and extract resources with project parser", async () => {
    const { getByTestId } = render(<ImportButton />);

    const button = getByTestId("ImportButton");
    await userEvent.click(button);

    expect(resolveParser).toHaveBeenCalledWith(testProjectStore.parser);
    expect(directoryOpen).toHaveBeenCalledWith({ recursive: true });
    expect(extractResources).toHaveBeenCalledWith([testFile], testParser);
    expect(getResourcesFiles).toHaveBeenCalledWith([testFile], [testResource]);
  });

  it("should init stores and show notification", async () => {
    const { getByTestId } = render(<ImportButton />);

    const button = getByTestId("ImportButton");
    await userEvent.click(button);

    expect(initFiles).toHaveBeenCalledWith(testFiles);
    expect(initSession).toHaveBeenCalledWith(testResource.id);
    expect(initTranslation).toHaveBeenCalledWith([testResource]);
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should show notification if parser not found", async () => {
    vi.mocked(resolveParser).mockResolvedValue(undefined);
    const { getByTestId } = render(<ImportButton />);

    const button = getByTestId("ImportButton");
    await userEvent.click(button);

    expect(initFiles).not.toHaveBeenCalled();
    expect(initSession).not.toHaveBeenCalled();
    expect(initTranslation).not.toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should catch errors and show notification", async () => {
    vi.mocked(directoryOpen).mockRejectedValue(new Error("error"));
    const { getByTestId } = render(<ImportButton />);

    const button = getByTestId("ImportButton");
    await userEvent.click(button);

    expect(initFiles).not.toHaveBeenCalled();
    expect(initSession).not.toHaveBeenCalled();
    expect(initTranslation).not.toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });
});
