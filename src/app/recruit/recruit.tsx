'use client';

import { JSX, useEffect, useState } from 'react';
import { useRecruitStore } from '@/store/recruitStore';
import { useHomeStore } from '@/store/homeStore';
import { useMemberStore } from '@/store/memberStore';
import PersonalInfo from './steps/PersonalInfo';
import Field from './steps/Field';
import Common from './steps/Common';
import Complete from './steps/Complete';
import Guide from './Guide';
import FlexBox from '@/components/layout/FlexBox';
import StepBar from '@/components/layout/StepBar';
import formatOrdinal from '@/utils/formatOrdinal';
import useResult from '@/hooks/useResult';

const recruitMap: Record<number, JSX.Element> = {
    1: <PersonalInfo />,
    2: <Field />,
    3: <Common />,
    4: <Complete />,
};

const stepCount = Object.keys(recruitMap).length;

const Recruit = () => {
    const [isDocument, setIsDocument] = useState(false);
    const { currentStep, isClickedFourth } = useRecruitStore();
    const { applyIsDocument } = useResult();
    const { generation } = useHomeStore();
    const { resumeState } = useMemberStore();

    const title = `${formatOrdinal(generation)} TAVE APPLY STEP`;

    useEffect(() => {
        const fetchDocument = async () => {
            const documentData = await applyIsDocument();
            setIsDocument(documentData);
        };

        fetchDocument();
    }, []);

    return (
        <FlexBox direction="col" className="min-h-screen">
            <div
                className="pt-26 pb-13 md:pt-28 md:pb-15"
                style={{
                    backgroundImage: 'url(/background/middle-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {(resumeState === 'SUBMITTED' && isClickedFourth) || !isDocument ? (
                    <h2 className="md:text-3xl text-2xl font-bold text-center">TAVE APPLICATION INFO</h2>
                ) : (
                    <StepBar title={title} maxStep={stepCount} currentStep={currentStep} />
                )}
            </div>
            <section className="bg-[#F9FAFB] flex-1 flex">
                <FlexBox
                    direction="col"
                    className="md:pt-12 pt-10 md:pb-26 pb-16 md:w-[570px] sm:w-[400px] w-[314px] mx-auto"
                >
                    {isDocument ? (
                        resumeState === 'SUBMITTED' && isClickedFourth ? (
                            <Guide type="submit" />
                        ) : (
                            recruitMap[currentStep]
                        )
                    ) : (
                        <Guide type="period" />
                    )}
                </FlexBox>
            </section>
        </FlexBox>
    );
};

export default Recruit;
