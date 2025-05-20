import { createFieldStore } from "./createFieldStore";

const initState = {
  isLogin: false,
};

export const useLoginStore = createFieldStore(initState);
