import { initTranslation } from "@/entities/translation";
import { resolveParser } from "@/shared/lib/parser";
import { render, resetStore } from "@/shared/lib/testing";
import type { Parser } from "@/shared/model/parser";
import { initSession, useSessionStore } from "@/shared/model/sessionStore";
import { notifications } from "@mantine/notifications";
import userEvent from "@testing-library/user-event";
import { directoryOpen } from "browser-fs-access";
import { afterEach, describe, expect, it, vi } from "vitest";
import { extractTranslations } from "../../lib/extractTranslations/extractTranslations";
import { ImportButton } from "./ImportButton";

const testFile = new File(["test"], "file.js");
const testParser = { name: "test" } as Parser;

vi.mock("@/shared/lib/parser");
vi.mocked(resolveParser).mockResolvedValue(testParser);

vi.mock("../../lib/extractTranslations/extractTranslations");
vi.mocked(extractTranslations).mockResolvedValue([]);

vi.mock("@/shared/model/sessionStore", { spy: true });
vi.mock("@/entities/translation", { spy: true });

vi.mocked(directoryOpen).mockResolvedValue([testFile]);

describe("widgets/header/ui/ImportButton", () => {
  afterEach(() => {
    resetStore(useSessionStore);
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
    expect(extractTranslations).toHaveBeenCalledWith([testFile], testParser);

    expect(initSession).toHaveBeenCalledWith([]);
    expect(initTranslation).toHaveBeenCalledWith([]);

    expect(notifications.show).toHaveBeenCalled();
  });

  it("should show notification if parser not found", async () => {
    vi.mocked(resolveParser).mockResolvedValue(undefined);
    const { getByTestId } = render(<ImportButton />);

    const button = getByTestId("ImportButton");
    await userEvent.click(button);

    expect(initSession).not.toHaveBeenCalled();
    expect(initTranslation).not.toHaveBeenCalled();

    expect(notifications.show).toHaveBeenCalled();
  });

  it("should catch errors and show notification", async () => {
    vi.mocked(directoryOpen).mockRejectedValue(new Error("error"));
    const { getByTestId } = render(<ImportButton />);

    const button = getByTestId("ImportButton");
    await userEvent.click(button);

    expect(initSession).not.toHaveBeenCalled();
    expect(initTranslation).not.toHaveBeenCalled();

    expect(notifications.show).toHaveBeenCalled();
  });
});
