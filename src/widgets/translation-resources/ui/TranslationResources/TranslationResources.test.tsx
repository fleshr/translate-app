import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import { useSessionStore } from "@/shared/model/sessionStore";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TranslationResources } from "./TranslationResources";

const testStore = getTranslationStoreStateMock();
const testResource = testStore.resources.byId["file-1"]!;

vi.mock("@/shared/model/sessionStore", { spy: true });

describe("widgets/translation-resources/ui/TranslationResources", () => {
  beforeEach(() => {
    useSessionStore.setState(
      getSessionStoreStateMock({
        selectedResource: testResource.id,
        translatingResource: testResource.id,
      }),
    );
  });

  afterEach(() => {
    resetStore(useTranslationStore, useSessionStore);
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
