import { createFieldStore } from './createFieldStore';
import { FormattedField, RecruitField } from '@/modules/recruitType';

interface RecruitStates {
    currentStep: number;
    school: string;
    major: string;
    minor: string;
    isClickedFourth: boolean;
    applyField: string | RecruitField | FormattedField;
}

const initStates: RecruitStates = {
    currentStep: 1,
    school: '',
    major: '',
    minor: '',
    applyField: '',
    isClickedFourth: true,
};

export const useRecruitStore = createFieldStore(initStates);
