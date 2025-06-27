import { VerifyState } from "@/modules/authType";
import { createFieldStore } from "./createFieldStore";

interface ResetPasswordStore {
  name: string;
  birth: string;
  email: string;
  authCode: string;
  newPassword: string;
  newPasswordConfirm: string;
  currentStep: number;
  isSentState: VerifyState;
  isConfirmState: VerifyState;
}

const initStates: ResetPasswordStore = {
  name: "",
  birth: "",
  email: "",
  authCode: "",
  newPassword: "",
  newPasswordConfirm: "",
  currentStep: 1,
  isSentState: 'BEFORE',
  isConfirmState: 'BEFORE'
};

export const useResetPasswordStore = createFieldStore(initStates);
