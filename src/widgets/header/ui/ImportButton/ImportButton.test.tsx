import { createParserFromCode } from "@/shared/lib/module";
import { render, resetStore } from "@/shared/lib/testing";
import { getModuleMock } from "@/shared/mocks/module";
import { useModuleStore } from "@/shared/model/moduleStore";
import type { Parser } from "@/shared/model/parser";
import { useProjectStore } from "@/shared/model/projectStore";
import { initSession, useSessionStore } from "@/shared/model/sessionStore";
import { initTranslation } from "@/shared/model/translationStore";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { directoryOpen } from "browser-fs-access";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { extractTranslations } from "../../lib/extractTranslations/extractTranslations";
import { ImportButton } from "./ImportButton";

vi.mock("@/shared/lib/module");
vi.mocked(createParserFromCode).mockResolvedValue({} as Parser);

vi.mock("../../lib/extractTranslations/extractTranslations");
vi.mocked(extractTranslations).mockResolvedValue([]);

vi.mock("@/shared/model/sessionStore", { spy: true });
vi.mock("@/shared/model/translationStore", { spy: true });

const testFile = new File(["test"], "file.js");

describe("widgets/header/ui/ImportButton", () => {
  beforeEach(() => {
    vi.mocked(directoryOpen).mockResolvedValue([testFile]);
    useProjectStore.setState({ parser: "test@1.0.0" });
    useModuleStore.setState({ parsers: { "test@1.0.0": getModuleMock() } });
  });

  afterEach(() => {
    resetStore(useSessionStore, useProjectStore, useModuleStore);
  });

  it("should be disabled when translating", () => {
    useSessionStore.setState({ status: "translating" });
    const { getByTestId } = render(<ImportButton />);

    const button = getByTestId("ImportButton");
    expect(button).toBeDisabled();
  });

  it("should init stores and show notification", async () => {
    const { getByTestId } = render(<ImportButton />);

    const button = getByTestId("ImportButton");
    await userEvent.click(button);

    expect(directoryOpen).toHaveBeenCalled();
    expect(createParserFromCode).toHaveBeenCalledWith("test code");
    expect(extractTranslations).toHaveBeenCalledWith([testFile], {});
    expect(initSession).toHaveBeenCalledWith([]);
    expect(initTranslation).toHaveBeenCalledWith([]);
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should show notification if parser not found", async () => {
    useProjectStore.setState({ parser: "unknown" });
    const { getByTestId } = render(<ImportButton />);

    const button = getByTestId("ImportButton");
    await userEvent.click(button);

    expect(notifications.show).toHaveBeenCalled();
    expect(initTranslation).not.toHaveBeenCalled();
  });

  it("should catch errors and show notification", async () => {
    vi.mocked(directoryOpen).mockRejectedValue(new Error("error"));
    const { getByTestId } = render(<ImportButton />);

    const button = getByTestId("ImportButton");
    await userEvent.click(button);

    expect(notifications.show).toHaveBeenCalled();
    expect(initTranslation).not.toHaveBeenCalled();
  });
});
