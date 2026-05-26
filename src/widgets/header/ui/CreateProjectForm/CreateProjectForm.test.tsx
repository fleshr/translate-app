import { render, resetStore } from "@/shared/lib/testing";
import {
  getModuleBuiltinMock,
  getModuleExternalMock,
} from "@/shared/mocks/module";
import { useModuleStore } from "@/shared/model/moduleStore";
import { initProject } from "@/shared/model/projectStore";
import { initSession } from "@/shared/model/sessionStore";
import { initTranslation } from "@/shared/model/translationStore";
import { notifications } from "@mantine/notifications";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CreateProjectForm } from "./CreateProjectForm";

const testParser = getModuleExternalMock({
  id: "test1@1.0.0",
  name: "test1",
});

vi.mock("@/shared/model/sessionStore", { spy: true });
vi.mock("@/shared/model/projectStore", { spy: true });
vi.mock("@/shared/model/translationStore", { spy: true });

describe("widgets/header/ui/CreateProjectForm", () => {
  beforeEach(() => {
    useModuleStore.setState({
      parsers: {
        "test1@1.0.0": testParser,
        "test2@1.0.0": getModuleBuiltinMock({
          id: "test2@1.0.0",
          name: "test2",
        }),
      },
    });
  });

  afterEach(() => {
    resetStore(useModuleStore);
  });

  it("should init parser values with first parser", () => {
    const { getByTestId } = render(<CreateProjectForm />);
    expect(getByTestId("CreateProjectForm.ParserSelect")).toHaveValue(
      "test1 (1.0.0)",
    );
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
    await userEvent.click(getByRole("option", { name: "test2 (1.0.0)" }));
    await userEvent.click(getByTestId("CreateProjectForm.CreateButton"));

    expect(handleCreate).toHaveBeenCalledWith({
      parser: "test2@1.0.0",
      parserSaveFully: false,
    });
  });

  it("should disable checkbox when parser is not external", async () => {
    const { getByTestId, getByRole } = render(<CreateProjectForm />);

    await userEvent.click(getByTestId("CreateProjectForm.ParserSelect"));
    await userEvent.click(getByRole("option", { name: "test1 (1.0.0)" }));

    expect(
      getByTestId("CreateProjectForm.ParserSaveFullyCheckbox"),
    ).not.toBeDisabled();

    await userEvent.click(getByTestId("CreateProjectForm.ParserSelect"));
    await userEvent.click(getByRole("option", { name: "test2 (1.0.0)" }));

    expect(
      getByTestId("CreateProjectForm.ParserSaveFullyCheckbox"),
    ).toBeDisabled();
  });

  it("should init stores and show notification on submit with minimal parser", async () => {
    const { getByTestId, getByRole } = render(<CreateProjectForm />);

    await userEvent.click(getByTestId("CreateProjectForm.ParserSelect"));
    await userEvent.click(getByRole("option", { name: "test1 (1.0.0)" }));
    await userEvent.click(getByTestId("CreateProjectForm.CreateButton"));

    expect(initSession).toHaveBeenCalledWith([]);
    expect(initProject).toHaveBeenCalledWith({ parser: "test1@1.0.0" });
    expect(initTranslation).toHaveBeenCalledWith([]);
    expect(notifications.show).toHaveBeenCalled();
  });

  it("should init stores and show notification on submit with fully parser", async () => {
    const { getByTestId, getByRole } = render(<CreateProjectForm />);

    await userEvent.click(getByTestId("CreateProjectForm.ParserSelect"));
    await userEvent.click(getByRole("option", { name: "test1 (1.0.0)" }));
    await userEvent.click(
      getByTestId("CreateProjectForm.ParserSaveFullyCheckbox"),
    );
    await userEvent.click(getByTestId("CreateProjectForm.CreateButton"));

    expect(initSession).toHaveBeenCalledWith([]);
    expect(initProject).toHaveBeenCalledWith({ parser: testParser });
    expect(initTranslation).toHaveBeenCalledWith([]);
    expect(notifications.show).toHaveBeenCalled();
  });
});
