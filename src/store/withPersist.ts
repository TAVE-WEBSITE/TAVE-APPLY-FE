import { StoreApi, UseBoundStore } from "zustand";

type PersistOptions<T> = {
  name: string;
  keys: (keyof T)[];
};

export const withPersist = <T extends object>(
  store: UseBoundStore<StoreApi<T>>,
  options: PersistOptions<T>
): UseBoundStore<StoreApi<T & { clearPersist: () => void }>> => {
  if (typeof window === 'undefined') {
    return store as UseBoundStore<StoreApi<T & { clearPersist: () => void }>>;
  }
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

  (store.getState() as any).clearPersist = () => {
    localStorage.removeItem(options.name);
  };

  return store as UseBoundStore<StoreApi<T & { clearPersist: () => void }>>;
};
