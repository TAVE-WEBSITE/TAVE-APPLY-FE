interface TimeSlot {
    time: string;
}

interface Personal {
    school: string;
    major: string;
    minor: string;
    field: FormattedField;
    generation: string;
}

interface Schedule {
    date: string;
    timeSlots: TimeSlot[];
}

type RecruitField = '디자인' | '웹 프론트엔드' | '앱 프론트엔드' | '백엔드' | '데이터분석' | '딥러닝';

type FormattedField = 'DESIGN' | 'DEEPLEARNING' | 'DATAANALYSIS' | 'WEBFRONTEND' | 'APPFRONTEND' | 'BACKEND';

export type { RecruitField, Schedule, Personal, FormattedField };
