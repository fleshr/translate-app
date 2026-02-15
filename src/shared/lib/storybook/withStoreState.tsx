import type { Decorator } from "@storybook/react-vite";
import { useLayoutEffect } from "react";
import { mergeDeep } from "remeda";
import type { PartialDeep } from "type-fest";
import type { StoreApi, UseBoundStore } from "zustand";

export const withStoreState = <Store extends UseBoundStore<StoreApi<object>>>(
  store: Store,
  state: PartialDeep<ReturnType<Store["getState"]>>,
): Decorator => {
  return (Story) => {
    useLayoutEffect(() => {
      store.setState(mergeDeep(store.getInitialState(), state));

      return () => {
        store.setState(store.getInitialState());
      };
    }, []);

    return <Story />;
  };
};
