import { createFieldStore } from "./createFieldStore";
import { RecruitField } from "@/app/types/recruit";

type Question = {
  question: string;
  content: string;
};

interface RecruitStates {
  currentStep: number;
  name: string;
  gender: string;
  birth: string;
  contact: string;
  email: string;
  school: string;
  major: string;
  minorDouble: string;
  applyField: RecruitField | string;
  questions: Question[];
}

const initStates: RecruitStates = {
  currentStep: 1,
  name: "",
  gender: "",
  birth: "",
  contact: "",
  email: "",
  school: "",
  major: "",
  minorDouble: "",
  applyField: "선택",
  questions: [],
};
const useRecruitStore = createFieldStore(initStates);

export default useRecruitStore;
export type { RecruitField, Question };
