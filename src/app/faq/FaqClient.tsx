'use client';

import Disclosure from '@/components/Disclosure';

// 예시 데이터
const faqList = [
    {
        question: 'Q. 서류 마감일은 언제입니까?',
        answer: 'A. 서류 마감일은 2025년 5월 15일(수) 자정까지입니다.',
        defaultOpen: true,
    },
    {
        question: 'Q. 지원 자격에 제한이 있나요?',
        answer: 'A. 만 19세 이상 누구나 지원 가능합니다. 전공, 경력 무관!',
    },
    {
        question: 'Q. 팀으로 지원해도 되나요?',
        answer: 'A. 아니요, 본 프로그램은 개인 단위 지원만 가능합니다.',
    },
    {
        question: 'Q. 오프라인 참여가 필수인가요?',
        answer: 'A. 주요 일정은 온라인으로 진행되며, 일부 네트워킹은 오프라인으로 예정되어 있습니다.',
    },
];

const FaqClient = () => {
    return (
        <>
            {faqList.map((item, index) => (
                <Disclosure key={index} title={item.question} defaultOpen={item.defaultOpen || false}>
                    <p className="font-medium text-[#394150]/60 leading-snug text-sm md:text-base">{item.answer}</p>
                </Disclosure>
            ))}
        </>
    );
};

export default FaqClient;
