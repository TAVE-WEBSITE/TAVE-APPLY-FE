"use client";

import { JSX } from "react";
import StepBar from "@/components/StepBar";
import FlexBox from "@/components/layout/FlexBox";
import FindPassword from "./FindPassword";
import ResetPassword from "./ResetPassword";
import { useResetPasswordStore } from "@/store/resetPasswordStore";

/** 비밀번호 찾기 과정 - 1.찾기, 2.리셋 */
const resetPasswordMap: Record<number, JSX.Element> = {
  1: <FindPassword />,
  2: <ResetPassword />,
};

const stepCount = Object.keys(resetPasswordMap).length;

const Reset = () => {
  const { currentStep } = useResetPasswordStore();

  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="md:pt-28 md:pb-16 pt-20 pb-10">
          <StepBar
            title="비밀번호 찾기"
            maxStep={stepCount}
            currentStep={currentStep}
          />
        </div>
        <section className="bg-[#F9FAFB] flex-1">
          <FlexBox
            className="py-12 md:w-[562px] w-[348px] mx-auto h-full gap-4"
            direction="col"
          >
            {resetPasswordMap[currentStep]}
          </FlexBox>
        </section>
      </div>
    </>
  );
};

export default Reset;
