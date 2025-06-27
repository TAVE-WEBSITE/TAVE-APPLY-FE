interface SignUpData {
    email: string;
    password: string;
    phoneNumber: string;
    username: string;
    birthday: string;
    sex: 'MALE' | 'FEMALE';
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

interface EmailVerification {
    name: string;
    email: string;
    birth: string;
}

interface PasswordReset {
    email: string;
    password: string;
    validatedPassword: string;
}

type VerifyState = 'SUCCESS' | 'ERROR' | 'BEFORE';

export type { SignUpData, EmailVerification, PasswordReset, Login, LoginResponse, VerifyState };
