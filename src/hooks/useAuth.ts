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

    const signUp = async (body: SignUpData) => {
        try {
            const res = await axiosClient.post(`/v1/auth/normal/signup`, body);
            return res;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const verifyEmail = async (body: EmailVerification) => {
        try {
            setIsVerifyEmailLoading(true);
            const res = await axiosClient.post(`/v1/normal/reset/verify`, body);
            return res;
        } catch (error) {
            console.error(error);
            return error;
        } finally {
            setIsVerifyEmailLoading(false);
        }
    };

    const verifyConfirm = async (email: string, code: string) => {
        try {
            setIsVerifyConfirmLoading(true);
            const params = new URLSearchParams();
            params.append('email', email);
            params.append('code', code);
            const res = await axiosClient.post('/v1/normal/reset/verify/code', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            return res;
        } catch (error) {
            console.error(error);
            return error;
        } finally {
            setIsVerifyConfirmLoading(false);
        }
    };

    const resetPassword = async (body: PasswordReset) => {
        try {
            setIsResetPasswordLoading(true);
            const res = await axiosClient.post(`/v1/normal/password/change`, body);
            return res;
        } catch (error) {
            console.error(error);
            return error;
        } finally {
            setIsResetPasswordLoading(false);
        }
    };

    const signout = async () => {
        try {
            const res = await axiosClient.get(`/v1/auth/signout`);
            useLoginStore.getState().reset();
            localStorage.removeItem('accessToken');
            return res;
        } catch (error) {
            console.error(error);
            return error;
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
        isVerifyConfirmLoading,
        isResetPasswordLoading,
        isVerifyEmailLoading,
    };
};

export default useAuth;
