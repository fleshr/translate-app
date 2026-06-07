import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { render, resetStore } from "@/shared/lib/testing";
import {
  setSessionSelectedResource,
  useSessionStore,
} from "@/shared/model/sessionStore";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TranslationResourceButton } from "./TranslationResourceButton";

const testStore = getTranslationStoreStateMock();
const testResource = testStore.resources.byId["file-1"]!;

vi.mock("@/shared/model/sessionStore", { spy: true });

describe("widgets/translation-resources/ui/TranslationResourceButton", () => {
  beforeEach(() => {
    useTranslationStore.setState(testStore);
  });

  afterEach(() => {
    resetStore(
      useSessionStore,
      useTranslationStore,
      useTranslationProcessStore,
    );
  });

  it("should render with correct label and progress", () => {
    const { getByTestId } = render(
      <TranslationResourceButton resource={testResource} />,
    );

    const button = getByTestId("TranslationResourceButton");

    expect(button).toHaveTextContent("File 1");
    expect(button).toHaveTextContent("50%");
  });

  it("should be selected and processing", () => {
    useTranslationProcessStore.setState({
      translatingResource: testResource.id,
    });
    useSessionStore.setState({
      selectedResource: testResource.id,
    });
    const { getByTestId } = render(
      <TranslationResourceButton resource={testResource} />,
    );

    const button = getByTestId("TranslationResourceButton");
    const loader = getByTestId("TranslationResourceButton.Loader");

    expect(button).toHaveAttribute("data-selected", "true");
    expect(loader).toBeInTheDocument();
  });

  it("should select resource on click", async () => {
    const { getByTestId } = render(
      <TranslationResourceButton resource={testResource} />,
    );

    const button = getByTestId("TranslationResourceButton");
    await userEvent.click(button);

    expect(setSessionSelectedResource).toHaveBeenCalledWith(testResource.id);
  });
});
