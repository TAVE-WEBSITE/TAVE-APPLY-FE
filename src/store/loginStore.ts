import { createFieldStore } from "./createFieldStore";

interface LoginState {
  isLogin: boolean;
}

const initState = {
  isLogin: false,
};

const useLoginStore = createFieldStore(initState);
export { useLoginStore };
