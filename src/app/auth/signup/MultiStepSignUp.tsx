"use client";

import { JSX } from "react";
import StepBar from "@/components/StepBar";
import FlexBox from "@/components/layout/FlexBox";
import Terms from "./steps/Terms";
import PersonalInfo from "./steps/PersonalInfo";
import AccountSetUp from "./steps/AccountSetUp";
import Complete from "./steps/Complete";
import { useSignUpStore } from "@/store/signUpStore";

const signUpMap: Record<number, JSX.Element> = {
  1: <Terms />,
  2: <PersonalInfo />,
  3: <AccountSetUp />,
  4: <Complete />,
};

const stepCount = Object.keys(signUpMap).length;

const SignUpClient = () => {
  const { currentStep } = useSignUpStore();

  return (
    <>
      <div className="md:pt-28 md:pb-16 pt-20 pb-10">
        <StepBar
          title="JOIN TO TAVE"
          maxStep={stepCount}
          currentStep={currentStep}
        />
      </div>
      <section className="bg-[#F9FAFB] flex-1">
        <FlexBox
          className="py-12 md:w-[562px] w-[348px] mx-auto h-full gap-4"
          direction="col"
        >
          {signUpMap[currentStep]}
        </FlexBox>
      </section>
    </>
  );
};

export default SignUpClient;
