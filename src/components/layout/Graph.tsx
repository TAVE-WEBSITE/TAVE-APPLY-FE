import FlexBox from '@/components/layout/FlexBox';
import Icons from '@/components/Icons';
import Link from 'next/link';
import { Status, ApplicantData } from '@/modules/resultType';
import { formattedToRecruitField } from '@/utils/formatField';

interface GraphProps {
    generation: string;
    applicantData: ApplicantData[];
}

const Graph = ({ applicantData, generation }: GraphProps) => {
    const statusMeta: Record<Status, { text: string; color: string }> = {
        DOCUMENT_PASSED: { text: '서류 합격', color: 'text-emerald-600' },
        REJECTED: { text: '불합격', color: 'text-pink-600/80' },
        FINAL_ACCEPTED: { text: '최종 합격', color: 'text-emerald-600' },
        SUBMITTED: { text: '지원 완료', color: 'text-blue-600' },
        DRAFT: { text: '작성 중', color: 'text-black' },
    };

    const renderStatus = (item: ApplicantData) => {
        const isCurrentGen = generation === item.generation;

        if (item.applicationStatus === 'DRAFT') {
            return (
                <Link
                    href="/recruit"
                    className="text-neutral-500 md:text-[15px] text-[13px] font-bold py-2 px-3
                    bg-neutral-200 rounded-lg"
                >
                    수정하기
                </Link>
            );
        }

        if (['DOCUMENT_PASSED', 'REJECTED', 'FINAL_ACCEPTED'].includes(item.applicationStatus) && isCurrentGen) {
            return (
                <Link
                    href="/outcome"
                    className="md:text-[15px] text-[13px] font-bold py-2 px-3
                    bg-blue-600 rounded-lg"
                >
                    결과 확인
                </Link>
            );
        }

        if (item.applicationStatus === 'SUBMITTED') {
            return (
                <Link
                    href="/mypage/submit"
                    className="text-white md:text-[15px] text-[13px] font-bold py-2 px-3
                    bg-blue-600 rounded-lg"
                >
                    서류 확인
                </Link>
            );
        }

        return (
            <p className={`${statusMeta[item.applicationStatus].color}`}>{statusMeta[item.applicationStatus].text}</p>
        );
    };

    return (
        <FlexBox
            direction="col"
            className="bg-white rounded-[10px] md:rounded-[20px] border
            border-gray-200 pt-5 md:pt-6 px-4 md:px-7 text-sm md:text-base"
        >
            <div className="grid grid-cols-10 pb-4 text-zinc-400 font-medium md:px-2 px-1.5">
                <p className="col-span-2">기수</p>
                <p className="col-span-5">파트</p>
                <p className="col-span-3 text-right">지원 상태</p>
            </div>
            {applicantData.length > 0 ? (
                <>
                    {applicantData.map((item, index) => (
                        <div
                            key={index}
                            className={`grid grid-cols-10 border-t border-gray-100 py-4 font-semibold md:px-2 px-1.5
                              ${index === applicantData.length - 1 ? 'mb-1 md:mb-2' : ''} items-center`}
                        >
                            <p className="col-span-2 text-gray-700">{item.generation}</p>
                            <p className="col-span-5 text-gray-700">{formattedToRecruitField(item.fieldType)}</p>
                            <FlexBox className="col-span-3 justify-end">{renderStatus(item)}</FlexBox>
                        </div>
                    ))}
                </>
            ) : (
                <FlexBox direction="col" className="md:h-[300px] h-[220px] items-center justify-center gap-2">
                    <Icons name="x" width={20} height={20} />
                    <p className="text-zinc-400 font-medium">아직 지원하신 내용이 없습니다</p>
                </FlexBox>
            )}
        </FlexBox>
    );
};

export default Graph;
