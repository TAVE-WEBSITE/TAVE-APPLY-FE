"use client";

import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import FlexBox from "@/components/layout/FlexBox";
import useRecruitStore from "@/store/recruitStore";
import ButtonNavigate from "@/components/Button/ButtonNavigate";

const lables = ["이름", "성별", "생년월일", "연락처", "이메일 주소"];

const PersonalInfo = () => {
  const {
    school,
    major,
    minorDouble,
    applyField,
    setSchool,
    setMajor,
    setMinorDouble,
    setApplyField,
    setCurrentStep,
  } = useRecruitStore();

  // /** 다음 스텝으로 넘어가기 위해 버튼 활성화를 결정하는 변수 */
  // const isActive =
  //   school !== "" && major !== "" && minorDouble !== "" && applyField !== "";

  return (
    <>
      <h1 className="font-bold text-2xl text-[#394150] text-center">
        개인 정보 입력
      </h1>
      <FlexBox direction="col" className="pt-4 gap-8">
        {lables.map((label) => (
          <InputContainer key={label} label={label}>
            <InputField value={label} readonly />
          </InputContainer>
        ))}
        <InputContainer label="힉교" isRequired={true}>
          <InputField value={school} placeholder="학교를 입력해주세요" />
        </InputContainer>
        <InputContainer label="전공" isRequired={true}>
          <InputField value={major} placeholder="전공을 입력해주세요" />
        </InputContainer>
        <InputContainer label="부전공/복수전공" isRequired={true}>
          <InputField
            value={minorDouble}
            placeholder="부전공 or 복수전공을 입력해주세요"
          />
        </InputContainer>
        <InputContainer
          label="지원분야"
          isRequired={true}
          description="기수 당 1개의 분야만 지원 가능합니다."
        >
          <InputField value={minorDouble} />
        </InputContainer>
        <FlexBox className="justify-end">
          <ButtonNavigate text="다음" onClick={() => setCurrentStep(2)} />
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default PersonalInfo;
