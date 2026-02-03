'use client';

import Link from 'next/link';
import FlexBox from '@/components/layout/FlexBox';
import Graph from '@/components/layout/Graph';
import useResult from '@/hooks/useResult';
import formatOrdinal from '@/utils/formatOrdinal';
import { useHomeStore } from '@/store/homeStore';
import { useMemberStore } from '@/store/memberStore';
import { ApplicantData } from '@/modules/resultType';
import { useEffect, useState } from 'react';

const Mypage = () => {
    const { generation } = useHomeStore();
    const { resumeState, memberId, setApplicationStatus } = useMemberStore();
    const [history, setHistory] = useState<ApplicantData[]>([]);
    const [isDocument, setIsDocument] = useState<boolean>(false);
    const { applyApplicantHistory, applyIsDocument } = useResult();

    useEffect(() => {
        if (!memberId || !generation) return;

        const fetchData = async () => {
            const historyData = await applyApplicantHistory(memberId);
            const documentData = await applyIsDocument();
            const sortedData = historyData
                .filter((item: ApplicantData) => {
                    if (!documentData && item.applicationStatus === 'DRAFT') {
                        return false;
                    }
                    return true;
                })
                .sort((a: ApplicantData, b: ApplicantData) => Number(b.generation) - Number(a.generation));
            setHistory(sortedData);
            setIsDocument(documentData);

            const current = historyData.find(
                (item: ApplicantData) =>
                    item.generation === generation &&
                    ['DOCUMENT_PASSED', 'REJECTED', 'FINAL_ACCEPTED', 'FINAL_FAIL'].includes(item.applicationStatus)
            );

            if (current) {
                const status = current.applicationStatus === 'FINAL_FAIL' ? 'REJECTED' : current.applicationStatus;
                setApplicationStatus(status);
            }
        };

        fetchData();
    }, [memberId, generation]);

    return (
        <FlexBox direction="col" className="min-h-screen">
            <div
                className="flex flex-col items-center md:gap-5 gap-3.5 pt-24 pb-10 md:pt-28 md:pb-12"
                style={{
                    backgroundImage: 'url(/background/side-bg.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'top',
                }}
            >
                <h2 className="md:text-3xl text-2xl font-bold text-center whitespace-pre-line">
                    {`${formatOrdinal(generation)} TAVY\nRECRUITING`}
                </h2>
                {resumeState === 'TEMPORARY' && isDocument && (
                    <Link
                        href="/recruit"
                        className="bg-blue-600/85 px-3.5 py-2.5 rounded-xl font-semibold cursor-pointer md:text-base text-sm"
                    >
                        지원하러 가기
                    </Link>
                )}
            </div>
            <section className="bg-[#F9FAFB] flex-1">
                <FlexBox
                    direction="col"
                    className="pt-9 pb-18 md:pt-11 md:pb-20 md:w-[625px] sm:w-[430px] w-[308px] mx-auto gap-5.5 md:gap-7.5"
                >
                    <p className="font-bold md:text-2xl text-xl text-[#394150] text-center">지원 현황</p>
                    <Graph applicantData={history} generation={generation} />
                </FlexBox>
            </section>
        </FlexBox>
    );
};

export default Mypage;
