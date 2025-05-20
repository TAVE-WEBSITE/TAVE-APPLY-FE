import { StoreApi, UseBoundStore } from "zustand";

export const withReset = <T extends object>(
  store: UseBoundStore<StoreApi<T>>,
  initialStates: Partial<T>
): UseBoundStore<StoreApi<T>> => {

  store.setState({
    reset: () => {
      store.setState(initialStates);
    },
  } as unknown as Partial<T>);

  return store;
};
