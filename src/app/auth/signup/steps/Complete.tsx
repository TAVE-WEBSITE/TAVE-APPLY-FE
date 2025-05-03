"use client";

import { useRouter } from "next/navigation";
import { useSignUpStore } from "@/store/signUpStore";
import FlexBox from "@/components/layout/FlexBox";

const Complete = () => {
  const router = useRouter();
  const { name, reset } = useSignUpStore();

  return (
    <FlexBox
      direction="col"
      className="text-[#394150] md:text-[32px] text-2xl font-bold text-center h-full justify-center gap-8"
    >
      <div>
        <p>{name}님</p>
        <p>회원가입이 완료되었습니다!</p>
      </div>
      <FlexBox direction="col" className="items-center">
        <button
          onClick={() => {
            reset();
            router.push("/");
          }}
          className="w-[98px] h-[50px] bg-[#195BFF] cursor-pointer text-[#FFFFFF] font-bold text-base rounded-lg flex items-center justify-center"
        >
          돌아가기
        </button>
      </FlexBox>
    </FlexBox>
  );
};

export default Complete;
