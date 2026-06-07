import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { useTranslationProcessStore } from "@/features/translation-process";
import { render, resetStore } from "@/shared/lib/testing";
import { useSessionStore } from "@/shared/model/sessionStore";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TranslationResources } from "./TranslationResources";

const testStore = getTranslationStoreStateMock();
const testResource = testStore.resources.byId["file-1"]!;

vi.mock("@/shared/model/sessionStore", { spy: true });

describe("widgets/translation-resources/ui/TranslationResources", () => {
  beforeEach(() => {
    useSessionStore.setState({ selectedResource: testResource.id });
    useTranslationProcessStore.setState({
      translatingResource: testResource.id,
    });
  });

  afterEach(() => {
    resetStore(
      useSessionStore,
      useTranslationStore,
      useTranslationProcessStore,
    );
  });

  it("should render empty list if no resources", () => {
    const { queryByTestId } = render(<TranslationResources />);

    const list = queryByTestId("TranslationResources.List");

    expect(list).toBeEmptyDOMElement();
  });

  it("should render list of resources", () => {
    useTranslationStore.setState(testStore);
    const { getByTestId } = render(<TranslationResources />);

    const item1 = getByTestId("TranslationResources.Item.0");
    const item2 = getByTestId("TranslationResources.Item.1");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });
});
