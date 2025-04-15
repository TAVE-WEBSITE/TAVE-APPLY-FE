"use client";

import { useState } from "react";
import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import ButtonNavigateLarge from "@/components/Button/ButtonNavigateLarge";
import FlexBox from "@/components/layout/FlexBox";
import { useValidation } from "@/hooks/useValidation";
import { isValidPassword, validatePasswordConfirm } from "@/utils/validate";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const passwordError = useValidation(newPassword, isValidPassword);
  const passwordConfirmError = useValidation(
    newPassword,
    validatePasswordConfirm,
    passwordConfirm
  );

  const handlePasswordUpdate = () => {};

  return (
    <FlexBox className="pt-4 gap-8" direction="col">
      <InputContainer
        label="새 비밀번호"
        description="8자 이상, 대소문자 모두 포함, 특수문자(!@#$%^&*) 포함"
        isRequired={true}
      >
        <InputField
          type="password"
          value={newPassword}
          setValue={setNewPassword}
          placeholder="새 비밀번호를 입력해주세요"
          errorMessage={passwordError}
          isError={!!passwordError}
        ></InputField>
      </InputContainer>
      <InputContainer label="비밀번호 확인" isRequired={true}>
        <InputField
          type="password"
          value={passwordConfirm}
          setValue={setPasswordConfirm}
          placeholder="비밀번호를 다시 입력해주세요"
          errorMessage={passwordConfirmError}
          isError={!!passwordConfirmError}
        ></InputField>
      </InputContainer>
      <div className="flex flex-col-reverse md:flex-row font-bold md:justify-end py-8 gap-1">
        <ButtonNavigateLarge
          text="비밀번호 재설정"
          onClick={handlePasswordUpdate}
        />
      </div>
    </FlexBox>
  );
};

export default ResetPassword;
