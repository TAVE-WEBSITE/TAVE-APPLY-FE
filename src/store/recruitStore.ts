import { createFieldStore } from './createFieldStore';
import { FormattedField, RecruitField } from '@/modules/recruitType';

interface RecruitStates {
    sex: string;
    birthday: string;
    phoneNumber: string;
    currentStep: number;
    school: string;
    major: string;
    minorDouble: string;
    applyField: string | RecruitField | FormattedField;
}

const initStates: RecruitStates = {
    sex: '',
    birthday: '',
    phoneNumber: '',
    currentStep: 1,
    school: '',
    major: '',
    minorDouble: '',
    applyField: '',
};

export const useRecruitStore = createFieldStore(initStates);
