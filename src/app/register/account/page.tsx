"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import FlexBox from "@/components/layout/FlexBox";
import ButtonNavigate from "@/components/Button/ButtonNavigate";
import SelectOptions from "@/components/Button/SelectOptions";

type Gender = "남성" | "여성";
const gender: Gender[] = ["남성", "여성"];

const Account = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birth, setBirth] = useState("");
  const [selectedGender, setSelectedGender] = useState<Gender | undefined>();

  return (
    <>
      <h1 className="font-bold text-2xl text-[#394150] text-center">
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
          value={phoneNumber}
          setValue={setPhoneNumber}
          placeholder="전화번호를 입력해주세요"
        />
      </InputContainer>
      <InputContainer label="생년월일" isRequired={true}>
        <InputField
          value={birth}
          setValue={setBirth}
          placeholder="YYMMDD 형식으로 입력해주세요"
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
        <FlexBox className="justify-between">
          <div></div>
        </FlexBox>
      </FlexBox>
      <FlexBox className="font-bold justify-between pt-8">
        <ButtonNavigate text="이전" isDisabled={true} />
        <ButtonNavigate
          text="다음"
          onClick={() => router.push("/register/profile")}
        />
      </FlexBox>
    </>
  );
};

export default Account;
