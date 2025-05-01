import { useState } from "react";
import axios from "axios";
import { axiosInstance } from "@/api/axiosInstance";
import {
  SignUpData,
  VerifyRequest,
  VerifyConfirm,
  PasswordReset,
  Login,
  LoginResponse,
} from "@/app/types/auth";

export const useAuth = () => {
  const [isSignUpLoading, setIsSignUpLoading] = useState(false);
  const [isSignInLoading, setIsSignInLoading] = useState(false);
  const [isVerifyRequestLoading, setIsVerifyRequestLoading] = useState(false);
  const [isVerifyConfirmLoading, setIsVerifyConfirmLoading] = useState(false);
  //const [error, setError] = useState(null);

  const signUp = async (userData: SignUpData, callback: () => void) => {
    try {
      setIsSignUpLoading(true);
      const res = await axiosInstance.post(`/v1/auth/normal/signup`, userData);

      if (res.status === 200) {
        callback();
        return res.data;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSignUpLoading(false);
    }
  };

  const signIn = async (body: Login, callback: () => void) => {
    try {
      setIsSignInLoading(true);
      const res = await axiosInstance.post(`/v1/auth/signin`, body);

      if (res.status === 200) {
        const result: LoginResponse = res.data;
        localStorage.setItem("accessToken", result.accessToken);
        callback();
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      }
    } finally {
      setIsSignInLoading(false);
    }
  };

  const login = async () => {};

  const logout = async () => {};

  const verifyRequest = async (body: VerifyRequest) => {
    try {
      setIsVerifyRequestLoading(true);
      const res = await axiosInstance.post(
        `/v1/normal/authenticate/email`,
        body
      );

      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsVerifyRequestLoading(false);
    }
  };

  const verifyConfirm = async (body: VerifyConfirm) => {
    try {
      setIsVerifyConfirmLoading(true);
      const res = await axiosInstance.post(`/v1/normal/verify/number`, body);

      if (res.status === 200) {
        console.log(res.data);
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsVerifyConfirmLoading(false);
    }
  };

  const resetPassword = async (body: PasswordReset) => {};

  return {
    signUp,
    signIn,
    verifyRequest,
    verifyConfirm,
    isSignUpLoading,
    isSignInLoading,
    isVerifyRequestLoading,
    isVerifyConfirmLoading,
  };
};
