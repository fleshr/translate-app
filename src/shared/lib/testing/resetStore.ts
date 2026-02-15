import type { StoreApi } from "zustand";
import type { UseBoundStore } from "zustand/react";

export const resetStore = (...stores: UseBoundStore<StoreApi<object>>[]) => {
  stores.forEach((store) => {
    store.setState(store.getInitialState());
  });
};
