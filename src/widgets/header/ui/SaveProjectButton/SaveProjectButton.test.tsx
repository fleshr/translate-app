import { stringifyJson } from "@/shared/lib/json";
import { render, resetStore } from "@/shared/lib/testing";
import { getTranslationFileMock } from "@/shared/mocks/translation";
import { selectProject, useProjectStore } from "@/shared/model/projectStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import { useTranslationStore } from "@/shared/model/translationStore";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { fileSave } from "browser-fs-access";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SaveProjectButton } from "./SaveProjectButton";

vi.mock("@/shared/model/projectStore", { spy: true });
vi.mock("@/shared/model/translationStore", { spy: true });

const testFile = getTranslationFileMock();

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
    resetStore(useSessionStore, useProjectStore, useTranslationStore);
  });

  it("should be disabled when translating", () => {
    useSessionStore.setState({ status: "translating" });
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
      new Blob([stringifyJson({ parser: "test", resources: [testFile] })]),
      { fileName: "translation.json" },
    );
    expect(notifications.show).toHaveBeenCalled();
  });
});
