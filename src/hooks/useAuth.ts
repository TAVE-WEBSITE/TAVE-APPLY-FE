import { useState } from "react";
import axios from "axios";
import { axiosInstance } from "@/api/axiosInstance";
import {
  SignUpData,
  VerifyEmail,
  VerifyConfirm,
  PasswordReset,
  Login,
  LoginResponse,
} from "@/app/types/auth";
import { useLoginStore } from "@/store/loginStore";

export const useAuth = () => {
  const { setIsLogin } = useLoginStore();
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isVerifyEmailLoading, setIsVerifyEmailLoading] = useState(false);
  const [isVerifyConfirmLoading, setIsVerifyConfirmLoading] = useState(false);
  const [isResetPasswordLoading, setIsResetPasswordLoading] = useState(false);

  const signUp = async (userData: SignUpData) => {
    try {
      setIsSignUpLoading(true);
      const res = await axiosInstance.post(`/v1/auth/normal/signup`, userData);

      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      return error;
    } finally {
      setIsSignUpLoading(false);
    }
  };

  const signIn = async (body: Login) => {
    try {
      setIsSignInLoading(true);
      const res = await axiosInstance.post(`/v1/auth/signin`, body);

      if (res.status === 200) {
        const data = res.data;
        const result: LoginResponse = data.result;
        localStorage.setItem("accessToken", result.accessToken);
        setIsLogin(true);
        return res.status;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        return error.response?.data;
      }
    } finally {
      setIsSignInLoading(false);
    }
  };

  const signout = async () => {
    try {
      const res = await axiosInstance.get(`/v1/auth/signout`);

      if (res.status === 200) {
        setIsLogin(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const verifyEmail = async (body: VerifyEmail, reset: boolean) => {
    try {
      setIsVerifyEmailLoading(true);
      const res = await axiosInstance.post(
        `/v1/normal/authenticate/email?reset=${reset}`,
        body
      );

      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      return error;
    } finally {
      setIsVerifyEmailLoading(false);
    }
  };

  const verifyConfirm = async (body: VerifyConfirm, reset: boolean) => {
    try {
      setIsVerifyConfirmLoading(true);
      const res = await axiosInstance.post(
        `/v1/normal/verify/number?reset=${reset}`,
        body
      );

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
      const res = await axiosInstance.post(`/v1/normal/password/change`, body);

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
    isSignUpLoading,
    isSignInLoading,
    isVerifyEmailLoading,
    isVerifyConfirmLoading,
    isResetPasswordLoading,
  };
};
