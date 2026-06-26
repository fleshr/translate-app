import { render, resetStore } from "@/shared/lib/testing";
import {
  setSessionSelectedResource,
  setSessionSelectedSegment,
  useSessionStore,
} from "@/shared/model/sessionStore";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getSearchResultSelectMock } from "../../mocks";
import { toggleReplaceSelected } from "../../model/searchStore/actions";
import { useSearchStore } from "../../model/searchStore/store";
import { ResultSelect } from "./ResultSelect";

const testResult = getSearchResultSelectMock();

vi.mock("../../model/searchStore/actions", { spy: true });
vi.mock("@/shared/model/sessionStore", { spy: true });

describe("features/search/ui/ResultSelect", () => {
  afterEach(() => {
    resetStore(useSearchStore, useSessionStore);
  });

  it("should show label", () => {
    const { getByTestId } = render(<ResultSelect result={testResult} />);

    const label = getByTestId("ResultSelect.Highlight");
    expect(label).toHaveTextContent("Select");
  });

  it("should get selected state from store", () => {
    useSearchStore.setState({ replaceSelected: [testResult.segmentId] });
    const { getByTestId } = render(<ResultSelect result={testResult} />);

    const checkbox = getByTestId("ResultSelect.Checkbox");
    expect(checkbox).toBeChecked();
  });

  it("should toggle on checkbox click", async () => {
    const { getByTestId } = render(<ResultSelect result={testResult} />);

    const checkbox = getByTestId("ResultSelect.Checkbox");
    await userEvent.click(checkbox);

    expect(toggleReplaceSelected).toHaveBeenCalledWith(testResult.segmentId);
    expect(setSessionSelectedSegment).not.toHaveBeenCalled();
    expect(setSessionSelectedResource).not.toHaveBeenCalled();
  });

  it("should select resource and segment on click", async () => {
    const { getByTestId } = render(<ResultSelect result={testResult} />);

    const result = getByTestId("ResultSelect");
    await userEvent.click(result);

    expect(toggleReplaceSelected).not.toHaveBeenCalled();
    expect(setSessionSelectedSegment).toHaveBeenCalledWith(
      testResult.segmentId,
    );
    expect(setSessionSelectedResource).toHaveBeenCalledWith(
      testResult.resourceId,
    );
  });
});
