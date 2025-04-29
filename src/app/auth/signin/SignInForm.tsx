"use client";

import { Suspense, useState } from "react";
import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import FlexBox from "@/components/layout/FlexBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { useValidation } from "@/hooks/useValidation";
import { validatePasswordConfirm } from "@/utils/validate";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordError = useValidation(
    password,
    validatePasswordConfirm,
    "1234"
  );

  const handleLogin = () => {};

  return (
    <FlexBox
      direction="col"
      className="gap-4 pt-12 md:w-[600px] w-[328px] mx-auto"
    >
      <h1 className="font-bold text-2xl text-[#394150] text-center">로그인</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-8">
        <InputContainer label="이메일">
          <InputField
            value={email}
            setValue={setEmail}
            placeholder="이메일을 입력해주세요"
          />
        </InputContainer>
        <InputContainer label="비밀번호">
          <InputField
            type="password"
            value={password}
            setValue={setPassword}
            placeholder="비밀번호를 입력해주세요"
            // errorMessage={passwordError}
            // isError={!!passwordError}
          />
        </InputContainer>
      </form>
      <FlexBox direction="col" className="gap-y-4 mt-8">
        <button
          type="submit"
          className="bg-[#195BFF] md:py-4 md:px-6 py-3 px-5 rounded-xl w-full font-bold cursor-pointer"
        >
          로그인
          <Suspense fallback={<LoadingSpinner />}></Suspense>
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
            href="/"
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
