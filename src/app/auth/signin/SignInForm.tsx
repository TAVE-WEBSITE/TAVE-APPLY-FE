"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import FlexBox from "@/components/layout/FlexBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const { signIn, isSignInLoading } = useAuth();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setLoginError("");
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setLoginError("");
  };

  const handleLogin = async () => {
    const res = await signIn({
      email,
      password,
    });
    if (res === 200) {
      router.push("/");
    } else if (res && res.message) {
      setLoginError(res.message);
    }
    setEmail("");
    setPassword("");
    localStorage.setItem("email", email);
  };

  return (
    <FlexBox
      direction="col"
      className="gap-4 pt-12 md:w-[600px] w-[328px] mx-auto"
    >
      <h1 className="font-bold text-2xl text-[#394150] text-center">로그인</h1>
      <div onSubmit={handleLogin} className="flex flex-col gap-8">
        <InputContainer label="이메일">
          <InputField
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력해주세요"
            isError={loginError.length > 0}
          />
        </InputContainer>
        <InputContainer label="비밀번호">
          <InputField
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해주세요"
            errorMessage={loginError}
            isError={loginError.length > 0}
          />
        </InputContainer>
      </div>
      <FlexBox direction="col" className="gap-y-4 mt-8">
        <button
          type="button"
          onClick={handleLogin}
          className="bg-[#195BFF] md:py-4 md:px-6 py-3 px-5 rounded-xl w-full font-bold cursor-pointer"
        >
          {isSignInLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            "로그인"
          )}
        </button>
        <FlexBox className="justify-center gap-x-2">
          <Link
            href="/auth/signup"
            className="text-[#394150] opacity-60 text-sm md:text-md"
          >
            회원 가입
          </Link>
          <div className="w-[1.2px] h-5 bg-[#E5E7EB] mx-2" />
          <Link
            href="/auth/reset"
            className="text-[#394150] opacity-60 text-sm md:text-md"
          >
            비밀번호 찾기
          </Link>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default SignInForm;
