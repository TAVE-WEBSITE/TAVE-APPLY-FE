interface SignUpData {
  email: string;
  password: string;
  phoneNumber: string;
  username: string;
  birthday: string;
  sex: "MALE" | "FEMALE";
}

/** 인증번호 요청 바디 타입 */
interface VerifyRequest {
  email: string;
  number: string;
  reset: boolean;
}

/** 인증번호 확인 바디 타입 */
interface VerifyConfirm {
  email: string;
  number: string;
}

interface PasswordReset {
  email: string;
  password: string;
  validatedPassword: string;
}

interface Login {
  email: string;
  password: string;
}

interface LoginResponse {
  grantType: string;
  accessToken: string;
  memberId: number;
  email: string;
  nickname: string;
  username: string;
  agitId: string;
  generation: string;
  department: string;
  job: string;
}
export type {
  SignUpData,
  VerifyRequest,
  VerifyConfirm,
  PasswordReset,
  Login,
  LoginResponse,
};
