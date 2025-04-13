"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import ButtonAuth from "@/components/Button/ButtonAuth";
import ButtonNavigate from "@/components/Button/ButtonNavigate";
import FlexBox from "@/components/layout/FlexBox";

const FindClient = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");

  return (
    <FlexBox className="pt-4 gap-8" direction="col">
      <InputContainer label="이름" isRequired={true}>
        <InputField
          value={name}
          setValue={setName}
          placeholder="이름을 입력해주세요"
        ></InputField>
      </InputContainer>
      <InputContainer label="생년월일" isRequired={true}>
        <InputField
          value={birth}
          setValue={setBirth}
          placeholder="YYMMDD"
        ></InputField>
      </InputContainer>
      <InputContainer
        label="이메일 주소"
        isRequired={true}
        description="자주 사용하는 이메일로 입력해주세요 :)"
      >
        <FlexBox className="items-center justify-between">
          <InputField
            value={email}
            setValue={setEmail}
            placeholder="이메일 주소를 입력해주세요"
            hasButton={true}
          />
          <ButtonAuth text="인증요청" />
        </FlexBox>
      </InputContainer>
      <InputContainer label="인증번호" isRequired={true}>
        <FlexBox className="items-center justify-between">
          <InputField
            value={authCode}
            setValue={setAuthCode}
            placeholder="인증번호를 입력해주세요"
            hasButton={true}
          />
          <ButtonAuth text="인증확인" />
        </FlexBox>
      </InputContainer>
      <div className="flex flex-col-reverse md:flex-row font-bold md:justify-end py-8 gap-1">
        <ButtonNavigate
          text="다음"
          onClick={() => router.push("auth/password/reset")}
        />
      </div>
    </FlexBox>
  );
};

export default FindClient;
