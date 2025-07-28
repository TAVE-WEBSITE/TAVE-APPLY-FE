interface PersonalData {
    school: string;
    major: string;
    minor: string;
    field: FormattedField;
    generation: string;
}
interface ResumeData {
    answers: Answer[] | null;
    languageLevels: LanguageLevel[] | null;
    timeSlots: TimeSlot[] | null;
}

interface LanguageLevel {
    language: string;
    level: string;
}

interface TimeSlot {
    time: string;
}

interface Answer {
    resumeQuestionId: number;
    answer: string;
}

interface Schedule {
    date: string;
    timeSlots: TimeSlot[];
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
    field: FormattedField;
}

type RecruitField = '디자인' | '웹 프론트엔드' | '앱 프론트엔드' | '백엔드' | '데이터분석' | '딥러닝';

type FormattedField = 'DESIGN' | 'DEEPLEARNING' | 'DATAANALYSIS' | 'WEBFRONTEND' | 'APPFRONTEND' | 'BACKEND';

export type { RecruitField, Schedule, PersonalData, FormattedField, ResumeData, PersonalResponse };
