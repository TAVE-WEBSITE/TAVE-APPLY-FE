'use client';

import { JSX } from 'react';
import PersonalInfo from './steps/PersonalInfo';
import Field from './steps/Field';
import Common from './steps/Common';
import Complete from './steps/Complete';
import FlexBox from '@/components/layout/FlexBox';
import StepBar from '@/components/layout/StepBar';
import formatOrdinal from '@/utils/formatOrdinal';
import { useRecruitStore } from '@/store/recruitStore';
import { useHomeStore } from '@/store/homeStore';
import { useMemberStore } from '@/store/memberStore';

const recruitMap: Record<number, JSX.Element> = {
    1: <PersonalInfo />,
    2: <Field />,
    3: <Common />,
    4: <Complete />,
};

const maxStep = Object.keys(recruitMap).length;

const Recruit = () => {
    const { currentStep } = useRecruitStore();
    const { generation } = useHomeStore();
    const { resumeState } = useMemberStore();

    const title = `${formatOrdinal(generation)} TAVE APPLY STEP`;

    return (
        <FlexBox direction="col" className="min-h-screen">
            <div
                className="pt-26 pb-13 md:pt-28 md:pb-16"
                style={{
                    backgroundImage: 'url(/background/middle-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <StepBar title={title} maxStep={maxStep} currentStep={currentStep} />
            </div>
            <section className="bg-[#F9FAFB] flex-1">
                <FlexBox className="pt-12 pb-16 md:w-[570px] sm:w-[360px] w-[308px] mx-auto" direction="col">
                    {resumeState === 'SUBMITTED' ? recruitMap[4] : recruitMap[currentStep]}
                </FlexBox>
            </section>
        </FlexBox>
    );
};

export default Recruit;
