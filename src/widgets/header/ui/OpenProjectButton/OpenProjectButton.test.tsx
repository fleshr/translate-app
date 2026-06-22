import { initProject, PROJECT_FILE_EXTENSION } from "@/entities/project";
import { initFiles, initTranslation } from "@/entities/translation";
import {
  getTranslationCommonMock,
  getTranslationFileMock,
} from "@/entities/translation/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { render, resetStore } from "@/shared/lib/testing";
import { initSession } from "@/shared/model/sessionStore";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { fileOpen } from "browser-fs-access";
import { afterEach, describe, expect, it, vi } from "vitest";
import { parseProjectFile } from "../../lib/parseProjectFile";
import { OpenProjectButton } from "./OpenProjectButton";

vi.mock("@/shared/model/sessionStore", { spy: true });
vi.mock("@/entities/project", { spy: true });
vi.mock("@/entities/translation", { spy: true });
vi.mock("../../lib/parseProjectFile", { spy: true });

const testProject = {
  parser: "test",
};

const testResources = [
  getTranslationCommonMock(),
  getTranslationFileMock({ id: "file-1", relPath: "files/file-1" }),
];

const testFiles = {
  "files/file-1": new TextEncoder().encode("content-1").buffer,
};

const testFile = new File(["test"], "test.zip");

vi.mocked(fileOpen).mockResolvedValue(testFile);
vi.mocked(parseProjectFile).mockResolvedValue({
  project: testProject,
  resources: testResources,
  files: testFiles,
});

describe("widgets/header/ui/OpenProjectButton", () => {
  afterEach(() => {
    resetStore(useTranslationProcessStore);
  });

  it("should be disabled when translating", () => {
    useTranslationProcessStore.setState({ status: "translating" });
    const { getByTestId } = render(<OpenProjectButton />);

    const button = getByTestId("OpenProjectButton");
    expect(button).toBeDisabled();
  });

  it("should catch errors and show notification", async () => {
    vi.mocked(fileOpen).mockRejectedValueOnce(new Error("error"));
    const { getByTestId } = render(<OpenProjectButton />);

    const button = getByTestId("OpenProjectButton");
    await userEvent.click(button);

    expect(initTranslation).not.toHaveBeenCalled();
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should parse project file with opened file", async () => {
    const { getByTestId } = render(<OpenProjectButton />);

    const button = getByTestId("OpenProjectButton");
    await userEvent.click(button);

    expect(fileOpen).toHaveBeenCalledWith({
      extensions: [PROJECT_FILE_EXTENSION],
    });
    expect(parseProjectFile).toHaveBeenCalledWith(testFile);
  });

  it("should init stores and show notification", async () => {
    const { getByTestId } = render(<OpenProjectButton />);

    const button = getByTestId("OpenProjectButton");
    await userEvent.click(button);

    expect(initFiles).toHaveBeenCalledWith(testFiles);
    expect(initProject).toHaveBeenCalledWith(testProject);
    expect(initSession).toHaveBeenCalledWith(testResources[0]?.id);
    expect(initTranslation).toHaveBeenCalledWith(testResources);
    expect(notifications.show).toHaveBeenCalled();
  });
});
