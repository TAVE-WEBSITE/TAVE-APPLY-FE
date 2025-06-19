'use client';

import { JSX, useState } from 'react';
import { Status } from '@/modules/outcomeType';
import FlexBox from '@/components/layout/FlexBox';
import FinalPassed from './FinalPassed';
import PaperPassed from './PaperPassed';

const outcomeMap: Partial<Record<Status, JSX.Element>> = {
    '최종 합격': <FinalPassed />,
    '서류 합격': <PaperPassed />,
    '불합격': <div />,
};

const titleMap: Partial<Record<Status, string>> = {
    '최종 합격': 'WELCOME TO 15TH TAVE',
    '서류 합격': '15TH TAVY\nOFFLINE INTERVIEW',
    '불합격': '',
};

const Outcome = () => {
    const [status, setStatus] = useState<Status>('서류 합격');

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
                <h2 className="md:text-3xl text-2xl font-bold text-center whitespace-pre-line">{titleMap[status]}</h2>
            </div>
            <section className="bg-[#F9FAFB] flex-1">
                <FlexBox className="md:py-22 py-12 md:w-[562px] w-[312px] mx-auto" direction="col">
                    {outcomeMap[status]}
                </FlexBox>
            </section>
        </FlexBox>
    );
};

export default Outcome;
