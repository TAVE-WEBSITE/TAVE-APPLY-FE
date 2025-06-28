'use client';

import { JSX } from 'react';
import StepBar from '@/components/layout/StepBar';
import FlexBox from '@/components/layout/FlexBox';
import Terms from './steps/Terms';
import PersonalInfo from './steps/PersonalInfo';
import AccountSetUp from './steps/AccountSetUp';
import Complete from './steps/Complete';
import { useSignUpStore } from '@/store/signUpStore';

const signUpMap: Record<number, JSX.Element> = {
    1: <Terms />,
    2: <PersonalInfo />,
    3: <AccountSetUp />,
    4: <Complete />,
};

const stepCount = Object.keys(signUpMap).length;

const SignUp = () => {
    const { currentStep } = useSignUpStore();

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
                <StepBar title="JOIN TO TAVE" maxStep={stepCount} currentStep={currentStep} />
            </div>
            <section className="bg-[#F9FAFB] flex-1 flex">
                <FlexBox direction="col" className="py-10 md:pt-12 md:pb-16 md:w-[562px] sm:w-[360px] w-[308px] mx-auto">
                    {signUpMap[currentStep]}
                </FlexBox>
            </section>
        </FlexBox>
    );
};

export default SignUp;
