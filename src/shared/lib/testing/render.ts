import { render, type RenderOptions } from "@testing-library/react";
import type { ReactNode } from "react";
import { TestingProviders } from "./providers";

const customRender = (ui: ReactNode, options?: RenderOptions) => {
  return render(ui, { wrapper: TestingProviders, ...options });
};

export { customRender as render };
