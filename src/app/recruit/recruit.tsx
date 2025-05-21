'use client';

import { JSX } from 'react';
import PersonalInfo from './steps/PersonalInfo';
import Field from './steps/Field';
import Common from './steps/Common';
import Complete from './steps/Complete';
import FlexBox from '@/components/layout/FlexBox';
import StepBar from '@/components/StepBar';
import { useRecruitStore } from '@/store/recruitStore';

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
        <FlexBox direction="col">
            <div
                className="pt-26 pb-13 md:pt-28 md:pb-16"
                style={{
                    backgroundImage: 'url(/background/middle-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <StepBar title="15TH TAVE APPLY STEP" maxStep={maxStep} currentStep={currentStep} />
            </div>
            <section className="bg-[#F9FAFB] flex-1">
                <FlexBox className="pt-12 pb-16 md:w-[562px] w-[312px] mx-auto" direction="col">
                    {recruitMap[currentStep]}
                </FlexBox>
            </section>
        </FlexBox>
    );
};

export default Recruit;
