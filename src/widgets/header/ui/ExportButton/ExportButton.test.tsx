import { createParserFromCode } from "@/shared/lib/module";
import { render, resetStore } from "@/shared/lib/testing";
import { getModuleMock } from "@/shared/mocks/module";
import { getTranslationStoreStateMock } from "@/shared/mocks/translationStore";
import { useModuleStore } from "@/shared/model/moduleStore";
import type { Parser } from "@/shared/model/parser";
import { useProjectStore } from "@/shared/model/projectStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import { useTranslationStore } from "@/shared/model/translationStore";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { fileSave } from "browser-fs-access";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { exportTranslationToZip } from "../../lib/exportTranslationToZip/exportTranslationToZip";
import { ExportButton } from "./ExportButton";

vi.mock("@/shared/lib/module");
vi.mocked(createParserFromCode).mockResolvedValue({} as Parser);

const testBlob = new Blob(["test"]);
vi.mock("../../lib/exportTranslationToZip/exportTranslationToZip");
vi.mocked(exportTranslationToZip).mockResolvedValue(testBlob);

describe("widgets/header/ui/ExportButton", () => {
  beforeEach(() => {
    useTranslationStore.setState(getTranslationStoreStateMock());
    useProjectStore.setState({ parser: "test@1.0.0" });
    useModuleStore.setState({ parsers: { "test@1.0.0": getModuleMock() } });
  });

  afterEach(() => {
    resetStore(
      useSessionStore,
      useProjectStore,
      useModuleStore,
      useTranslationStore,
    );
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

    expect(createParserFromCode).toHaveBeenCalledWith("test code");
    expect(exportTranslationToZip).toHaveBeenCalledWith(
      [
        {
          id: "common-1",
          name: "Common 1",
          relPath: "*",
          segments: [
            {
              fileOccurrences: {},
              id: "segment-1",
              machineTranslation: "Machine translation",
              manualTranslation: "Manual translation",
              originalText: "test1",
              resourceId: "common-1",
            },
          ],
          type: "common",
        },
        {
          content: "content",
          id: "file-1",
          name: "File 1",
          relPath: "files/file-1",
          segments: [
            {
              fileOccurrences: {},
              id: "segment-2",
              machineTranslation: "Machine translation",
              manualTranslation: "Manual translation",
              originalText: "test2",
              resourceId: "file-1",
            },
            {
              fileOccurrences: {},
              id: "segment-3",
              machineTranslation: "Machine translation",
              manualTranslation: "Manual translation",
              originalText: "test3",
              resourceId: "file-1",
            },
          ],
          type: "file",
        },
      ],
      {},
    );
    expect(fileSave).toHaveBeenCalledWith(testBlob, {
      fileName: "translation.zip",
    });
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should show notification if parser not found", async () => {
    useProjectStore.setState({ parser: "unknown" });
    const { getByTestId } = render(<ExportButton />);

    const button = getByTestId("ExportButton");
    await userEvent.click(button);

    expect(notifications.show).toHaveBeenCalled();
    expect(fileSave).not.toHaveBeenCalled();
  });

  it("should catch errors and show notification", async () => {
    vi.mocked(createParserFromCode).mockRejectedValue(new Error("error"));
    const { getByTestId } = render(<ExportButton />);

    const button = getByTestId("ExportButton");
    await userEvent.click(button);

    expect(notifications.show).toHaveBeenCalled();
    expect(fileSave).not.toHaveBeenCalled();
  });
});
