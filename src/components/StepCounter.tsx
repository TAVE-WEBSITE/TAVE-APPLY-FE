'use client';

import React from 'react';
import FlexBox from '@/components/layout/FlexBox';

interface StepCounterProps {
    title: string;
    currentStep: number;
    setCurrentStep: (step: number) => void;
    maxStep: number;
    stepLabels: string[];
}

const StepCounter = ({ title, currentStep, setCurrentStep, maxStep, stepLabels }: StepCounterProps) => {
    return (
        <FlexBox direction="col" className="gap-2">
            <p className="font-semibold text-black mb-2">{title}</p>
            <FlexBox className="w-full justify-between font-semibold text-lg items-center">
                {Array.from({ length: maxStep }, (_, i) => (
                    <React.Fragment key={i}>
                        <div
                            onClick={() => setCurrentStep(i + 1)}
                            className={`w-8 h-8 cursor-pointer rounded-full flex justify-center items-center 
                         ${i + 1 <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {i + 1}
                        </div>
                        {i + 1 < maxStep && (
                            <div className={`flex-1 h-1 ${i + 2 <= currentStep ? 'bg-blue-600' : 'bg-gray-200'}`} />
                        )}
                    </React.Fragment>
                ))}
            </FlexBox>
            <FlexBox className="w-full justify-between">
                {stepLabels.map((label) => (
                    <div key={label} className="w-8 text-center text-gray-500 font-medium text-xs">
                        {label}
                    </div>
                ))}
            </FlexBox>
        </FlexBox>
    );
};

export default StepCounter;
