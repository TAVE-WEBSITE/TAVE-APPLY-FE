"use client";

import React from "react";
import FlexBox from "./layout/FlexBox";

interface StepCounterProps {
  title?: string;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  maxStep: number;
  stepLabels: string[];
}
const StepCounter = ({
  title,
  currentStep,
  setCurrentStep,
  maxStep,
  stepLabels,
}: StepCounterProps) => {
  return (
    <FlexBox direction="col" className="gap-2 items-center">
      <h3 className="w-full text-md text-start font-bold text-black mb-2">
        {title}
      </h3>

      <FlexBox className="w-full justify-between font-bold text-lg items-center relative">
        {Array.from({ length: maxStep }, (_, i) => (
          <React.Fragment key={i}>
            <div
              onClick={() => setCurrentStep(i + 1)}
              className={`w-8 h-8 cursor-pointer relative rounded-full bg-[#44495D] flex justify-center items-center 
                         ${
                           i + 1 <= currentStep
                             ? "bg-blue-600 text-white"
                             : "bg-[#E5E7EB] text-[#394150]"
                         }`}
            >
              {i + 1}
            </div>
            {i + 1 < maxStep && (
              <div
                className={`flex-1 h-1 ${
                  i + 2 <= currentStep ? "bg-blue-600" : "bg-[#E5E7EB]"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </FlexBox>
      <FlexBox className="w-full justify-between">
        {stepLabels.map((label) => (
          <div key={label} className="w-8 text-center text-[#6C727F] text-xs">
            {label}
          </div>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default StepCounter;
