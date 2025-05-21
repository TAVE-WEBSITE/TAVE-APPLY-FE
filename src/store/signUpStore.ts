import { createFieldStore } from "./createFieldStore";

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
};

export const useSignUpStore = createFieldStore(initalStates);
