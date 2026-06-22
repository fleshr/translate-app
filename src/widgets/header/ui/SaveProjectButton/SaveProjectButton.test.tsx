import { selectProject, useProjectStore } from "@/entities/project";
import { useTranslationStore } from "@/entities/translation";
import { getTranslationBaseFileMock } from "@/entities/translation/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { projectFileExtension } from "@/shared/config/project";
import { render, resetStore } from "@/shared/lib/testing";
import { useFilesStore } from "@/shared/model/filesStore";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { fileSave } from "browser-fs-access";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { generateProjectFile } from "../../lib/generateProjectFile";
import { SaveProjectButton } from "./SaveProjectButton";

const testFile = getTranslationBaseFileMock();
const testBlob = new Blob(["test"]);
const testProject = { parser: "test" };
const testFiles = { "files/file-1": new TextEncoder().encode("test").buffer };

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
    useProjectStore.setState(testProject);
    useFilesStore.setState({ files: testFiles });
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

    expect(generateProjectFile).toHaveBeenCalledWith(testFiles, testProject, [
      { ...testFile, segments: [] },
    ]);
    expect(fileSave).toHaveBeenCalledWith(testBlob, {
      fileName: `project${projectFileExtension}`,
    });
    expect(notifications.show).toHaveBeenCalled();
  });
});
