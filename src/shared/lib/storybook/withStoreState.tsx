import type { Decorator } from "@storybook/react-vite";
import { useLayoutEffect } from "react";
import type { StoreApi, UseBoundStore } from "zustand";

export const withStoreState = <Store extends UseBoundStore<StoreApi<object>>>(
  store: Store,
  state: ReturnType<Store["getState"]>,
): Decorator => {
  return (Story) => {
    useLayoutEffect(() => {
      store.setState(state);

      return () => {
        store.setState(store.getInitialState());
      };
    }, []);

    return <Story />;
  };
};
