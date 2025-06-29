import { createFieldStore } from './createFieldStore';
import { RecruitField } from '@/modules/recruitType';

interface RecruitStates {
    currentStep: number;
    school: string;
    major: string;
    minorDouble: string;
    applyField: RecruitField | '선택';
}

const initStates: RecruitStates = {
    currentStep: 1,
    school: '',
    major: '',
    minorDouble: '',
    applyField: '선택',
};

export const useRecruitStore = createFieldStore(initStates);
