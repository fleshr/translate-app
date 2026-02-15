import { render } from "@/shared/lib/testing";
import { useSessionStore } from "@/shared/model/sessionStore";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { SearchButton } from "./SearchButton";

describe("widgets/header/ui/SearchButton", () => {
  afterEach(() => {
    useSessionStore.setState(useSessionStore.getInitialState());
  });

  it("should be disabled when translating", () => {
    useSessionStore.setState({ status: "translating" });
    const { getByTestId } = render(<SearchButton />);

    expect(getByTestId("SearchButton")).toBeDisabled();
  });

  it("should open modal", async () => {
    const { getByTestId, queryByTestId } = render(<SearchButton />);

    expect(queryByTestId("SearchPanel")).not.toBeInTheDocument();

    await userEvent.click(getByTestId("SearchButton"));

    expect(queryByTestId("SearchPanel")).toBeInTheDocument();
  });
});
