import { render, resetStore } from "@/shared/lib/testing";
import { getModuleMock } from "@/shared/mocks/module";
import { useModuleStore } from "@/shared/model/moduleStore";
import { initProject } from "@/shared/model/projectStore";
import { initSession } from "@/shared/model/sessionStore";
import { initTranslation } from "@/shared/model/translationStore";
import { notifications } from "@mantine/notifications";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CreateProjectForm } from "./CreateProjectForm";

vi.mock("@/shared/model/sessionStore", { spy: true });
vi.mock("@/shared/model/projectStore", { spy: true });
vi.mock("@/shared/model/translationStore", { spy: true });

describe("widgets/header/ui/CreateProjectForm", () => {
  beforeEach(() => {
    useModuleStore.setState({ parsers: { "test@1.0.0": getModuleMock() } });
  });

  afterEach(() => {
    resetStore(useModuleStore);
  });

  it("submit button should be disabled when form is not filled", () => {
    const { getByTestId } = render(<CreateProjectForm />);
    expect(getByTestId("CreateProjectForm.CreateButton")).toBeDisabled();
  });

  it("submit button should be enabled when form is filled", async () => {
    const { getByTestId, getByRole } = render(<CreateProjectForm />);

    await userEvent.click(getByTestId("CreateProjectForm.ParserSelect"));
    await userEvent.click(getByRole("option", { name: "Test Module (1.0.0)" }));

    expect(getByTestId("CreateProjectForm.CreateButton")).toBeEnabled();
  });

  it("should call onCancel when cancel button is clicked", async () => {
    const handleCancel = vi.fn();
    const { getByTestId } = render(
      <CreateProjectForm onCancel={handleCancel} />,
    );

    expect(handleCancel).not.toHaveBeenCalled();
    await userEvent.click(getByTestId("CreateProjectForm.CancelButton"));
    expect(handleCancel).toHaveBeenCalled();
  });

  it("should call onCreate when form is submitted with form values", async () => {
    const handleCreate = vi.fn();
    const { getByTestId, getByRole } = render(
      <CreateProjectForm onSubmit={handleCreate} />,
    );

    await userEvent.click(getByTestId("CreateProjectForm.ParserSelect"));
    await userEvent.click(getByRole("option", { name: "Test Module (1.0.0)" }));
    await userEvent.click(getByTestId("CreateProjectForm.CreateButton"));

    expect(handleCreate).toHaveBeenCalledWith({ parser: "test@1.0.0" });
  });

  it("should init stores and show notification", async () => {
    const { getByTestId, getByRole } = render(<CreateProjectForm />);

    await userEvent.click(getByTestId("CreateProjectForm.ParserSelect"));
    await userEvent.click(getByRole("option", { name: "Test Module (1.0.0)" }));
    await userEvent.click(getByTestId("CreateProjectForm.CreateButton"));

    expect(initSession).toHaveBeenCalledWith([]);
    expect(initProject).toHaveBeenCalledWith({ parser: "test@1.0.0" });
    expect(initTranslation).toHaveBeenCalledWith([]);
    expect(notifications.show).toHaveBeenCalled();
  });
});
