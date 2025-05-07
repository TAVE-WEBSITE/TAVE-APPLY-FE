"use client";

import { useState } from "react";
import InputContainer from "@/components/layout/InputContainer";
import InputField from "@/components/Input/InputField";
import ButtonNavigateLarge from "@/components/Button/ButtonNavigateLarge";
import FlexBox from "@/components/layout/FlexBox";
import { useValidation } from "@/hooks/useValidation";
import { isValidPassword, validatePasswordConfirm } from "@/utils/validate";
import { useAuth } from "@/hooks/useAuth";
import { useResetPasswordStore } from "@/store/resetPasswordStore";
import ToastMessage from "@/components/ToastMessage";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

  const passwordError = useValidation(newPassword, isValidPassword);
  const passwordConfirmError = useValidation(
    newPassword,
    validatePasswordConfirm,
    passwordConfirm
  );

  const { email } = useResetPasswordStore();

  const isActive = newPassword !== "" && passwordConfirm !== "";

  const { resetPassword, isResetPasswordLoading } = useAuth();

  const handleUpdatePassword = async () => {
    if (newPassword === passwordConfirm) {
      const res = await resetPassword({
        email: email,
        password: newPassword,
        validatedPassword: passwordConfirm,
      });
      if (res.message) {
        setIsToastOpen(true);
      }
      setNewPassword("");
      setPasswordConfirm("");
    }
  };

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
      <ToastMessage
        message={"비밀번호가 재설정되었습니다."}
        isOpen={isToastOpen}
        setIsOpen={setIsToastOpen}
      />
      <div className="flex flex-col-reverse md:flex-row font-bold md:justify-end py-8 gap-1">
        <ButtonNavigateLarge
          text="비밀번호 재설정"
          isActive={isActive}
          onClick={handleUpdatePassword}
          isLoading={isResetPasswordLoading}
        />
      </div>
    </FlexBox>
  );
};

export default ResetPassword;
