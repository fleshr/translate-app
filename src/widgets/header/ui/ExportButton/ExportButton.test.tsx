import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { resolveParser } from "@/shared/lib/parser";
import { render, resetStore } from "@/shared/lib/testing";
import type { Parser } from "@/shared/model/parser";
import { useSessionStore } from "@/shared/model/sessionStore";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { fileSave } from "browser-fs-access";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { exportTranslationToZip } from "../../lib/exportTranslationToZip/exportTranslationToZip";
import { ExportButton } from "./ExportButton";

const testBlob = new Blob(["test"]);
const testParser = { name: "test" } as Parser;

const testStore = getTranslationStoreStateMock();

const common1 = testStore.resources.byId["common-1"]!;
const file1 = testStore.resources.byId["file-1"]!;

const segment1 = testStore.segments.byId["segment-1"]!;
const segment2 = testStore.segments.byId["segment-2"]!;
const segment3 = testStore.segments.byId["segment-3"]!;

vi.mock("@/shared/lib/parser");
vi.mocked(resolveParser).mockResolvedValue(testParser);

vi.mock("../../lib/exportTranslationToZip/exportTranslationToZip");
vi.mocked(exportTranslationToZip).mockResolvedValue(testBlob);

describe("widgets/header/ui/ExportButton", () => {
  beforeEach(() => {
    useTranslationStore.setState(testStore);
  });

  afterEach(() => {
    resetStore(useSessionStore, useTranslationStore);
  });

  it("should be disabled when translating", () => {
    useSessionStore.setState({ status: "translating" });
    const { getByTestId } = render(<ExportButton />);

    const button = getByTestId("ExportButton");
    expect(button).toBeDisabled();
  });

  it("should zip game files from translations", async () => {
    const { getByTestId } = render(<ExportButton />);

    const button = getByTestId("ExportButton");
    await userEvent.click(button);

    expect(exportTranslationToZip).toHaveBeenCalledWith(
      [
        { ...common1, segments: [segment1] },
        { ...file1, segments: [segment2, segment3] },
      ],
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
