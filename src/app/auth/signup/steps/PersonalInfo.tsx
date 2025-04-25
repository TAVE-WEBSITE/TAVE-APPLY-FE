"use client";

import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import FlexBox from "@/components/layout/FlexBox";
import ButtonNavigate from "@/components/Button/ButtonNavigate";
import SelectOptions from "@/components/Button/SelectOptions";
import { isValidBirth } from "@/utils/validate";
import { useSignUpStore } from "@/store/signUpStore";

const PersonalInfo = () => {
  const {
    name,
    phoneNumber,
    birth,
    selectedGender,
    setName,
    setPhoneNumber,
    setBirth,
    setSelectedGender,
    setCurrentStep,
  } = useSignUpStore();

  const gender = ["남성", "여성"];

  const checkPhoneNumber = () => {
    if (typeof phoneNumber === "string") return phoneNumber !== "";
    else return true;
  };

  const checkBirth = () => {
    if (typeof birth === "string") return birth !== "";
    else return isValidBirth(birth);
  };

  const handleCheck = () => {
    if (
      name.length &&
      String(phoneNumber).length &&
      checkBirth() &&
      selectedGender.length
    ) {
      return true;
    } else return false;
  };
  const checkAll = handleCheck();

  return (
    <>
      <h1 className="font-bold md:text-2xl text-xl text-[#394150] text-center">
        개인 정보 입력
      </h1>
      <InputContainer label="이름" isRequired={true}>
        <InputField
          value={name}
          setValue={setName}
          placeholder="이름을 입력해주세요"
        />
      </InputContainer>
      <InputContainer label="전화번호" isRequired={true}>
        <InputField
          type="number"
          value={phoneNumber}
          setValue={setPhoneNumber}
          placeholder="전화번호를 입력해주세요"
        />
      </InputContainer>
      <InputContainer label="생년월일" isRequired={true}>
        <InputField
          type="number"
          value={birth}
          setValue={setBirth}
          placeholder="YYMMDD 형식으로 입력해주세요"
          maxLength={6}
        />
      </InputContainer>
      <FlexBox className="gap-2" direction="col">
        <label htmlFor="select-gender" className="text-[#394150] md:text-lg">
          <FlexBox className="gap-1 items-center">
            성별
            <span className="text-[#FF0073CC]">*</span>
          </FlexBox>
        </label>
        <SelectOptions
          options={gender}
          selectedOption={selectedGender}
          setSelectedOption={setSelectedGender}
        />
      </FlexBox>
      <div className="flex flex-col-reverse md:flex-row font-bold md:justify-between pt-8 gap-1">
        <ButtonNavigate
          text="이전"
          hasBackGround={false}
          onClick={() => setCurrentStep(1)}
        />
        <ButtonNavigate
          text="다음"
          isActive={checkAll}
          isDisabled={!checkAll}
          onClick={() => setCurrentStep(3)}
        />
      </div>
    </>
  );
};

export default PersonalInfo;
