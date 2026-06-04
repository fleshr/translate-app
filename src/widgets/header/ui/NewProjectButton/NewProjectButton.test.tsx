import { useParserStore } from "@/entities/parser";
import { getParserStoreStateMock } from "@/entities/parser/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import { useSessionStore } from "@/shared/model/sessionStore";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { NewProjectButton } from "./NewProjectButton";

describe("widgets/header/ui/NewProjectButton", () => {
  beforeEach(() => {
    useParserStore.setState(getParserStoreStateMock());
  });

  afterEach(() => {
    resetStore(useSessionStore, useParserStore);
  });

  it("should open modal", async () => {
    const { getByTestId, queryByTestId } = render(<NewProjectButton />);

    expect(queryByTestId("CreateProjectForm")).not.toBeInTheDocument();
    await userEvent.click(getByTestId("NewProjectButton"));
    expect(queryByTestId("CreateProjectForm")).toBeInTheDocument();
  });

  it("should be disabled when translating", () => {
    useSessionStore.setState({ status: "translating" });
    const { getByTestId } = render(<NewProjectButton />);

    expect(getByTestId("NewProjectButton")).toBeDisabled();
  });

  it("should close modal on cancel", async () => {
    const { getByTestId, queryByTestId } = render(<NewProjectButton />);

    await userEvent.click(getByTestId("NewProjectButton"));
    await userEvent.click(getByTestId("CreateProjectForm.CancelButton"));
    expect(queryByTestId("CreateProjectForm")).not.toBeInTheDocument();
  });

  it("should close modal on submit", async () => {
    const { getByTestId, getByRole, queryByTestId } = render(
      <NewProjectButton />,
    );

    await userEvent.click(getByTestId("NewProjectButton"));
    await userEvent.click(getByTestId("CreateProjectForm.ParserSelect"));
    await userEvent.click(
      getByRole("option", { name: "Test Module 1 (1.0.0)" }),
    );
    await userEvent.click(getByTestId("CreateProjectForm.CreateButton"));

    expect(queryByTestId("CreateProjectForm")).not.toBeInTheDocument();
  });
});
