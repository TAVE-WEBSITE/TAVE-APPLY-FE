"use client";

import { useState } from "react";
import { useResetPasswordStore } from "@/store/resetPasswordStore";
import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import ButtonAuth from "@/components/Button/ButtonAuth";
import ButtonNavigate from "@/components/Button/ButtonNavigate";
import FlexBox from "@/components/layout/FlexBox";
import ToastMessage from "@/components/ToastMessage";

const FindPassword = () => {
  const {
    name,
    birth,
    email,
    authCode,
    setName,
    setBirth,
    setEmail,
    setAuthCode,
    setCurrentStep,
  } = useResetPasswordStore();

  const [isAuthRequested, setIsAuthRequested] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const hanldeAuthRequest = () => {
    setIsToastOpen(true);
  };

  const handleAuthConfirm = () => {
    setIsAuthRequested(true);
  };

  const isActive =
    name !== "" && birth !== "" && email !== "" && authCode !== "";

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
          <ButtonAuth
            text="인증요청"
            onClick={hanldeAuthRequest}
            isLoading={false}
          />
        </FlexBox>
      </InputContainer>
      <InputContainer label="인증번호" isRequired={true}>
        <FlexBox className="items-center justify-between">
          <InputField
            type="number"
            value={authCode}
            setValue={setAuthCode}
            placeholder="인증번호를 입력해주세요"
            hasButton={true}
            isCounting={isAuthRequested}
            // isPassed={true}
            // passMessage="* 인증번호가 확인되었습니다."
          />
          <ButtonAuth
            text="인증확인"
            isActive={authCode.length > 0}
            onClick={handleAuthConfirm}
            isLoading={false}
          />
        </FlexBox>
      </InputContainer>
      <ToastMessage
        message={"이메일로 회원 인증번호가 발송되었습니다"}
        isOpen={isToastOpen}
        setIsOpen={setIsToastOpen}
      />
      <div className="flex flex-col-reverse md:flex-row font-bold md:justify-end py-8 gap-1">
        <ButtonNavigate
          text="다음"
          onClick={() => setCurrentStep(2)}
          isActive={isActive}
        />
      </div>
    </FlexBox>
  );
};

export default FindPassword;
