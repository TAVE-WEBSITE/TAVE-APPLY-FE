import axios from 'axios';
import { useState } from 'react';
import { axiosClient } from '@/api/axiosClient';
import { SignUpData, EmailVerification, PasswordReset, Login, LoginResponse } from '@/modules/authType';
import { useLoginStore } from '@/store/loginStore';

const useAuth = () => {
    const { setIsLogin, setEmail, setMemberId, setUsername } = useLoginStore();
    const [isSignInLoading, setIsSignInLoading] = useState(false);
    const [isVerifyEmailLoading, setIsVerifyEmailLoading] = useState(false);
    const [isVerifyConfirmLoading, setIsVerifyConfirmLoading] = useState(false);
    const [isResetPasswordLoading, setIsResetPasswordLoading] = useState(false);

    const signIn = async (body: Login) => {
        try {
            setIsSignInLoading(true);
            const res = await axiosClient.post(`/v1/auth/signin`, body);
            const data: LoginResponse = res.data.result;
            localStorage.setItem('accessToken', data.accessToken);
            setIsLogin(true);
            setEmail(data.email);
            setMemberId(data.memberId);
            setUsername(data.username);
            return res.status;
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        } finally {
            setIsSignInLoading(false);
        }
    };

    /////////

    const signUp = async (userData: SignUpData) => {
        try {
            const res = await axiosClient.post(`v1/auth/normal/signup`, userData);
            return res.data;
        } catch (error) {
            return error;
        }
    };

    const signout = async () => {
        try {
            const res = await axiosClient.get(`/v1/auth/signout`);

            if (res.status === 200) {
                setIsLogin(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const verifyEmail = async (body: EmailVerification, reset: boolean) => {
        try {
            setIsVerifyEmailLoading(true);
            const res = await axiosClient.post(`/normal/authenticate/email?reset=${reset}`, body);

            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            return error;
        } finally {
            setIsVerifyEmailLoading(false);
        }
    };

    const verifyConfirm = async (body: EmailVerification, reset: boolean) => {
        try {
            setIsVerifyConfirmLoading(true);
            const res = await axiosClient.post(`/normal/verify/number?reset=${reset}`, body);

            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            return error;
        } finally {
            setIsVerifyConfirmLoading(false);
        }
    };

    const resetPassword = async (body: PasswordReset) => {
        try {
            setIsResetPasswordLoading(true);
            const res = await axiosClient.post(`/normal/password/change`, body);

            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            return error;
        } finally {
            setIsResetPasswordLoading(false);
        }
    };

    return {
        signUp,
        signIn,
        verifyEmail,
        verifyConfirm,
        signout,
        resetPassword,
        isSignInLoading,
        isVerifyEmailLoading,
        isVerifyConfirmLoading,
        isResetPasswordLoading,
    };
};

export default useAuth;
