import { FormattedField, RecruitField } from '@/modules/recruitType';

const formattedToRecruitMap: Record<FormattedField, RecruitField> = {
    DESIGN: '디자인',
    WEBFRONTEND: '웹 프론트엔드',
    APPFRONTEND: '앱 프론트엔드',
    BACKEND: '백엔드',
    DATAANALYSIS: '데이터분석',
    DEEPLEARNING: '딥러닝',
};

const recruitToFormattedMap: Record<RecruitField, FormattedField> = {
    디자인: 'DESIGN',
    '웹 프론트엔드': 'WEBFRONTEND',
    '앱 프론트엔드': 'APPFRONTEND',
    백엔드: 'BACKEND',
    데이터분석: 'DATAANALYSIS',
    딥러닝: 'DEEPLEARNING',
};

const formattedToRecruitField = (field: FormattedField) => {
    return formattedToRecruitMap[field];
};

const recruitToFormattedField = (field: RecruitField) => {
    return recruitToFormattedMap[field];
};

export { formattedToRecruitField, recruitToFormattedField };
