import React from 'react';
import FlexBox from '@/components/layout/FlexBox';

interface StepBarProps {
    title: string;
    currentStep: number;
    maxStep: number;
}

const StepBar = ({ title, currentStep, maxStep }: StepBarProps) => {
    return (
        <FlexBox direction="col" className="gap-4 items-center">
            <h2 className="text-2xl font-bold">{title}</h2>
            <FlexBox className="items-center">
                {Array.from({ length: maxStep }, (_, i) => (
                    <React.Fragment key={i}>
                        <FlexBox
                            className={`font-bold text-xl w-8 h-8 rounded-full justify-center items-center
                ${
                    i + 1 <= currentStep
                        ? 'bg-gradient-to-br from-blue-600 to-blue-400 text-white'
                        : 'bg-gray-600 text-[#7C808E]'
                }`}
                        >
                            {i + 1}
                        </FlexBox>
                        {i + 1 < maxStep && <div className="md:w-10 w-8 h-[3px] bg-[#44495D] mx-2" />}
                    </React.Fragment>
                ))}
            </FlexBox>
        </FlexBox>
    );
};

export default StepBar;
