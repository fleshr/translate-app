import { useTranslationStore } from "@/entities/translation";
import { getTranslationStoreStateMock } from "@/entities/translation/mocks";
import { render, resetStore } from "@/shared/lib/testing";
import { getSessionStoreStateMock } from "@/shared/mocks/sessionStore";
import {
  setSessionSelectedSegment,
  useSessionStore,
} from "@/shared/model/sessionStore";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TranslationTable } from "./TranslationTable";

vi.mock("@/shared/model/sessionStore", { spy: true });

describe("widgets/translation-table/ui/TranslationTable", () => {
  beforeEach(() => {
    useSessionStore.setState(
      getSessionStoreStateMock({
        selectedResource: "file-1",
        selectedSegment: "segment-2",
      }),
    );
    useTranslationStore.setState(getTranslationStoreStateMock());
  });

  afterEach(() => {
    resetStore(useSessionStore, useTranslationStore);
  });

  it("should render empty table", () => {
    useTranslationStore.setState(useTranslationStore.getInitialState());
    const { getByTestId } = render(<TranslationTable />);

    const table = getByTestId("TranslationTable");
    const head = getByTestId("TranslationTable.TableHead");
    const body = getByTestId("TranslationTable.TableBody");

    expect(table).toBeInTheDocument();
    expect(head).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(body).toBeEmptyDOMElement();
  });

  it("should render translation segments rows", () => {
    const { getByTestId } = render(<TranslationTable />);

    const segmentRow1 = getByTestId("TranslationTable.TableRow.0");
    const segmentRow2 = getByTestId("TranslationTable.TableRow.1");

    expect(segmentRow1).toHaveTextContent("test2");
    expect(segmentRow2).toHaveTextContent("test3");
  });

  it("should highlight selected segment", () => {
    const { getByTestId } = render(<TranslationTable />);

    const segmentRow1 = getByTestId("TranslationTable.TableRow.0");
    const segmentRow2 = getByTestId("TranslationTable.TableRow.1");

    expect(segmentRow1).toHaveAttribute("data-selected", "true");
    expect(segmentRow2).toHaveAttribute("data-selected", "false");
  });

  it("should handle segment row selection", async () => {
    const { getByTestId } = render(<TranslationTable />);

    const segmentRow2 = getByTestId("TranslationTable.TableRow.1");

    await userEvent.click(segmentRow2);
    expect(setSessionSelectedSegment).toHaveBeenCalledWith("segment-3");

    await userEvent.click(segmentRow2);
    expect(setSessionSelectedSegment).toHaveBeenCalledWith(null);
  });

  it.todo("strollToSegment test");
});
