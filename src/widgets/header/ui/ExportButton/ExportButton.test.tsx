import { resolveParser, type Parser } from "@/entities/parser";
import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { render, resetStore } from "@/shared/lib/testing";
import { useFilesStore } from "@/shared/model/filesStore";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { fileSave } from "browser-fs-access";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { exportResourcesToZip } from "../../lib/exportResourcesToZip";
import { ExportButton } from "./ExportButton";

const testBlob = new Blob(["test"]);
const testParser = { name: "test" } as Parser;

const testStore = getTranslationStoreStateMock();

const common1 = testStore.resources.byId["common-1"]!;
const file1 = testStore.resources.byId["file-1"]!;

const segment1 = testStore.segments.byId["segment-1"]!;
const segment2 = testStore.segments.byId["segment-2"]!;
const segment3 = testStore.segments.byId["segment-3"]!;

const testFiles = {
  "files/file-1": new TextEncoder().encode("content-1").buffer,
};

vi.mock("@/entities/parser", { spy: true });
vi.mocked(resolveParser).mockResolvedValue(testParser);

vi.mock("../../lib/exportResourcesToZip");
vi.mocked(exportResourcesToZip).mockResolvedValue(testBlob);

describe("widgets/header/ui/ExportButton", () => {
  beforeEach(() => {
    useTranslationStore.setState(testStore);
    useFilesStore.setState({ files: testFiles });
  });

  afterEach(() => {
    resetStore(useTranslationProcessStore, useTranslationStore, useFilesStore);
  });

  it("should be disabled when translating", () => {
    useTranslationProcessStore.setState({ status: "translating" });
    const { getByTestId } = render(<ExportButton />);

    const button = getByTestId("ExportButton");
    expect(button).toBeDisabled();
  });

  it("should zip game files from translations", async () => {
    const { getByTestId } = render(<ExportButton />);

    const button = getByTestId("ExportButton");
    await userEvent.click(button);

    expect(exportResourcesToZip).toHaveBeenCalledWith(
      [
        { ...common1, segments: [segment1] },
        { ...file1, segments: [segment2, segment3] },
      ],
      testFiles,
      testParser,
    );
    expect(fileSave).toHaveBeenCalledWith(testBlob, {
      fileName: "translation.zip",
    });
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should show notification if parser not found", async () => {
    vi.mocked(resolveParser).mockResolvedValue(undefined);
    const { getByTestId } = render(<ExportButton />);

    const button = getByTestId("ExportButton");
    await userEvent.click(button);

    expect(notifications.show).toHaveBeenCalled();
    expect(fileSave).not.toHaveBeenCalled();
  });

  it("should catch errors and show notification", async () => {
    vi.mocked(resolveParser).mockRejectedValue(new Error("error"));
    const { getByTestId } = render(<ExportButton />);

    const button = getByTestId("ExportButton");
    await userEvent.click(button);

    expect(notifications.show).toHaveBeenCalled();
    expect(fileSave).not.toHaveBeenCalled();
  });
});
