import { createFieldStore } from "./createFieldStore";

interface ResetPasswordStore {
  name: string;
  birth: string;
  email: string;
  authCode: string;
  newPassword: string;
  newPasswordConfirm: string;
  currentStep: number;
}

const initStates: ResetPasswordStore = {
  name: "",
  birth: "",
  email: "",
  authCode: "",
  newPassword: "",
  newPasswordConfirm: "",
  currentStep: 1,
};

export const useResetPasswordStore = createFieldStore(initStates);
