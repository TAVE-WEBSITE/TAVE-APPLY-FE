'use client';

import { useEffect, useState } from 'react';
import Disclosure from '@/components/layout/Disclosure';
import TextArea from '@/components/Input/TextArea';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import Uploader from '@/components/upload/Uploader';
import TimePicker from '@/components/TimePicker/TimePicker';
import { useRecruitStore } from '@/store/recruitStore';
import formatTimeSlot from '@/utils/formatTimeSlot';
import FlexBox from '@/components/layout/FlexBox';
import { useRecruit } from '@/hooks/useRecruit';
import { useMemberStore } from '@/store/memberStore';
import { ResumeAnswerRequest } from '@/modules/recruitType';

const uploadOptions = ['Github', 'Tech Blog', 'Portfolio'];
type uploadType = 'text' | 'file';

const Common = () => {
    const { setCurrentStep } = useRecruitStore();
    const { resumeId, username } = useMemberStore();
    const { getApplicationQuestion, getTempApplication, postTempApplication, postResume, getTime, getEmail } =
        useRecruit();

    const [questions, setQuestions] = useState<{ [id: number]: string }>({});
    const [questionList, setQuestionList] = useState<any[]>([]);

    // 업로더 상태
    const [selectedOption, setSelectedOption] = useState('');
    const [uploadType, setUploadType] = useState<uploadType>('text');
    const [uploadValue, setUploadValue] = useState<string | File>('');

    // 면접시간 선택 상태
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    // 상태 추가
    const [scheduleData, setScheduleData] = useState<{ date: string; timeSlots: { time: string }[] }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const times = await getTime(resumeId);
            console.log(times); // 이미 선언된 함수 호출
            const questions = await getApplicationQuestion(resumeId, 3);

            const initialAnswers: { [id: number]: string } = {};
            questions.forEach((q: any) => {
                initialAnswers[q.id] = '';
            });
            setQuestionList(questions);
            setQuestions(initialAnswers);

            if (times && Array.isArray(times)) {
                const formatted = formatTimeSlot(times); // ex) ['2025-11-20 13:00', ...] → 날짜별 그룹핑
                setScheduleData(formatted);
            }

            const temp = await getTempApplication(resumeId);

            if (temp?.page3) {
                const filled = { ...initialAnswers };
                temp.page3.answers.forEach((item: any) => {
                    filled[item.resumeQuestionId] = item.answer ?? '';
                });
                setQuestions(filled);
                if (temp.page3.uploadValue) setUploadValue(temp.page3.uploadValue);
                if (temp.page3.selectedTimes) setSelectedTimes(temp.page3.selectedTimes);
            }
        };

        fetchData();
    }, [resumeId]);

    const handleAnswerChange = (id: number, value: string) => {
        setQuestions((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const toggleTimeSelection = (time: string) => {
        setSelectedTimes((prev) => (prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]));
    };

    const buildRequestBody = (): ResumeAnswerRequest & { uploadValue?: string | File; selectedTimes?: string[] } => ({
        answers: Object.entries(questions).map(([id, answer]) => ({
            resumeQuestionId: Number(id),
            answer,
        })),
        languageLevels: null,
        timeSlots: selectedTimes.map((time) => ({ time })),
        uploadValue,
        selectedTimes,
    });

    const handleTempSave = async () => {
        await postTempApplication(resumeId, 3, buildRequestBody());
    };

    const handlePostOnly = async (step: number) => {
        await postTempApplication(resumeId, 3, buildRequestBody());
        setCurrentStep(step);
    };

    const handleSubmit = async () => {
        await postTempApplication(resumeId, 3, buildRequestBody());
        await postResume(resumeId, buildRequestBody(), 3);

        try {
            await getEmail(resumeId); // ⭐ 제출 후 이메일 불러오기
        } catch (e) {
            console.error('getEmail error:', e);
        }

        setCurrentStep(4); // 다음 페이지 이동
    };

    const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadValue(file);
        } else {
            setUploadValue(e.target.value);
        }
    };

    return (
        <FlexBox direction="col" className="gap-5">
            <h1 className="font-bold text-2xl text-[#394150] text-center">공통 질문</h1>

            {questionList.map((q) => (
                <Disclosure key={q.id} title={q.question} isRequired={true} description={`(${q.textLength}자 이내)`}>
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
                    setSelectedOption={setSelectedOption}
                    setUploadType={setUploadType}
                >
                    <Uploader.UploadField
                        key={selectedOption}
                        type={uploadType}
                        value={uploadValue}
                        setValue={setUploadValue}
                        onChange={handleUploadChange}
                    />
                </Uploader>
            </Disclosure>

            <Disclosure title="가능한 오프라인 면접 시간을 모두 체크해주세요" isRequired>
                <TimePicker>
                    {scheduleData.map((schedule) => (
                        <TimePicker.DateRow key={schedule.date} date={schedule.date}>
                            {schedule.timeSlots.map((timeSlot) => (
                                <TimePicker.TimeSlotButton
                                    key={timeSlot.time}
                                    time={timeSlot.time}
                                    isSelected={selectedTimes.includes(timeSlot.time)}
                                    onClick={() => toggleTimeSelection(timeSlot.time)}
                                />
                            ))}
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
