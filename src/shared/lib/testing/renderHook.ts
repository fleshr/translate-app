import { renderHook, type RenderHookOptions } from "@testing-library/react";
import { TestingProviders } from "./providers";

const customRender = <Result, Props>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props>,
) => {
  return renderHook(render, { wrapper: TestingProviders, ...options });
};

export { customRender as renderHook };
