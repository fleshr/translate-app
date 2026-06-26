import type { Decorator } from "@storybook/react-vite";
import { useEffect } from "react";
import type { StoreApi, UseBoundStore } from "zustand";

export const withStoreState = <Store extends UseBoundStore<StoreApi<object>>>(
  store: Store,
  state: ReturnType<Store["getState"]>,
): Decorator => {
  return (Story) => {
    store.setState(state);

    useEffect(() => {
      return () => {
        store.setState(store.getInitialState());
      };
    }, []);

    return <Story />;
  };
};
