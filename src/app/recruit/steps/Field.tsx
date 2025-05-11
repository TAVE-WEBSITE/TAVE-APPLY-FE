"use client";

import { useState } from "react";
import ButtonNavigate from "@/components/Button/ButtonNavigate";
import Disclosure from "@/components/Disclosure";
import InputField from "@/components/Input/InputField";
import TextArea from "@/components/Input/TextArea";
import FlexBox from "@/components/layout/FlexBox";
import StepCounter from "@/components/StepCounter";
import useRecruitStore from "@/store/recruitStore";

const programmingLevel = ["입문", "초급", "중급", "상급", "전문가"];

const Field = () => {
  const { setCurrentStep } = useRecruitStore();

  const [level, setLevel] = useState<number>(0);
  const [techStack, setTechStack] = useState("");
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");

  return (
    <>
      <h1 className="font-bold text-2xl text-[#394150] text-center">
        웹 프론트엔드 분야
      </h1>
      <Disclosure title={"홍길동님의 프로그래밍 실력은 어느정도인가요?"}>
        <StepCounter
          title="Javascript"
          currentStep={level}
          setCurrentStep={setLevel}
          maxStep={5}
          stepLabels={programmingLevel}
        />
      </Disclosure>
      <Disclosure title={"기타 활용 가능한 기술 스택이 있으신가요?"}>
        <InputField
          value={techStack}
          setValue={setTechStack}
          placeholder="스택을 입력해주세요"
        />
      </Disclosure>
      <Disclosure
        title={
          "첫 번째 질문에서 평가한 프레임워크/언어에 대해 학습하거나 활용한 경험에 대해 간단하게 서술해주세요. (500자 이내)"
        }
        isRequired={true}
      >
        <TextArea
          value={question1}
          setValue={setQuestion1}
          placeholder="지원자님의 경험을 공유해주세요"
          maxLength={500}
        />
      </Disclosure>
      <Disclosure
        title={
          "다른 분야와의 연합 프로젝트 경험 및 협업 경험에 대해 자세하게 서술해주세요. (700자 이내)"
        }
        isRequired={true}
      >
        <TextArea
          value={question2}
          setValue={setQuestion2}
          placeholder="지원자님의 경험을 공유해주세요"
          maxLength={700}
        />
      </Disclosure>
      <FlexBox className="justify-between">
        <ButtonNavigate text="이전" onClick={() => setCurrentStep(1)} />
        <ButtonNavigate text="다음" onClick={() => setCurrentStep(3)} />
      </FlexBox>
    </>
  );
};

export default Field;
