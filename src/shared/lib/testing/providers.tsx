import { Providers } from "@/app/providers";
import type { PropsWithChildren } from "react";

export const TestingProviders = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <Providers locale="en" env="test">
      {children}
    </Providers>
  );
};
