import { StoreApi, UseBoundStore } from "zustand";

export const withReset = <T extends object>(
  store: UseBoundStore<StoreApi<T>>,
  initialStates: Partial<T>
): UseBoundStore<StoreApi<T>> => {
  // 상태에 reset 메서드 추가
  store.setState({
    reset: () => {
      store.setState(initialStates);
    },
  } as unknown as Partial<T>);

  return store;
};
