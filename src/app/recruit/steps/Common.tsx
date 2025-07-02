'use client';

import { useEffect, useState } from 'react';
import Disclosure from '@/components/layout/Disclosure';
import TextArea from '@/components/Input/TextArea';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import Uploader from '@/components/upload/Uploader';
import TimePicker from '@/components/TimePicker/TimePicker';
import { useRecruitStore } from '@/store/recruitStore';
import formatTimeSlot, { formatToSelectedTimes } from '@/utils/formatTimeSlot';
import FlexBox from '@/components/layout/FlexBox';
import { useRecruit } from '@/hooks/useRecruit';
import { useMemberStore } from '@/store/memberStore';
import { ResumeAnswerRequest } from '@/modules/recruitType';

const uploadOptions = ['Github', 'Tech Blog', 'Portfolio'];
type uploadType = 'text' | 'file';

const Common = () => {
    const { setResumeState } = useMemberStore();
    const { setCurrentStep, setIsClickedFourth } = useRecruitStore();
    const { resumeId } = useMemberStore();
    const {
        getApplicationQuestion,
        getTempApplication,
        postTempApplication,
        postResume,
        getTime,
        getEmail,
        postSocialLinks,
        postURL,
    } = useRecruit();

    const [questions, setQuestions] = useState<{ [id: number]: string }>({});
    const [questionList, setQuestionList] = useState<any[]>([]);

    // 업로더 상태 - 옵션별 값 저장
    const [uploadValues, setUploadValues] = useState<{ [key: string]: string | File }>({
        Github: '',
        'Tech Blog': '',
        Portfolio: '',
    });

    // 선택된 옵션
    const [selectedOption, setSelectedOption] = useState(uploadOptions[0]);

    // 업로드 타입 (선택 옵션에 따라 결정)
    const [uploadType, setUploadType] = useState<uploadType>(uploadOptions[0] === 'Portfolio' ? 'file' : 'text');

    // 면접시간 선택 상태
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [scheduleData, setScheduleData] = useState<{ date: string; timeSlots: { time: string }[] }[]>([]);

    const [isNextEnabled, setIsNextEnabled] = useState(false);

    useEffect(() => {
        const requiredQuestionsFilled = questionList
            .filter((q) => q.isRequired)
            .every((q) => {
                const val = questions[q.id];
                return val !== undefined && val.trim() !== '';
            });

        const hasSelectedTime = selectedTimes.length > 0;

        setIsNextEnabled(requiredQuestionsFilled && hasSelectedTime);
        console.log(buildTimeSlots(selectedTimes));
    }, [questions, questionList, selectedTimes]);

    const buildTimeSlots = (selectedTimes: string[]): { time: string }[] => {
        return selectedTimes.map((datetimeStr) => {
            const [datePart, timePart] = datetimeStr.split('T'); // "07/03 (목)", "14:45"
            const cleanDate = datePart.trim().split(' ')[0]; // "07/03"
            const [month, day] = cleanDate.split('/').map(Number);
            const [hour, minute] = timePart.split(':').map(Number);

            const date = new Date(2025, month - 1, day, hour, minute); // 2025 고정
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const dd = String(date.getDate()).padStart(2, '0');
            const hh = String(date.getHours()).padStart(2, '0');
            const mi = String(date.getMinutes()).padStart(2, '0');

            return { time: `${yyyy}-${mm}-${dd}T${hh}:${mi}` };
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const times = await getTime();
            const questions = await getApplicationQuestion(resumeId, 2);

            const initialAnswers: { [id: number]: string } = {};
            questions.forEach((q: any) => {
                initialAnswers[q.id] = '';
            });
            setQuestionList(questions);
            setQuestions(initialAnswers);

            if (times && Array.isArray(times) && times.length > 0) {
                const formatted = formatTimeSlot(times);

                setScheduleData(formatted);
            }

            const temp = await getTempApplication(resumeId);

            if (temp?.page3) {
                // 질문 답변 채우기
                const filled = { ...initialAnswers };
                temp.page3.answers.forEach((item: any) => {
                    filled[item.resumeQuestionId] = item.answer ?? '';
                });
                setQuestions(filled);

                // 여기 확인
                if (temp.page3.uploadValues && typeof temp.page3.uploadValues === 'object') {
                    setUploadValues(temp.page3.uploadValues);
                } else if (temp.page3.uploadValue) {
                    // 이전 버전 호환용 (단일 값)
                    setUploadValues((prev) => ({
                        ...prev,
                        [uploadOptions[0]]: temp.page3.uploadValue,
                    }));
                }

                // 면접 시간 처리
                if (temp?.page3?.timeSlots && Array.isArray(temp.page3.timeSlots)) {
                    if (typeof temp.page3.timeSlots[0] === 'string') {
                        setSelectedTimes(temp.page3.timeSlots);
                    } else if (temp.page3.timeSlots[0]?.time) {
                        setSelectedTimes(formatToSelectedTimes(temp.page3.timeSlots));
                    }
                }
            }
        };

        fetchData();
    }, [resumeId]);

    // 날짜+시간 문자열 생성 후 토글 처리
    const toggleTimeSelection = (date: string, time: string) => {
        const dateTime = `${date}T${time}`;
        setSelectedTimes((prev) =>
            prev.includes(dateTime) ? prev.filter((t) => t !== dateTime) : [...prev, dateTime]
        );
    };

    const handleAnswerChange = (id: number, value: string) => {
        setQuestions((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    // 확인
    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
        setUploadType(option === 'Portfolio' ? 'file' : 'text');
    };

    // 확인
    const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (uploadType === 'file') {
            const file = e.target.files?.[0];
            setUploadValues((prev) => ({
                ...prev,
                [selectedOption]: file ?? '',
            }));
        } else {
            setUploadValues((prev) => ({
                ...prev,
                [selectedOption]: e.target.value,
            }));
        }
    };

    const buildRequestBody = (): ResumeAnswerRequest & {
        timeSlots: { time: string }[];
        languageLevels: any[];
    } => ({
        answers: Object.entries(questions).map(([id, answer]) => ({
            resumeQuestionId: Number(id),
            answer,
        })),
        languageLevels: [],
        timeSlots: buildTimeSlots(selectedTimes), // ← 여기!
    });

    const handleTempSave = async () => {
        await postTempApplication(resumeId, 3, buildRequestBody());
    };

    const handlePostOnly = async (step: number) => {
        const isAllAnswersEmpty = Object.values(questions).every((val) => val.trim() === '');
        const hasNoSelectedTime = selectedTimes.length === 0;

        // 질문도 없고 시간도 선택 안 했으면 저장 없이 넘어감
        if (isAllAnswersEmpty && hasNoSelectedTime) {
            setCurrentStep(step);
            return;
        }

        console.log(buildTimeSlots(selectedTimes));

        await postTempApplication(resumeId, 3, buildRequestBody());
        setCurrentStep(step);
    };

    const handleSubmit = async () => {
        try {
            await postResume(resumeId, buildRequestBody(), 3);
            await getEmail(resumeId);

            setIsClickedFourth(false);
            setResumeState('SUBMITTED');
            setCurrentStep(4);
        } catch (e) {
            console.error('제출 또는 이메일 전송 실패:', e);
        }
    };

    const canTempSave = Object.values(questions).some((val) => val.trim() !== '') || selectedTimes.length > 0;

    return (
        <FlexBox direction="col" className="gap-5 relative">
            <button
                onClick={handleTempSave}
                disabled={!canTempSave}
                className="hidden md:block absolute right-15 rounded-lg border border-[#E5E7EB] bg-white text-[#394150] p-3"
            >
                임시 저장
            </button>
            <h1 className="font-bold text-2xl text-[#394150] text-center">공통 질문</h1>

            {questionList.map((q) => (
                <Disclosure
                    key={q.id}
                    title={q.question}
                    isRequired={q.isRequired}
                    description={`(${q.textLength}자 이내)`}
                >
                    <TextArea
                        value={questions[q.id] ?? ''}
                        setValue={(val) => handleAnswerChange(q.id, val)}
                        placeholder="지원자님의 경험을 공유해주세요"
                        maxLength={q.textLength}
                    />
                </Disclosure>
            ))}

            <Disclosure title={'아래의 목록 중 소유하고 있으신 것이 있다면 자유롭게 첨부해주세요 :)'} isRequired>
                <Uploader
                    options={uploadOptions}
                    selectedOption={selectedOption}
                    setSelectedOption={handleOptionChange}
                    setUploadType={setUploadType}
                    uploadValues={uploadValues}
                    onSaveUpload={async (option) => {
                        const val = uploadValues[option];
                        if (!val) return;

                        try {
                            if (option === 'Portfolio' && val instanceof File) {
                                await postURL(resumeId, val);
                            } else if (typeof val === 'string') {
                                const githubUrl = option === 'Github' ? val : '';
                                const blogUrl = option === 'Tech Blog' ? val : '';
                                await postSocialLinks(resumeId, githubUrl, blogUrl);
                            } else {
                            }
                        } catch (e) {
                            console.error(e);
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

            <Disclosure title="가능한 오프라인 면접 시간을 모두 체크해주세요" isRequired>
                <TimePicker>
                    {scheduleData.map((schedule) => (
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

            <FlexBox className="justify-between mt-8 mb-0 gap-2">
                <ButtonNavigate text="이전" onClick={() => handlePostOnly(2)} />
                <ButtonNavigate text="제출하기" onClick={handleSubmit} />
            </FlexBox>
        </FlexBox>
    );
};

export default Common;
