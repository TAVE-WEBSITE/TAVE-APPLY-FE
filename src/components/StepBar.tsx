"use client";

import React from "react";
import FlexBox from "./layout/FlexBox";

interface StepBarProps {
  title?: string;
  currentStep: number;
  setCurrentStep?: (step: number) => void;
  maxStep: number;
}
const StepBar = ({ title, currentStep, maxStep }: StepBarProps) => {
  return (
    <FlexBox direction="col" className="gap-4 items-center">
      <h3 className="text-2xl font-bold">{title}</h3>
      <FlexBox className="font-bold text-xl items-center">
        {Array.from({ length: maxStep }, (_, i) => (
          <React.Fragment key={i}>
            <div
              className={`w-8 h-8 rounded-full bg-[#44495D] flex justify-center items-center 
                ${
                  i + 1 <= currentStep
                    ? "bg-gradient-to-r from-[#1A5BFF] to-[#60AFFF]"
                    : ""
                }`}
            >
              {i + 1}
            </div>
            {i + 1 < maxStep && <div className="w-12 h-1 bg-[#44495D] mx-2" />}
          </React.Fragment>
        ))}
      </FlexBox>
    </FlexBox>
  );
};

export default StepBar;
