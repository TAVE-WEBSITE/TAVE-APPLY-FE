'use client';

import Disclosure from '@/components/layout/Disclosure';
import TextArea from '@/components/Input/TextArea';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import Uploader from '@/components/upload/Uploader';
import TimePicker from '@/components/TimePicker/TimePicker';
import ToastMessage from '@/components/ToastMessage';
import FlexBox from '@/components/layout/FlexBox';
import { formatTimeSlot, formatSelectedTimes, buildTimeSlot } from '@/utils/formatTimeSlot';
import useRecruit from '@/hooks/useRecruit';
import { useEffect, useRef, useState } from 'react';
import { useMemberStore } from '@/store/memberStore';
import { useRecruitStore } from '@/store/recruitStore';
import { Answer, QuestionResponse, ResumeData, Schedule } from '@/modules/recruitType';

const Common = () => {
    const { setResumeState, username } = useMemberStore();
    const { setCurrentStep, setIsClickedFourth } = useRecruitStore();
    const { resumeId } = useMemberStore();
    const {
        applyApplicationQuestion,
        applyTempApplication,
        postTempApplication,
        postResume,
        applySchedule,
        applyCompleteEmail,
        postSocialLinks,
        postPortfolio,
        applyUrl,
    } = useRecruit();

    type UploadType = 'text' | 'file';
    const uploadOptions = ['Github', 'TechBlog', 'Portfolio'];

    const [selectedOption, setSelectedOption] = useState(uploadOptions[0]);
    const uploadType: UploadType = selectedOption === 'Portfolio' ? 'file' : 'text';

    const [uploadValues, setUploadValues] = useState<Record<string, string | File>>({
        Github: '',
        TechBlog: '',
        Portfolio: '',
    });

    const [answers, setAnswers] = useState<{ [id: number]: string }>({});
    const [questionList, setQuestionList] = useState<QuestionResponse[]>([]);
    const [highlightQuestions, setHighlightQuestions] = useState<{ [id: number]: boolean }>({});
    const [schedule, setSchedule] = useState<Schedule[]>([]);
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [toast, setToast] = useState({ message: '', isError: false });
    const [isToastOpen, setIsToastOpen] = useState(false);
    const [highlightTimeSlot, setHighlightTimeSlot] = useState(false);

    const timeSlotRef = useRef<HTMLDivElement>(null);
    const questionRefs = useRef<{ [id: number]: HTMLDivElement | null }>({});

    const uploadTitle = `아래의 목록 중 ${username}께서 소유하고 있으신 것이 있다면 자유롭게 첨부해주세요 :)`;

    useEffect(() => {
        if (!resumeId) return;

        const fetchData = async () => {
            const questionData = await applyApplicationQuestion(resumeId, 2);
            const timeData = await applySchedule();
            const urlData = await applyUrl(resumeId);

            setQuestionList(questionData);

            const initialAnswers = questionData.reduce((acc: { [id: number]: string }, q: QuestionResponse) => {
                acc[q.id] = '';
                return acc;
            }, {});

            setAnswers(initialAnswers);

            const formattedTime = formatTimeSlot(timeData);

            setSchedule(formattedTime);

            const tempData = await applyTempApplication(resumeId);

            const filledAnswers = { ...initialAnswers };
            tempData.page3.answers.forEach((item: Answer) => {
                filledAnswers[item.resumeQuestionId] = item.answer ?? '';
            });

            setAnswers(filledAnswers);

            setUploadValues((prev) => ({
                ...prev,
                ...{ Github: urlData.githubUrl },
                ...{ TechBlog: urlData.blogUrl },
                ...{ Portfolio: urlData.portfolioUrl },
            }));

            if (tempData.page3.timeSlots) {
                setSelectedTimes(formatSelectedTimes(tempData.page3.timeSlots));
            }
        };

        fetchData();
    }, [resumeId]);

    const toggleTimeSelection = (date: string, time: string) => {
        const dateTime = `${date}T${time}`;
        setSelectedTimes((prev) =>
            prev.includes(dateTime) ? prev.filter((t) => t !== dateTime) : [...prev, dateTime]
        );
    };

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    const handleAnswerChange = (id: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = uploadType === 'file' ? e.target.files?.[0] ?? '' : e.target.value;
        setUploadValues((prev) => ({
            ...prev,
            [selectedOption]: value,
        }));
    };

    const buildPostBody = (): ResumeData => ({
        answers: Object.entries(answers).map(([id, answer]) => ({
            resumeQuestionId: Number(id),
            answer,
        })),
        languageLevels: [],
        timeSlots: buildTimeSlot(selectedTimes),
    });

    const handleTempSave = async () => {
        console.log(uploadValues['Portfolio']);
        const res = await postTempApplication(resumeId, 3, buildPostBody());
        if (res === 200) {
            setToast({ message: '임시저장이 완료되었습니다.', isError: false });
        } else {
            setToast({ message: '임시저장에 실패하였습니다.', isError: true });
        }
        setIsToastOpen(true);
    };

    const canTempSave = () => {
        const hasAnyAnswer = Object.values(answers).some((val) => val.trim() !== '');
        const hasAnySelectedTime = selectedTimes.length > 0;
        return hasAnyAnswer || hasAnySelectedTime;
    };

    const handleBeforeTemp = async () => {
        if (!canTempSave()) {
            setCurrentStep(2);
            return;
        }

        const res = await postTempApplication(resumeId, 3, buildPostBody());
        if (res === 200) {
            setCurrentStep(2);
        }
    };

    const handlePostAndTemp = async () => {
        if (selectedTimes.length === 0) {
            timeSlotRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setHighlightTimeSlot(true);
            setTimeout(() => setHighlightTimeSlot(false), 3000);
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

        const tempRes = await postResume(resumeId, buildPostBody(), 3);
        const emailRes = await applyCompleteEmail(resumeId);
        if (tempRes === 200 && emailRes === 200) {
            setIsClickedFourth(false);
            setResumeState('SUBMITTED');
            setCurrentStep(4);
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
                <p className="font-bold md:text-2xl text-xl text-gray-700 text-center md:mb-3">공통 질문</p>
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
                <Disclosure title={uploadTitle}>
                    <Uploader
                        options={uploadOptions}
                        selectedOption={selectedOption}
                        setSelectedOption={handleOptionChange}
                        uploadValues={uploadValues}
                        uploadType={uploadType}
                        onSaveUpload={async (option) => {
                            const val = uploadValues[option];
                            if (!val) return 'error'; // 값 없으면 실패로 처리

                            try {
                                if (option === 'Portfolio' && val instanceof File) {
                                    const res = await postPortfolio(resumeId, val);
                                    return res === 200 ? 200 : 'error';
                                } else {
                                    const githubUrl =
                                        option === 'Github' ? (val as string) : (uploadValues['Github'] as string);
                                    const blogUrl =
                                        option === 'TechBlog' ? (val as string) : (uploadValues['TechBlog'] as string);
                                    const res = await postSocialLinks(resumeId, blogUrl, githubUrl);
                                    return res === 200 ? 200 : 'error';
                                }
                            } catch (e) {
                                console.error(e);
                                return 'error';
                            }
                        }}
                    >
                        <Uploader.UploadField
                            key={selectedOption}
                            type={uploadType}
                            value={uploadValues[selectedOption] ?? ''}
                            onChange={handleUploadChange}
                            setValue={(val) => setUploadValues((prev) => ({ ...prev, [selectedOption]: val }))}
                        />
                    </Uploader>
                </Disclosure>
                <Disclosure
                    ref={timeSlotRef}
                    highlight={highlightTimeSlot}
                    title="가능한 오프라인 면접 시간을 모두 체크해주세요"
                    isRequired
                >
                    <TimePicker>
                        {schedule.map((schedule) => (
                            <TimePicker.DateRow key={schedule.date} date={schedule.date}>
                                {schedule.timeSlots.map((timeSlot) => {
                                    const dateTime = `${schedule.date}T${timeSlot.time}`;
                                    return (
                                        <TimePicker.TimeSlotButton
                                            key={timeSlot.time}
                                            time={timeSlot.time}
                                            isSelected={selectedTimes.includes(dateTime)}
                                            onClick={() => toggleTimeSelection(schedule.date, timeSlot.time)}
                                        />
                                    );
                                })}
                            </TimePicker.DateRow>
                        ))}
                    </TimePicker>
                </Disclosure>
                <FlexBox direction="col" className="gap-3">
                    <FlexBox className="justify-between mt-4 gap-2">
                        <ButtonNavigate text="이전" onClick={handleBeforeTemp} />
                        <ButtonNavigate text="제출하기" onClick={handlePostAndTemp} />
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

export default Common;
