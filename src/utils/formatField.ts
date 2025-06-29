import { FormattedField, RecruitField } from '@/modules/recruitType';

const formattedToRecruitMap: Record<FormattedField, RecruitField> = {
    DESIGN: '디자인',
    WEBFRONTEND: '웹 프론트엔드',
    APPFRONTEND: '앱 프론트엔드',
    BACKEND: '백엔드',
    DATAANALYSIS: '데이터분석',
    DEEPLEARNING: '딥러닝',
};

const formattedToRecruitField = (field: FormattedField): RecruitField => {
    return formattedToRecruitMap[field];
};

export { formattedToRecruitField };
