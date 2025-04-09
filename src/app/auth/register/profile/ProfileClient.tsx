"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import FlexBox from "@/components/layout/FlexBox";
import ButtonNavigate from "@/components/Button/ButtonNavigate";
import SelectOptions from "@/components/Button/SelectOptions";
import { isValidBirth } from "@/utils/validate";

const ProfileClient = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number | string>("");
  const [birth, setBirth] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");

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
      checkPhoneNumber() &&
      checkBirth() &&
      selectedGender.length
    ) {
      return true;
    } else return false;
  };
  const checkAll = handleCheck();

  return (
    <>
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
          onClick={() => router.push("auth/register/terms")}
        />
        <ButtonNavigate
          text="다음"
          isActive={checkAll}
          isDisabled={!checkAll}
          onClick={() => router.push("auth/register/account")}
        />
      </div>
    </>
  );
};

export default ProfileClient;
