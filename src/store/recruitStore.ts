import { createFieldStore } from "./createFieldStore";

type RecruitField =
  | "UX/UI 디자이너"
  | "웹 프론트엔드"
  | "앱 프론트엔드"
  | "백엔드"
  | "데이터분석"
  | "딥러닝";

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
  applyField: "",
  questions: [],
};
const useRecruitStore = createFieldStore(initStates);

export default useRecruitStore;
export type { RecruitField, Question };
