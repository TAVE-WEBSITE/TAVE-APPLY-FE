'use client';

import { JSX, useEffect, useState } from 'react';
import { FinalData, InterviewData, OutcomeStatus } from '@/modules/resultType';
import { useMemberStore } from '@/store/memberStore';
import { useHomeStore } from '@/store/homeStore';
import FinalPassed from './results/FinalPassed';
import PaperPassed from './results/PaperPassed';
import Failed from './results/Failed';
import FlexBox from '@/components/layout/FlexBox';
import formatOrdinal from '@/utils/formatOrdinal';
import useResult from '@/hooks/useResult';

const Outcome = () => {
    const { generation, firstSession } = useHomeStore();
    const { applicationStatus, username } = useMemberStore();
    const [final, setFinal] = useState<FinalData>();
    const [interview, setInterview] = useState<InterviewData>();
    const { applyFinal, applyInterview } = useResult();

    useEffect(() => {
        if (!generation || !applicationStatus) return;

        const fetchOutcome = async () => {
            if (applicationStatus === 'FINAL_ACCEPTED') {
                const finalData = await applyFinal();
                setFinal(finalData);
            } else if (applicationStatus === 'DOCUMENT_PASSED') {
                const interviewData = await applyInterview(generation);
                setInterview(interviewData);
            }
        };

        fetchOutcome();
    }, [generation, applicationStatus]);

    const outcomeMap: Record<OutcomeStatus, JSX.Element> = {
        FINAL_ACCEPTED: final ? (
            <FinalPassed username={username} generation={generation} final={final} firstSession={firstSession} />
        ) : (
            <></>
        ),
        DOCUMENT_PASSED: interview ? (
            <PaperPassed username={username} generation={generation} interview={interview} />
        ) : (
            <></>
        ),
        REJECTED: <Failed username={username} generation={generation} />,
        NO_STATUS: <></>,
    };

    const titleMap: Record<OutcomeStatus, string> = {
        FINAL_ACCEPTED: `WELCOME TO ${formatOrdinal(generation)} TAVE`,
        DOCUMENT_PASSED: `${formatOrdinal(generation)} TAVY\nOFFLINE INTERVIEW`,
        REJECTED: `${formatOrdinal(generation)} TAVE\nAPPLICATION RESULT`,
        NO_STATUS: '',
    };

    return (
        <FlexBox direction="col" className="min-h-screen">
            <div
                className="pt-26 pb-12 md:pt-30 md:pb-16"
                style={{
                    backgroundImage: 'url(/background/side-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                }}
            >
                <h2 className="md:text-3xl text-2xl font-bold text-center whitespace-pre-line">
                    {titleMap[applicationStatus]}
                </h2>
            </div>
            <section className="bg-[#F9FAFB] flex-1">
                <FlexBox direction="col" className="md:py-22 py-12 md:w-[562px] w-[312px] mx-auto">
                    {outcomeMap[applicationStatus]}
                </FlexBox>
            </section>
        </FlexBox>
    );
};

export default Outcome;
