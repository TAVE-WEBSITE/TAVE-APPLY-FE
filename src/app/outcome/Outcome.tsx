'use client';

import { JSX, useEffect, useState } from 'react';
import { FinalData, InterviewData, OutcomeStatus } from '@/modules/resultType';
import { useMemberStore } from '@/store/memberStore';
import { useHomeStore } from '@/store/homeStore';
import formatOrdinal from '@/utils/formatOrdinal';
import FlexBox from '@/components/layout/FlexBox';
import FinalPassed from './FinalPassed';
import PaperPassed from './PaperPassed';
import Failed from './Failed';
import useResult from '@/hooks/useResult';

const Outcome = () => {
    const { generation } = useHomeStore();
    const { applicationStatus, username } = useMemberStore();
    const [final, setFinal] = useState<FinalData>();
    const [interview, setInterview] = useState<InterviewData>();

    const { getFinal, getInterview } = useResult();

    useEffect(() => {
        const fetchOutcome = async () => {
            if (applicationStatus === 'FINAL_ACCEPTED') {
                const finalData = await getFinal();
                setFinal(finalData);
            } else if (applicationStatus === 'DOCUMENT_PASSED') {
                const interviewData = await getInterview(Number(generation));
                setInterview(interviewData);
            }
        };

        fetchOutcome();
    }, []);

    const outcomeMap: Record<OutcomeStatus, JSX.Element> = {
        FINAL_ACCEPTED: <FinalPassed username={username} generation={generation} final={final!} />,
        DOCUMENT_PASSED: <PaperPassed username={username} generation={generation} interview={interview!} />,
        REJECTED: <Failed />,
        NO_STATUS: <></>,
    };

    const titleMap: Record<OutcomeStatus, string> = {
        FINAL_ACCEPTED: `WELCOME TO ${formatOrdinal(generation)} TAVE`,
        DOCUMENT_PASSED: `${formatOrdinal(generation)} TAVY\nOFFLINE INTERVIEW`,
        REJECTED: `${formatOrdinal(generation)} TAVE\nAPPLICATION RESULT`,
        NO_STATUS: '',
    };

    return (
        <FlexBox direction="col">
            <div
                className="pt-28 pb-14 md:pt-36 md:pb-22"
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
                <FlexBox className="md:py-22 py-12 md:w-[562px] w-[312px] mx-auto" direction="col">
                    {outcomeMap[applicationStatus]}
                </FlexBox>
            </section>
        </FlexBox>
    );
};

export default Outcome;
