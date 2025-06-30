import { FormattedField, RecruitField } from '@/modules/recruitType';

const formattedToRecruitMap: Record<FormattedField | string, RecruitField | string> = {
    DESIGN: '디자인',
    WEBFRONTEND: '웹 프론트엔드',
    APPFRONTEND: '앱 프론트엔드',
    BACKEND: '백엔드',
    DATAANALYSIS: '데이터분석',
    DEEPLEARNING: '딥러닝',
    '' : '선택'
};

const recruitToFormattedMap: Record<RecruitField | string, FormattedField | string> = {
    디자인: 'DESIGN',
    '웹 프론트엔드': 'WEBFRONTEND',
    '앱 프론트엔드': 'APPFRONTEND',
    백엔드: 'BACKEND',
    데이터분석: 'DATAANALYSIS',
    딥러닝: 'DEEPLEARNING',
    '' : '선택'
};

const formattedToRecruitField = (field: FormattedField | string) => {
    return formattedToRecruitMap[field];
};

const recruitToFormattedField = (field: RecruitField | string) => {
    return recruitToFormattedMap[field];
};

export { formattedToRecruitField, recruitToFormattedField };
