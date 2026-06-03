import { initTranslation } from "@/entities/translation";
import { getTranslationFileMock } from "@/entities/translation/mocks";
import { stringifyJson } from "@/shared/lib/json";
import { render, resetStore } from "@/shared/lib/testing";
import { initProject } from "@/shared/model/projectStore";
import { initSession, useSessionStore } from "@/shared/model/sessionStore";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { fileOpen } from "browser-fs-access";
import { afterEach, describe, expect, it, vi } from "vitest";
import { OpenProjectButton } from "./OpenProjectButton";

vi.mock("@/shared/model/sessionStore", { spy: true });
vi.mock("@/shared/model/projectStore", { spy: true });
vi.mock("@/entities/translation", { spy: true });

const testResource = getTranslationFileMock();
const testProject = {
  project: { parser: "test" },
  resources: [testResource],
};

const testFile = new File([stringifyJson(testProject)], "test.json");
vi.mocked(fileOpen).mockResolvedValue(testFile);

describe("widgets/header/ui/OpenProjectButton", () => {
  afterEach(() => {
    resetStore(useSessionStore);
  });

  it("should be disabled when translating", () => {
    useSessionStore.setState({ status: "translating" });
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

  it("should init stores and show notification", async () => {
    const { getByTestId } = render(<OpenProjectButton />);

    const button = getByTestId("OpenProjectButton");
    await userEvent.click(button);

    expect(initProject).toHaveBeenCalledWith({ parser: "test" });
    expect(initSession).toHaveBeenCalledWith(testResource.id);
    expect(initTranslation).toHaveBeenCalledWith([testResource]);
    expect(notifications.show).toHaveBeenCalled();
  });
});
