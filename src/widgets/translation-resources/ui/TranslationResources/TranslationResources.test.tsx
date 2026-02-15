import { render, resetStore } from "@/shared/lib/testing";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { getTranslationStoreStateMock } from "@/shared/mocks/translationStore";
import {
  setSessionSelectedResource,
  useSessionStore,
} from "@/shared/model/sessionStore";
import { useTranslationStore } from "@/shared/model/translationStore";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TranslationResources } from "./TranslationResources";

vi.mock("@/shared/model/sessionStore", { spy: true });

describe("widgets/translation-resources/TranslationResources", () => {
  beforeEach(() => {
    useTranslationStore.setState(getTranslationStoreStateMock());
    useSessionStore.setState(
      getSessionStoreStateMock({
        selectedResource: "file-1",
        translatingResource: "file-1",
      }),
    );
  });

  afterEach(() => {
    resetStore(useTranslationStore, useSessionStore);
  });

  it("should render empty list if no resources", () => {
    useTranslationStore.setState(useTranslationStore.getInitialState());
    const { queryByTestId } = render(<TranslationResources />);

    const list = queryByTestId("TranslationResources.List");
    expect(list).toBeEmptyDOMElement();
  });

  it("should render list of resources", () => {
    const { getByTestId } = render(<TranslationResources />);

    const item1 = getByTestId("TranslationResources.Item.0");
    const item2 = getByTestId("TranslationResources.Item.1");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  it("should correctly pass selected, progress and processing props", () => {
    const { queryByTestId } = render(<TranslationResources />);

    const item1 = queryByTestId("TranslationResources.Item.0");
    const item2 = queryByTestId("TranslationResources.Item.1");

    expect(item1).toHaveAttribute("data-variant", "subtle");
    expect(item2).toHaveAttribute("data-variant", "filled");

    const loader1 = queryByTestId("TranslationResources.Item.0.Loader");
    const loader2 = queryByTestId("TranslationResources.Item.1.Loader");

    expect(loader1).not.toBeInTheDocument();
    expect(loader2).toBeInTheDocument();

    const progress1 = queryByTestId("TranslationResources.Item.0.Badge");
    const progress2 = queryByTestId("TranslationResources.Item.1.Badge");

    expect(progress1).toHaveTextContent("100%");
    expect(progress2).toHaveTextContent("25%");
  });

  it("should call setSessionSelectedResource on select", async () => {
    const { getByTestId } = render(<TranslationResources />);

    const button = getByTestId("TranslationResources.Item.0");
    await userEvent.click(button);

    expect(setSessionSelectedResource).toHaveBeenCalledWith("common-1");
  });
});
