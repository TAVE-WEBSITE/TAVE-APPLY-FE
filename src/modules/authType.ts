interface SignUpData {
  email: string;
  password: string;
  phoneNumber: string;
  username: string;
  birthday: string;
  sex: "MALE" | "FEMALE";
}

interface EmailVerification {
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
  EmailVerification,
  PasswordReset,
  Login,
  LoginResponse,
};
