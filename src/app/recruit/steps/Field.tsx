'use client';

import { useEffect, useState } from 'react';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import Disclosure from '@/components/layout/Disclosure';
import TextArea from '@/components/Input/TextArea';
import FlexBox from '@/components/layout/FlexBox';
import StepCounter from '@/components/StepCounter';
import { useRecruitStore } from '@/store/recruitStore';
import { useRecruit } from '@/hooks/useRecruit';
import { useMemberStore } from '@/store/memberStore';
import { ResumeAnswerRequest } from '@/modules/recruitType';
import { recruitToFormattedField } from '@/utils/formatField';

const programmingLevel = ['입문', '초급', '중급', '상급', '전문가'];

const Field = () => {
    const { setCurrentStep, applyField } = useRecruitStore();
    const { resumeId, username } = useMemberStore();
    const { getApplicationQuestion, getTempApplication, postTempApplication, postResume, applyProgrammingLevel } =
        useRecruit();

    const [questions, setQuestions] = useState<{ [id: number]: string }>({});
    const [questionList, setQuestionList] = useState<any[]>([]);
    const [languages, setLanguages] = useState<string[]>([]);
    const [levels, setLevels] = useState<number[]>([]);

    useEffect(() => {
        setLevels(Array(languages.length).fill(0));
    }, [languages]);

    const [visibleCount, setVisibleCount] = useState(1);

    // 다음 버튼 활성화 여부
    const [isNextEnabled, setIsNextEnabled] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const questio = await getApplicationQuestion(resumeId, 1);
            const programming = await applyProgrammingLevel(recruitToFormattedField(applyField));

            const langu = programming.map((item: { language: string }) => item.language);
            setLanguages(langu);

            if (!questio) return;

            const initialAnswers: { [id: number]: string } = {};
            questio.forEach((q: any) => {
                initialAnswers[q.id] = '';
            });

            setQuestionList(questio);
            setQuestions(initialAnswers);

            const temp = await getTempApplication(resumeId);
            if (temp?.page2) {
                const filled = { ...initialAnswers };
                temp.page2.answers.forEach((item: any) => {
                    filled[item.resumeQuestionId] = item.answer ?? '';
                });
                setQuestions(filled);

                // languageLevels가 array이고 object 배열이면 처리
                if (
                    temp.page2.languageLevels &&
                    Array.isArray(temp.page2.languageLevels) &&
                    temp.page2.languageLevels.length > 0
                ) {
                    const loadedLevels = programming.map((item: { language: string }) => {
                        const found = temp.page2.languageLevels.find((lvl: any) => lvl.language === item.language);
                        return found ? Number(found.level) : 0;
                    });
                    setLevels(loadedLevels);

                    const firstZeroIndex = loadedLevels.findIndex((l: number) => l === 0);
                    setVisibleCount(firstZeroIndex === -1 ? programming.length : firstZeroIndex + 1);
                }
            }
        };

        fetchData();
    }, [resumeId]);

    // 질문 답변 변경 시
    const handleAnswerChange = (id: number, value: string) => {
        setQuestions((prev) => {
            const newQ = { ...prev, [id]: value };
            checkCanNext(newQ, levels);
            return newQ;
        });
    };

    // 프로그래밍 레벨 변경 시
    const handleLevelChange = (index: number, level: number) => {
        const newLevels = [...levels];
        newLevels[index] = level;
        setLevels(newLevels);

        // 현재 visibleCount가 index + 1 (현재 레벨까지 보임)일 때만 다음 레벨 보이도록
        // 그리고 다음 레벨이 존재할 때만 visibleCount 올리기
        if (
            level > 0 &&
            visibleCount === index + 1 &&
            visibleCount < languages.length &&
            !newLevels[index + 1] // 다음 레벨이 아직 0일 때만 보이게 함 (중복 증가 방지)
        ) {
            setVisibleCount(visibleCount + 1);
        }

        checkCanNext(questions, newLevels);
    };

    // 다음 버튼 활성화 체크
    const checkCanNext = (currentQuestions: { [id: number]: string }, currentLevels: number[]) => {
        // 질문 모두 작성
        const allQuestionsFilled = questionList.every((q) => {
            if (!q.required) return true;
            const val = currentQuestions[q.id];
            return val !== undefined && val.trim() !== '';
        });

        // 보이는 레벨 모두 1 이상
        const allLevelsFilled = currentLevels.slice(0, visibleCount).every((level) => level > 0);

        setIsNextEnabled(allQuestionsFilled && allLevelsFilled);
    };

    // 초기 렌더링 또는 상태 변경 시 체크
    useEffect(() => {
        checkCanNext(questions, levels);
    }, [questions, levels, visibleCount, questionList]);

    // API 요청용 객체 생성
    const buildRequestBody = (): ResumeAnswerRequest => ({
        answers: Object.entries(questions).map(([id, answer]) => ({
            resumeQuestionId: Number(id),
            answer,
        })),
        languageLevels: languages.map((lang, idx) => ({
            language: lang,
            level: levels[idx].toString(), // number → string 변환
        })),
        timeSlots: [],
    });

    // 임시 저장
    const handleTempSave = async () => {
        await postTempApplication(resumeId, 2, buildRequestBody());
    };

    // 이전 단계 이동 (임시 저장 후)
    const handlePostOnly = async (step: number) => {
        const isAllAnswersEmpty = Object.values(questions).every((val) => val.trim() === '');
        const isAllLevelsEmpty = levels.every((level) => level === 0);

        // 아무 값도 입력되지 않았을 경우 → API 호출 없이 이전 스텝만 이동
        if (isAllAnswersEmpty && isAllLevelsEmpty) {
            setCurrentStep(step);
            return;
        }

        // 일부라도 입력되어 있으면 임시 저장 후 이전 스텝 이동
        await postTempApplication(resumeId, 2, buildRequestBody());
        setCurrentStep(step);
    };

    // 저장 후 다음 단계 이동
    const handleBothPostAndTemp = async () => {
        await postTempApplication(resumeId, 2, buildRequestBody());
        await postResume(resumeId, buildRequestBody(), 2);
        setCurrentStep(3);
    };

    const titledi = `${username}님의 프로그래밍 실력은 어느 정도 인가요?`;

    const canTempSave = () => {
        const hasAnyAnswer = Object.values(questions).some((val) => val.trim() !== '');
        const hasAnyLevel = levels.some((level) => level > 0);
        return hasAnyAnswer || hasAnyLevel;
    };

    return (
        <div className="w-full h-full">
            <button
                onClick={handleTempSave}
                disabled={!canTempSave()}
                className="hidden md:block absolute right-15 top-70 rounded-lg border border-[#E5E7EB] bg-white text-[#394150] p-3"
            >
                임시 저장
            </button>
            <FlexBox direction="col" className="gap-5 relative">
                <h1 className="font-bold text-2xl text-[#394150] text-center">{applyField} 분야</h1>

                <Disclosure title={titledi} isRequired>
                    <FlexBox direction="col" className="gap-4 pt-2">
                        {languages.slice(0, visibleCount).map((lang, idx) => (
                            <StepCounter
                                key={lang}
                                title={lang}
                                currentStep={levels[idx]}
                                setCurrentStep={(level) => handleLevelChange(idx, level)}
                                maxStep={5}
                                stepLabels={programmingLevel}
                            />
                        ))}
                    </FlexBox>
                </Disclosure>

                {questionList.map((q) => (
                    <Disclosure
                        key={q.id}
                        title={q.question}
                        isRequired={q.required}
                        description={` (${q.textLength}자 이내)`}
                    >
                        <TextArea
                            value={questions[q.id] ?? ''}
                            setValue={(val) => handleAnswerChange(q.id, val)}
                            placeholder="내용을 입력해주세요"
                            maxLength={q.textLength}
                        />
                    </Disclosure>
                ))}

                <FlexBox className="justify-between mt-8 mb-0 gap-2">
                    <ButtonNavigate text="이전" onClick={() => handlePostOnly(1)} />
                    <ButtonNavigate text="다음" onClick={handleBothPostAndTemp} isActive={isNextEnabled} />
                </FlexBox>

                <div className="md:hidden">
                    <ButtonNavigate
                        text="임시저장"
                        onClick={handleTempSave}
                        isActive={canTempSave()}
                        hasBackGround={false}
                    />
                </div>
            </FlexBox>
        </div>
    );
};

export default Field;
