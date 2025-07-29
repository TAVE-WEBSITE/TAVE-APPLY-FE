import { createFieldStore } from './createFieldStore';
import { RecruitField } from '@/modules/recruitType';

interface RecruitStates {
    currentStep: number;
    school: string;
    major: string;
    minor: string;
    applyField: RecruitField | '';
    isClickedFourth: boolean;
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
