"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import OverLay from "../layout/OverLay";
import FlexBox from "../layout/FlexBox";
import Icons from "../Icons";
import LoginField from "../Input/LoginField";
import LoadingSpinner from "../LoadingSpinner";

interface LoginProps {
  setIsOpen: (isOpen: boolean) => void;
}
const Login = ({ setIsOpen }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <OverLay className="flex flex-col justify-center items-center">
      <div className="w-[352px] md:w-[600px] bg-white rounded-xl pt-4 px-4 md:pb-8 pb-6 relative">
        <h3 className="text-black font-bold md:text-3xl text-2xl text-center md:py-6 py-4">
          TAVE RECRUIT
        </h3>
        <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
          <Icons
            name="x"
            width={20}
            height={20}
            alt="close-modal"
            className="absolute top-5 right-5"
          />
        </button>
        <FlexBox direction="col" className="gap-4 w-9/10 mx-auto">
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
          <FlexBox direction="col" className="gap-y-4 mt-2">
            <button className="bg-[#195BFF] md:py-4 md:px-6 py-2 px-4 rounded-xl w-full font-bold cursor-pointer">
              로그인
              <Suspense fallback={<LoadingSpinner />}></Suspense>
            </button>
            <FlexBox className="justify-center gap-x-2">
              <Link
                href="/auth/register/terms"
                className="text-[#394150] opacity-60 text-sm md:text-md"
              >
                회원 가입
              </Link>
              <div className="w-[1.2px] h-5 bg-[#E5E7EB] mx-2" />
              <Link
                href="/auth/password/find"
                className="text-[#394150] opacity-60 text-sm md:text-md"
              >
                비밀번호 찾기
              </Link>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </div>
    </OverLay>
  );
};

export default Login;
