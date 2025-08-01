'use client';

import FlexBox from '@/components/layout/FlexBox';
import Disclosure from '@/components/layout/Disclosure';
import StepCounter from '@/components/StepCounter';
import { useEffect, useState, useRef } from 'react';
import useResult from '@/hooks/useResult';
import Link from 'next/link';
import { useMemberStore } from '@/store/memberStore';
import { QuestionResponse, Schedule } from '@/modules/recruitType';
import { formatTimeSlot } from '@/utils/formatTimeSlot';
import TimePicker from '@/components/TimePicker/TimePicker';

interface LanguageLevel {
    language: string;
    level: number;
}

const Submit = () => {
    const { resumeId } = useMemberStore();
    const { applyResumeHistory } = useResult();
    const [selectedTab, setSelectedTab] = useState<'common' | 'field'>('field');
    const [commonAnswer, setCommonAnswer] = useState<QuestionResponse[]>([]);
    const [fieldAnswer, setFieldAnswer] = useState<QuestionResponse[]>([]);
    const [languageLevels, setLanguageLevels] = useState<LanguageLevel[]>([]);

    const programmingRef = useRef<HTMLDivElement>(null);
    const [highlightProgramming, setHighlightProgramming] = useState(false);

    const programmingLevel = ['입문', '초급', '중급', '상급', '전문가'];
    const visibleCount = languageLevels.length; // 혹은 원하는 고정값 지정 가능

    const [schedule, setSchedule] = useState<Schedule[]>([]);
    const [links, setLinks] = useState({
        github: '',
        blog: '',
        portfolio: '',
    });

    useEffect(() => {
        const fetchResume = async () => {
            const resumeData = await applyResumeHistory(resumeId);
            setCommonAnswer(resumeData.common.commonQuestions);
            setFieldAnswer(resumeData.specific.specificQuestions);
            setLanguageLevels(resumeData.specific.languageLevels || []);
            setSchedule(formatTimeSlot(resumeData.common.timeSlots) || []);
            setLinks({
                github: resumeData.common.githubUrl || '',
                blog: resumeData.common.blogUrl || '',
                portfolio: resumeData.common.portfolioUrl || '',
            });
        };

        fetchResume();
    }, [resumeId]);

    return (
        <>
            <FlexBox className="justify-center md:text-xl mb-4.5 md:mb-6">
                <button
                    onClick={() => setSelectedTab('field')}
                    className={`transition-all px-3 md:px-4.5 cursor-pointer ${
                        selectedTab === 'field' ? 'text-[#394150] scale-105 font-bold' : 'text-[#868B94]'
                    }`}
                >
                    분야 질문
                </button>
                <button
                    onClick={() => setSelectedTab('common')}
                    className={`transition-all px-3 md:px-4.5 cursor-pointer ${
                        selectedTab === 'common' ? 'text-[#394150] scale-105 font-bold' : 'text-[#868B94]'
                    }`}
                >
                    공통 질문
                </button>
            </FlexBox>

            {selectedTab === 'field' && (
                <>
                    <Disclosure
                        ref={programmingRef}
                        title="프로그래밍 실력을 선택해주세요"
                        highlight={highlightProgramming}
                    >
                        <FlexBox direction="col" className="gap-4">
                            {languageLevels.slice(0, visibleCount).map((item, idx) => (
                                <StepCounter
                                    key={idx}
                                    title={item.language}
                                    currentStep={item.level}
                                    maxStep={5}
                                    stepLabels={programmingLevel}
                                    setCurrentStep={() => {}}
                                />
                            ))}
                        </FlexBox>
                    </Disclosure>

                    {fieldAnswer.map((item, index) => (
                        <Disclosure key={index} title={item.question} defaultOpen={index === 0}>
                            <FlexBox className="gap-1 font-medium text-[#394150]/60 leading-snug text-sm md:text-base">
                                <p className="break-words whitespace-normal">{item.answer}</p>
                            </FlexBox>
                        </Disclosure>
                    ))}
                </>
            )}

            {selectedTab === 'common' && (
                <>
                    {commonAnswer.map((item, index) => (
                        <Disclosure key={index} title={item.question} defaultOpen={index === 0}>
                            <FlexBox className="gap-1 font-medium text-[#394150]/60 leading-snug text-sm md:text-base">
                                <p className="break-keep">{item.answer}</p>
                            </FlexBox>
                        </Disclosure>
                    ))}
                    <Disclosure title="아래의 목록 중 홍길동님께서 소유하고 있으신 것이 있다면 자유롭게 첨부해주세요 :)">
                        <FlexBox className="gap-2 text-sm md:text-base text-[#394150]/60 font-medium justify-between">
                            <Link
                                href={links.github}
                                className="px-3 py-2 border bg-white border-[#E5E7EB] text-[#B0B3B9] rounded-[10px] font-medium
                                hover:text-[#376DFF] hover:bg-[#E9EFFF] hover:border-[#C8D7FF]"
                                target="_blank"
                            >
                                Github
                            </Link>
                            <Link
                                href={links.blog}
                                className="px-3 py-2 border bg-white border-[#E5E7EB] text-[#B0B3B9] rounded-[10px] font-medium
                                hover:text-[#376DFF] hover:bg-[#E9EFFF] hover:border-[#C8D7FF]"
                                target="_blank"
                            >
                                Tech Blog
                            </Link>
                            <Link
                                href={links.portfolio}
                                className="px-3 py-2 border bg-white border-[#E5E7EB] text-[#B0B3B9] rounded-[10px] font-medium
                                hover:text-[#376DFF] hover:bg-[#E9EFFF] hover:border-[#C8D7FF]"
                                target="_blank"
                            >
                                Portfolio
                            </Link>
                        </FlexBox>
                    </Disclosure>

                    <Disclosure title="가능한 오프라인 면접 시간을 모두 체크해주세요">
                        <FlexBox direction="col" className="gap-5 justify-">
                            {schedule.map((schedule, index) => (
                                <FlexBox key={index} className="text-gray-700 items-center justify-between">
                                    {schedule.date}
                                    <FlexBox className="gap-4">
                                        {schedule.timeSlots.map((timeSlot) => {
                                            return (
                                                <div
                                                    className="px-2 py-2 border rounded-[10px] font-medium text-[#376DFF] bg-[#E9EFFF] border-[#C8D7FF]"
                                                    key={timeSlot.time}
                                                >
                                                    {timeSlot.time}
                                                </div>
                                            );
                                        })}
                                    </FlexBox>
                                </FlexBox>
                            ))}
                        </FlexBox>
                    </Disclosure>
                </>
            )}
        </>
    );
};

export default Submit;
