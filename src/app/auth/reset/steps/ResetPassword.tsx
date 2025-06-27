'use client';

import InputContainer from '@/components/layout/InputContainer';
import InputField from '@/components/Input/InputField';
import FlexBox from '@/components/layout/FlexBox';
import useAuth from '@/hooks/useAuth';
import { useValidation } from '@/hooks/useValidation';
import { isValidPassword, validatePasswordConfirm } from '@/utils/validate';
import { useResetPasswordStore } from '@/store/resetPasswordStore';
import ButtonNavigate from '@/components/Button/ButtonNavigate';

const ResetPassword = () => {
    const { email, newPassword, newPasswordConfirm, setNewPassword, setNewPasswordConfirm, setCurrentStep } =
        useResetPasswordStore();

    const passwordError = useValidation(newPassword, isValidPassword);
    const confirmError = useValidation(newPassword, validatePasswordConfirm, newPasswordConfirm);

    const handleCheck = () => {
        if (newPassword.length && newPasswordConfirm.length && passwordError.length === 0 && confirmError.length === 0)
            return true;
        else return false;
    };

    const { resetPassword, isResetPasswordLoading } = useAuth();

    const handleResetPassword = async () => {
        const res = await resetPassword({
            email,
            password: newPassword,
            validatedPassword: newPasswordConfirm,
        });
        if (res === 200) {
            window.location.replace('/');
        }
        setNewPassword('');
        setNewPasswordConfirm('');
    };

    return (
        <FlexBox direction="col" className="gap-5 md:gap-6">
            <InputContainer label="새 비밀번호" description="8자 이상, 대소문자 모두 포함, 특수문자(!@#$%^&*) 포함">
                <InputField
                    type="password"
                    value={newPassword}
                    setValue={setNewPassword}
                    placeholder="새 비밀번호를 입력해주세요"
                    errorMessage={passwordError}
                    isError={!!passwordError}
                />
            </InputContainer>
            <InputContainer label="새 비밀번호 확인">
                <InputField
                    type="password"
                    value={newPasswordConfirm}
                    setValue={setNewPasswordConfirm}
                    placeholder="새 비밀번호를 다시 입력해주세요"
                    errorMessage={confirmError}
                    isError={!!confirmError}
                ></InputField>
            </InputContainer>
            <div className="flex flex-col-reverse md:flex-row md:justify-between mt-4 gap-1">
                <ButtonNavigate text="이전" hasBackGround={false} onClick={() => setCurrentStep(1)} />
                <ButtonNavigate
                    text="비밀번호 재설정"
                    isActive={handleCheck()}
                    onClick={handleResetPassword}
                    isLoading={isResetPasswordLoading}
                />
            </div>
        </FlexBox>
    );
};

export default ResetPassword;
