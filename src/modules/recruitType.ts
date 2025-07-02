interface Personal {
    school: string;
    major: string;
    minor: string;
    field: FormattedField | string | RecruitField;
    generation: string;
}

interface PersonalResponse {
    username: string;
    sex: 'MALE' | 'FEMALE';
    birthday: string;
    phoneNumber: string;
    email: string;
    school: string;
    major: string;
    minor: string;
    field: FormattedField | string;
}

////

interface TimeSlot {
    time: string;
}

interface Schedule {
    date: string;
    timeSlots: TimeSlot[];
}

interface Answer {
    resumeQuestionId: number;
    answer: string;
}

interface LanguageLevel {
    language: string;
    level: string;
}

interface ResumeAnswerRequest {
    answers: Answer[];
    languageLevels: LanguageLevel[] | null;
    timeSlots: TimeSlot[] | null;
}

type RecruitField = '선택' | '디자인' | '웹 프론트엔드' | '앱 프론트엔드' | '백엔드' | '데이터분석' | '딥러닝';

type FormattedField = 'DESIGN' | 'DEEPLEARNING' | 'DATAANALYSIS' | 'WEBFRONTEND' | 'APPFRONTEND' | 'BACKEND';

export type { RecruitField, Schedule, Personal, FormattedField, ResumeAnswerRequest, PersonalResponse };
