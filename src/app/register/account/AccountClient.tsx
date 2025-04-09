"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isValidPassword, validatePasswordConfirm } from "@/utils/validate";
import FlexBox from "@/components/layout/FlexBox";
import ButtonNavigate from "@/components/Button/ButtonNavigate";
import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import ButtonAuth from "@/components/Button/ButtonAuth";
import { useValidation } from "@/hooks/useValidation";

const AccountClient = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const passwordError = useValidation(password, isValidPassword);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const confirmError = useValidation(
    password,
    validatePasswordConfirm,
    passwordConfirm
  );

  const handleCheck = () => {
    if (
      email.length &&
      String(authCode).length &&
      password.length &&
      passwordError.length === 0 &&
      passwordConfirm.length &&
      confirmError.length === 0
    )
      return true;
    else return false;
  };

  const checkAll = handleCheck();

  return (
    <FlexBox className="pt-4 gap-8" direction="col">
      <InputContainer
        label="이메일 주소"
        isRequired={true}
        description="자주 사용하는 이메일로 가입해주세요 :)"
      >
        <FlexBox className="items-center justify-between">
          <InputField
            value={email}
            setValue={setEmail}
            placeholder="이메일주소를 입력해주세요"
            hasButton={true}
          />
          <ButtonAuth text={"인증요청"} />
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
          />
          <ButtonAuth text={"인증확인"} isActive={false} />
        </FlexBox>
      </InputContainer>
      <InputContainer
        label="비밀번호"
        description="8자 이상, 대소문자 모두 포함, 특수문자(!@#$%^&*) 포함"
        isRequired={true}
      >
        <InputField
          type="password"
          value={password}
          setValue={setPassword}
          placeholder="비밀번호를 입력해주세요"
          isError={!!passwordError}
          errorMessage={passwordError}
        />
      </InputContainer>
      <InputContainer label="비밀번호 확인" isRequired={true}>
        <InputField
          type="password"
          value={passwordConfirm}
          setValue={setPasswordConfirm}
          placeholder="비밀번호를 다시 입력해주세요"
          isError={!!confirmError}
          errorMessage={confirmError}
        />
      </InputContainer>

      <div className="flex flex-col-reverse md:flex-row font-bold md:justify-between py-8 gap-1">
        <ButtonNavigate
          text="이전"
          hasBackGround={false}
          onClick={() => router.push("/register/profile")}
        />
        <ButtonNavigate
          text="다음"
          isActive={checkAll}
          onClick={() => router.push("/register/complete")}
        />
      </div>
    </FlexBox>
  );
};

export default AccountClient;
