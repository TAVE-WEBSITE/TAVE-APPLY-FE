import { createFieldStore } from "./createFieldStore";
import { VerifyState } from '@/modules/authType'; 

interface SignUpStore {
  name: string;
  phoneNumber: string;
  birth: string;
  email: string;
  authCode: string;
  selectedGender: string;
  password: string;
  passwordConfirm: string;
  currentStep: number;
  checkService: boolean;
  checkPrivacy: boolean;
  isSentState: VerifyState;
  isConfirmState: VerifyState;
}

const initalStates: SignUpStore = {
  name: "",
  phoneNumber: "",
  birth: "",
  email: "",
  authCode: "",
  selectedGender: "",
  password: "",
  passwordConfirm: "",
  currentStep: 1,
  checkService: false,
  checkPrivacy: false,
  isSentState: 'BEFORE',
  isConfirmState: 'BEFORE'
};

export const useSignUpStore = createFieldStore(initalStates);
