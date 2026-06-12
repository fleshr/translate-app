import { useParserStore } from "@/entities/parser";
import { getParserStoreStateMock } from "@/entities/parser/mocks";
import { initTranslation } from "@/entities/translation";
import { render, resetStore } from "@/shared/lib/testing";
import { initFiles } from "@/shared/model/filesStore";
import type { ModuleExternal } from "@/shared/model/module";
import { initProject } from "@/shared/model/projectStore";
import { initSession } from "@/shared/model/sessionStore";
import { notifications } from "@mantine/notifications";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CreateProjectForm } from "./CreateProjectForm";

const testStore = getParserStoreStateMock();
const testParser = testStore.parsers["test1@1.0.0"] as ModuleExternal;

vi.mock("@/shared/model/filesStore", { spy: true });
vi.mock("@/shared/model/sessionStore", { spy: true });
vi.mock("@/shared/model/projectStore", { spy: true });
vi.mock("@/entities/translation", { spy: true });

describe("widgets/header/ui/CreateProjectForm", () => {
  beforeEach(() => {
    useParserStore.setState(testStore);
  });

  afterEach(() => {
    resetStore(useParserStore);
  });

  it("should init parser values with first parser", () => {
    const { getByTestId } = render(<CreateProjectForm />);

    const select = getByTestId("CreateProjectForm.ParserSelect");
    expect(select).toHaveValue("Test Module 1 (1.0.0)");
  });

  it("should call onCancel when cancel button is clicked", async () => {
    const handleCancel = vi.fn();
    const { getByTestId } = render(
      <CreateProjectForm onCancel={handleCancel} />,
    );

    expect(handleCancel).not.toHaveBeenCalled();

    const button = getByTestId("CreateProjectForm.CancelButton");
    await userEvent.click(button);

    expect(handleCancel).toHaveBeenCalled();
  });

  it("should call onCreate when form is submitted with form values", async () => {
    const handleCreate = vi.fn();
    const { getByTestId, getByRole } = render(
      <CreateProjectForm onSubmit={handleCreate} />,
    );

    const select = getByTestId("CreateProjectForm.ParserSelect");
    await userEvent.click(select);

    const option = getByRole("option", { name: "Test Module 1 (1.0.0)" });
    await userEvent.click(option);

    const button = getByTestId("CreateProjectForm.CreateButton");
    await userEvent.click(button);

    expect(handleCreate).toHaveBeenCalledWith({
      parser: "test1@1.0.0",
      parserSaveFully: false,
    });
  });

  it("should disable checkbox when parser is built-in", async () => {
    const { getByTestId, getByRole } = render(<CreateProjectForm />);

    const select = getByTestId("CreateProjectForm.ParserSelect");
    await userEvent.click(select);

    const option = getByRole("option", { name: "Test Module 2 (1.0.0)" });
    await userEvent.click(option);

    const checkbox = getByTestId("CreateProjectForm.ParserSaveFullyCheckbox");
    expect(checkbox).toBeDisabled();
  });

  it("should enable checkbox when parser is external", async () => {
    const { getByTestId, getByRole } = render(<CreateProjectForm />);

    const select = getByTestId("CreateProjectForm.ParserSelect");
    await userEvent.click(select);

    const option = getByRole("option", { name: "Test Module 1 (1.0.0)" });
    await userEvent.click(option);

    const checkbox = getByTestId("CreateProjectForm.ParserSaveFullyCheckbox");
    expect(checkbox).not.toBeDisabled();
  });

  it("should init stores and show notification on submit with minimal parser", async () => {
    const { getByTestId, getByRole } = render(<CreateProjectForm />);

    const select = getByTestId("CreateProjectForm.ParserSelect");
    await userEvent.click(select);

    const option = getByRole("option", { name: "Test Module 1 (1.0.0)" });
    await userEvent.click(option);

    const button = getByTestId("CreateProjectForm.CreateButton");
    await userEvent.click(button);

    expect(initFiles).toHaveBeenCalledWith({});
    expect(initSession).toHaveBeenCalledWith(null);
    expect(initProject).toHaveBeenCalledWith({ parser: "test1@1.0.0" });
    expect(initTranslation).toHaveBeenCalledWith([]);
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should init stores and show notification on submit with fully parser", async () => {
    const { getByTestId, getByRole } = render(<CreateProjectForm />);

    const select = getByTestId("CreateProjectForm.ParserSelect");
    await userEvent.click(select);

    const option = getByRole("option", { name: "Test Module 1 (1.0.0)" });
    await userEvent.click(option);

    const checkbox = getByTestId("CreateProjectForm.ParserSaveFullyCheckbox");
    await userEvent.click(checkbox);

    const button = getByTestId("CreateProjectForm.CreateButton");
    await userEvent.click(button);

    expect(initFiles).toHaveBeenCalledWith({});
    expect(initSession).toHaveBeenCalledWith(null);
    expect(initProject).toHaveBeenCalledWith({ parser: testParser });
    expect(initTranslation).toHaveBeenCalledWith([]);
    expect(notifications.show).toHaveBeenCalled();
  });
});
