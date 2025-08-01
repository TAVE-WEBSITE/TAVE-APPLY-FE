'use client';

import ButtonNavigate from '@/components/Button/ButtonNavigate';
import Disclosure from '@/components/layout/Disclosure';
import TextArea from '@/components/Input/TextArea';
import FlexBox from '@/components/layout/FlexBox';
import StepCounter from '@/components/StepCounter';
import ToastMessage from '@/components/ToastMessage';
import useRecruit from '@/hooks/useRecruit';
import { useEffect, useState, useRef } from 'react';
import { useRecruitStore } from '@/store/recruitStore';
import { useMemberStore } from '@/store/memberStore';
import { ResumeData, QuestionResponse, LanguageLevel, Answer } from '@/modules/recruitType';
import { recruitToFormattedField } from '@/utils/formatField';

const Field = () => {
    const { setCurrentStep, applyField } = useRecruitStore();
    const { resumeId, username } = useMemberStore();
    const { applyApplicationQuestion, applyTempApplication, postTempApplication, postResume, applyProgrammingLevel } =
        useRecruit();
    const [answers, setAnswers] = useState<{ [id: number]: string }>({});
    const [highlightQuestions, setHighlightQuestions] = useState<{ [id: number]: boolean }>({});
    const [questionList, setQuestionList] = useState<QuestionResponse[]>([]);
    const [languageLevels, setLanguageLevels] = useState<LanguageLevel[]>([]);
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [highlightProgramming, setHighlightProgramming] = useState(false);
    const [toast, setToast] = useState({ message: '', isError: false });
    const [visibleCount, setVisibleCount] = useState(1);

    const programmingLevel = ['입문', '초급', '중급', '상급', '전문가'];

    const programmingTitle = `${username}님의 프로그래밍 실력은 어느 정도 인가요?`;

    const programmingRef = useRef<HTMLDivElement>(null);
    const questionRefs = useRef<{ [id: number]: HTMLDivElement | null }>({});

    useEffect(() => {
        if (!resumeId || applyField === '') return;

        const fetchData = async () => {
            const questionData = await applyApplicationQuestion(resumeId, 1);
            const languageData = await applyProgrammingLevel(recruitToFormattedField(applyField));

            setQuestionList(questionData);

            const initialLanguageLevels: LanguageLevel[] = languageData.map((item: { language: string }) => ({
                language: item.language,
                level: 0,
            }));

            setLanguageLevels(initialLanguageLevels);

            const initialAnswers = questionData.reduce((acc: { [id: number]: string }, q: QuestionResponse) => {
                acc[q.id] = '';
                return acc;
            }, {});

            setAnswers(initialAnswers);

            const tempData = await applyTempApplication(resumeId);

            const filledAnswers = { ...initialAnswers };
            tempData.page2.answers.forEach((item: Answer) => {
                filledAnswers[item.resumeQuestionId] = item.answer ?? '';
            });

            setAnswers(filledAnswers);

            if (tempData.page2.languageLevels.length > 0) {
                const loadedLevels = initialLanguageLevels.map((item: LanguageLevel) => {
                    const found = tempData.page2.languageLevels.find(
                        (languageLevel: LanguageLevel) => languageLevel.language === item.language
                    );
                    return {
                        language: item.language,
                        level: found ? found.level : 0,
                    };
                });
                setLanguageLevels(loadedLevels);

                const firstZeroIndex = loadedLevels.findIndex((l: LanguageLevel) => l.level === 0);
                setVisibleCount(firstZeroIndex === -1 ? loadedLevels.length : firstZeroIndex + 1);
            }
        };

        fetchData();
    }, [resumeId, applyField]);

    const handleAnswerChange = (id: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleLevelChange = (index: number, level: number) => {
        const newLanguageLevels = [...languageLevels];
        newLanguageLevels[index] = {
            ...newLanguageLevels[index],
            level,
        };
        setLanguageLevels(newLanguageLevels);

        if (
            level > 0 &&
            visibleCount === index + 1 &&
            visibleCount < newLanguageLevels.length &&
            newLanguageLevels[index + 1].level === 0
        ) {
            setVisibleCount(visibleCount + 1);
        }
    };

    const buildPostBody = (): ResumeData => ({
        answers: Object.entries(answers).map(([id, answer]) => ({
            resumeQuestionId: Number(id),
            answer,
        })),
        languageLevels,
        timeSlots: [],
    });

    const handleTempSave = async () => {
        const res = await postTempApplication(resumeId, 2, buildPostBody());
        if (res === 200) {
            setToast({ message: '임시저장이 완료되었습니다.', isError: false });
        } else {
            setToast({ message: '임시저장에 실패하였습니다.', isError: true });
        }
        setIsToastOpen(true);
    };

    const canTempSave = () => {
        const hasAnyAnswer = Object.values(answers).some((val) => val.trim() !== '');
        const hasAnyLevel = languageLevels.some((item) => item.level > 0);
        return hasAnyAnswer || hasAnyLevel;
    };

    const handleBeforeTemp = async () => {
        if (!canTempSave()) {
            setCurrentStep(1);
            return;
        }
        const res = await postTempApplication(resumeId, 2, buildPostBody());
        if (res === 200) {
            setCurrentStep(1);
        }
    };

    const handlePostAndTemp = async () => {
        const notFilledLevel = languageLevels.slice(0, visibleCount).some((item) => item.level === 0);

        if (notFilledLevel) {
            programmingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setHighlightProgramming(true);
            setTimeout(() => setHighlightProgramming(false), 3000);
            return;
        }

        const emptyRequiredQuestion = questionList.find(
            (q) => q.required && (!answers[q.id] || answers[q.id].trim() === '')
        );

        if (emptyRequiredQuestion) {
            const ref = questionRefs.current[emptyRequiredQuestion.id];
            ref?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setHighlightQuestions((prev) => ({ ...prev, [emptyRequiredQuestion.id]: true }));
            setTimeout(() => {
                setHighlightQuestions((prev) => ({ ...prev, [emptyRequiredQuestion.id]: false }));
            }, 3000);
            return;
        }
        const tempRes = await postTempApplication(resumeId, 2, buildPostBody());
        const resumeRes = await postResume(resumeId, buildPostBody(), 2);
        if (tempRes === 200 && resumeRes === 200) {
            setCurrentStep(3);
        }
    };

    return (
        <>
            <button
                onClick={handleTempSave}
                disabled={!canTempSave()}
                className="disabled:cursor-not-allowed cursor-pointer hidden md:block absolute
                right-15 top-60 rounded-lg border border-[#E5E7EB] bg-white text-[#394150]
                disabled:text-[#394150]/50 p-3"
            >
                임시 저장
            </button>
            <FlexBox direction="col" className="gap-5">
                <p className="font-bold md:text-2xl text-xl text-gray-700 text-center md:mb-3">{applyField} 분야</p>
                <Disclosure ref={programmingRef} title={programmingTitle} highlight={highlightProgramming} isRequired>
                    <FlexBox direction="col" className="gap-4">
                        {languageLevels.slice(0, visibleCount).map((item, idx) => (
                            <StepCounter
                                key={idx}
                                title={item.language}
                                currentStep={item.level}
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
                        ref={(el) => {
                            questionRefs.current[q.id] = el;
                        }}
                        title={q.question}
                        isRequired={q.required}
                        description={` (${q.textLength}자 이내)`}
                        highlight={highlightQuestions[q.id]}
                    >
                        <TextArea
                            value={answers[q.id] ?? ''}
                            setValue={(val) => handleAnswerChange(q.id, val)}
                            placeholder="내용을 입력해주세요"
                            maxLength={q.textLength}
                        />
                    </Disclosure>
                ))}
                <FlexBox direction="col" className="gap-3">
                    <FlexBox className="justify-between mt-4 gap-2">
                        <ButtonNavigate text="이전" onClick={handleBeforeTemp} />
                        <ButtonNavigate text="다음" onClick={handlePostAndTemp} />
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
            </FlexBox>
            {isToastOpen && (
                <ToastMessage
                    isOpen={isToastOpen}
                    isError={toast.isError}
                    setIsOpen={setIsToastOpen}
                    message={toast.message}
                />
            )}
        </>
    );
};

export default Field;
