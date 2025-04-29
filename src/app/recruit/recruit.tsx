"use client";

import { JSX } from "react";
import PersonalInfo from "./steps/PersonalInfo";
import Field from "./steps/Field";
import Common from "./steps/Common";
import Complete from "./steps/Complete";
import FlexBox from "@/components/layout/FlexBox";
import StepBar from "@/components/StepBar";
import useRecruitStore from "@/store/recruitStore";

const recruitMap: Record<number, JSX.Element> = {
  1: <PersonalInfo />,
  2: <Field />,
  3: <Common />,
  4: <Complete />,
};

const maxStep = Object.keys(recruitMap).length;

const Recruit = () => {
  const { currentStep } = useRecruitStore();

  return (
    <>
      <div className="md:pt-28 md:pb-16 pt-20 pb-10">
        <StepBar
          title="15TH TAVE APPLY STEP"
          maxStep={maxStep}
          currentStep={currentStep}
        />
      </div>
      <section className="bg-[#F9FAFB] flex-1">
        <FlexBox
          className="py-12 md:w-[562px] w-[348px] mx-auto h-full gap-4"
          direction="col"
        >
          {recruitMap[currentStep]}
        </FlexBox>
      </section>
    </>
  );
};

export default Recruit;
