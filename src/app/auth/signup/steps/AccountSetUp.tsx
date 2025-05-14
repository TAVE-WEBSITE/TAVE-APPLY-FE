"use client";

import { useState } from "react";
import { isValidPassword, validatePasswordConfirm } from "@/utils/validate";
import FlexBox from "@/components/layout/FlexBox";
import ButtonNavigate from "@/components/Button/ButtonNavigate";
import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import ButtonAuth from "@/components/Button/ButtonAuth";
import { useValidation } from "@/hooks/useValidation";
import { useSignUpStore } from "@/store/signUpStore";
import { useAuth } from "@/hooks/useAuth";
import { convertToFullYear } from "@/utils/convert";
import ToastMessage from "@/components/ToastMessage";

const AccountSetUp = () => {
  const {
    name,
    email,
    authCode,
    password,
    phoneNumber,
    birth,
    passwordConfirm,
    selectedGender,
    setEmail,
    setAuthCode,
    setPassword,
    setPasswordConfirm,
    setCurrentStep,
  } = useSignUpStore();
  const passwordError = useValidation(password, isValidPassword);
  const confirmError = useValidation(
    password,
    validatePasswordConfirm,
    passwordConfirm
  );

  const {
    signUp,
    verifyEmail,
    verifyConfirm,
    isVerifyEmailLoading,
    isVerifyConfirmLoading,
  } = useAuth();

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastmessage, setToastMessage] = useState("");

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

  const handleSignUp = async () => {
    const sex = selectedGender === "남성" ? "MALE" : "FEMALE";
    const res = await signUp({
      email,
      password,
      phoneNumber,
      username: name,
      birthday: convertToFullYear(birth),
      sex: sex,
    });
    if (res.status !== 200) {
      setToastMessage(res.response.data.message);
      setIsToastOpen(true);
    }
  };

  const handleVerifyEmail = async () => {
    const res = await verifyEmail(
      {
        email: email,
        number: "",
      },
      false
    );
    if (res.status !== 200) {
      setToastMessage(res.response.data.message);
    } else {
      setToastMessage("인증번호 발송에 성공했습니다.");
    }
    setIsToastOpen(true);
  };

  const verifyCode = async () => {
    const res: any = await verifyConfirm(
      {
        email: email,
        number: authCode,
      },
      false
    );
    if (res.status !== 200) {
      setToastMessage(res.response.data.message);
    } else {
      setToastMessage("인증에 성공했습니다.");
    }
    setIsToastOpen(true);
  };
  return (
    <>
      <h1 className="font-bold text-2xl text-[#394150] text-center">
        개인 정보 입력
      </h1>
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
            <ButtonAuth
              text={"인증요청"}
              onClick={handleVerifyEmail}
              isLoading={isVerifyEmailLoading}
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
            />
            <ButtonAuth
              text={"인증확인"}
              onClick={verifyCode}
              isActive={authCode.length > 0}
              isLoading={isVerifyConfirmLoading}
            />
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
            onClick={() => setCurrentStep(2)}
          />
          <ButtonNavigate
            text="가입"
            isActive={checkAll}
            onClick={handleSignUp}
          />
        </div>
        <ToastMessage
          isOpen={isToastOpen}
          isError={true}
          setIsOpen={setIsToastOpen}
          message={toastmessage}
        />
      </FlexBox>
    </>
  );
};

export default AccountSetUp;
