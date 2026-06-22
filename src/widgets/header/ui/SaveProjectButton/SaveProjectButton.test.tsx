import {
  PROJECT_FILE_EXTENSION,
  selectProject,
  useProjectStore,
} from "@/entities/project";
import { getProjectStoreStateMock } from "@/entities/project/mocks";
import { useFilesStore, useTranslationStore } from "@/entities/translation";
import {
  getFilesStoreStateMock,
  getTranslationBaseFileMock,
} from "@/entities/translation/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { render, resetStore } from "@/shared/lib/testing";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { fileSave } from "browser-fs-access";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { generateProjectFile } from "../../lib/generateProjectFile";
import { SaveProjectButton } from "./SaveProjectButton";

const testFile = getTranslationBaseFileMock();
const testBlob = new Blob(["test"]);
const testProjectStore = getProjectStoreStateMock();
const testFilesStore = getFilesStoreStateMock();

vi.mock("@/entities/project", { spy: true });
vi.mock("@/entities/translation", { spy: true });
vi.mock("../../lib/generateProjectFile", { spy: true });

vi.mocked(generateProjectFile).mockResolvedValue(testBlob);

describe("widgets/header/ui/SaveProjectButton", () => {
  beforeEach(() => {
    useTranslationStore.setState({
      resources: {
        allIds: ["file-1"],
        byId: { "file-1": testFile },
      },
    });
    useProjectStore.setState(testProjectStore);
    useFilesStore.setState(testFilesStore);
  });

  afterEach(() => {
    resetStore(
      useFilesStore,
      useProjectStore,
      useTranslationStore,
      useTranslationProcessStore,
    );
  });

  it("should be disabled when translating", () => {
    useTranslationProcessStore.setState({ status: "translating" });
    const { getByTestId } = render(<SaveProjectButton />);

    const button = getByTestId("SaveProjectButton");
    expect(button).toBeDisabled();
  });

  it("should catch errors and show notification", async () => {
    vi.mocked(selectProject).mockImplementationOnce(() => {
      throw new Error("error");
    });
    const { getByTestId } = render(<SaveProjectButton />);

    const button = getByTestId("SaveProjectButton");
    await userEvent.click(button);

    expect(fileSave).not.toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should save project file and show notification", async () => {
    const { getByTestId } = render(<SaveProjectButton />);

    const button = getByTestId("SaveProjectButton");
    await userEvent.click(button);

    expect(generateProjectFile).toHaveBeenCalledWith(
      testFilesStore.files,
      testProjectStore,
      [{ ...testFile, segments: [] }],
    );
    expect(fileSave).toHaveBeenCalledWith(testBlob, {
      fileName: `project${PROJECT_FILE_EXTENSION}`,
    });
    expect(notifications.show).toHaveBeenCalled();
  });
});
