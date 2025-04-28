import { StoreApi, UseBoundStore } from "zustand";

type PersistOptions<T> = {
  name: string;
  keys: (keyof T)[];
};

// export const withPersist = <T extends object>(
//   store: UseBoundStore<StoreApi<T>>,
//   options: PersistOptions<T>
// ): UseBoundStore<StoreApi<T>> => {
//   const stored = localStorage.getItem(options.name);
//   if (stored) {
//     try {
//       const parsed = JSON.parse(stored);
//       store.setState(parsed);
//     } catch (e) {
//       console.error("Failed to parse persisted state", e);
//     }
//   }

//   const unsubscribe = store.subscribe((state) => {
//     const data = Object.fromEntries(
//       options.keys.map((key) => [key, state[key]])
//     );
//     localStorage.setItem(options.name, JSON.stringify(data));
//   });

//   return store;
// };

export const withPersist = <T extends object>(
  store: UseBoundStore<StoreApi<T>>,
  options: PersistOptions<T>
): UseBoundStore<StoreApi<T & { clearPersist: () => void }>> => {
  const stored = localStorage.getItem(options.name);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      store.setState(parsed);
    } catch (e) {
      console.error("Failed to parse persisted state", e);
    }
  }

  store.subscribe((state) => {
    const data = Object.fromEntries(
      options.keys.map((key) => [key, state[key]])
    );
    localStorage.setItem(options.name, JSON.stringify(data));
  });

  // 로컬 스토리지 초기화 함수
  (store.getState() as any).clearPersist = () => {
    localStorage.removeItem(options.name);
  };

  return store as UseBoundStore<StoreApi<T & { clearPersist: () => void }>>;
};
