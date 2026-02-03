'use client';

import { JSX } from 'react';
import StepBar from '@/components/layout/StepBar';
import FlexBox from '@/components/layout/FlexBox';
import FindPassword from './steps/FindPassword';
import ResetPassword from './steps/ResetPassword';
import { useResetPasswordStore } from '@/store/resetPasswordStore';

const resetPasswordMap: Record<number, JSX.Element> = {
    1: <FindPassword />,
    2: <ResetPassword />,
};

const stepCount = Object.keys(resetPasswordMap).length;

const Reset = () => {
    const { currentStep } = useResetPasswordStore();

    return (
        <FlexBox direction="col" className="min-h-screen">
            <div
                className="pt-24 pb-12"
                style={{
                    backgroundImage: 'url(/background/middle-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <StepBar title="비밀번호 찾기" maxStep={stepCount} currentStep={currentStep} />
            </div>
            <section className="bg-[#F9FAFB] flex-1">
                <FlexBox
                    direction="col"
                    className="py-10 md:pt-12 md:pb-16 md:w-[562px] sm:w-[360px] w-[308px] mx-auto"
                >
                    {resetPasswordMap[currentStep]}
                </FlexBox>
            </section>
        </FlexBox>
    );
};

export default Reset;
