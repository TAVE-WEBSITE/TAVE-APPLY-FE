"use client";

import LoginField from "@/components/Input/LoginField";
import FlexBox from "@/components/layout/FlexBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { Suspense, useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <FlexBox
      direction="col"
      className="gap-4 pt-12 md:w-[600px] w-[328px] mx-auto"
    >
      <h1 className="font-bold text-2xl text-[#394150] text-center">로그인</h1>
      <form onSubmit={handleLogin}>
        <FlexBox direction="col" className="gap-4">
          <LoginField
            label="이메일"
            value={email}
            setValue={setEmail}
            placeholder="이메일을 입력해주세요"
            errorMessage="이메일이 일치하지 않습니다:)"
          />
          <LoginField
            label="비밀번호"
            value={password}
            setValue={setPassword}
            placeholder="비밀번호를 입력해주세요"
            errorMessage="비밀번호가 일치하지 않습니다"
          />
        </FlexBox>
      </form>
      <FlexBox direction="col" className="gap-y-4 mt-2">
        <button
          type="submit"
          className="bg-[#195BFF] md:py-4 md:px-6 py-2 px-4 rounded-xl w-full font-bold cursor-pointer"
        >
          로그인
          <Suspense fallback={<LoadingSpinner />}></Suspense>
        </button>
        <FlexBox className="justify-center gap-x-2">
          <Link
            href="/register/terms"
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

export default LoginForm;
