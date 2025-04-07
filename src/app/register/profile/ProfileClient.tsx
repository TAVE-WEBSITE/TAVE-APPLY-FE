"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validatePassword, validatePasswordConfirm } from "@/utils/validate";
import FlexBox from "@/components/layout/FlexBox";
import ButtonNavigate from "@/components/Button/ButtonNavigate";
import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import ButtonAuth from "@/components/Button/ButtonAuth";

const ProfileClient = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const checkPassword = () => {
    const error = validatePassword(password);
    setPasswordError(error);
  };

  const confirmPassword = () => {
    const error = validatePasswordConfirm(password, passwordConfirm);
    setConfirmError(error);
  };

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
            width={"w-[473px]"}
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
            width={"w-[473px]"}
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
          onBlur={checkPassword}
          isError={!!passwordError}
          errorMessage={passwordError}
        />
      </InputContainer>
      <InputContainer label="비밀번호 확인" isRequired={true}>
        <InputField
          value={passwordConfirm}
          setValue={setPasswordConfirm}
          onBlur={confirmPassword}
          placeholder="비밀번호를 다시 입력해주세요"
          isError={!!confirmError}
          errorMessage={confirmError}
        />
      </InputContainer>
      <FlexBox className="font-bold justify-between pt-8">
        <ButtonNavigate
          text="이전"
          onClick={() => router.push("/register/account")}
        />
        <ButtonNavigate
          text="다음"
          onClick={() => router.push("/register/complete")}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default ProfileClient;
