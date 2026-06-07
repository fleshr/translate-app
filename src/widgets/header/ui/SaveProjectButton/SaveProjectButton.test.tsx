import { useTranslationStore } from "@/entities/translation";
import { getTranslationFileMock } from "@/entities/translation/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { stringifyJson } from "@/shared/lib/json";
import { render, resetStore } from "@/shared/lib/testing";
import { selectProject, useProjectStore } from "@/shared/model/projectStore";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { fileSave } from "browser-fs-access";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ProjectFile } from "../../model/projectFile";
import { SaveProjectButton } from "./SaveProjectButton";

vi.mock("@/shared/model/projectStore", { spy: true });
vi.mock("@/entities/translation", { spy: true });

const testFile = getTranslationFileMock();
const testProject: ProjectFile = {
  project: { parser: "test" },
  resources: [testFile],
};

describe("widgets/header/ui/SaveProjectButton", () => {
  beforeEach(() => {
    useTranslationStore.setState({
      resources: {
        allIds: ["file-1"],
        byId: { "file-1": { ...testFile, segments: [] } },
      },
    });
    useProjectStore.setState({ parser: "test" });
  });

  afterEach(() => {
    resetStore(
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

  it("should init stores and show notification", async () => {
    const { getByTestId } = render(<SaveProjectButton />);

    const button = getByTestId("SaveProjectButton");
    await userEvent.click(button);

    expect(fileSave).toHaveBeenCalledWith(
      new Blob([stringifyJson(testProject)]),
      { fileName: "translation.json" },
    );
    expect(notifications.show).toHaveBeenCalled();
  });
});
