'use client';

import { useState } from 'react';
import { useResetPasswordStore } from '@/store/resetPasswordStore';
import { formatBirth, handleBirthInput } from '@/utils/formatBirth';
import { isValidBirth } from '@/utils/validate';
import InputField from '@/components/Input/InputField';
import ButtonAuth from '@/components/Button/ButtonAuth';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import FlexBox from '@/components/layout/FlexBox';
import ToastMessage from '@/components/ToastMessage';
import useAuth from '@/hooks/useAuth';
import InputContainer from '@/components/layout/InputContainer';

const FindPassword = () => {
    const {
        name,
        birth,
        email,
        authCode,
        isConfirmState,
        isSentState,
        setName,
        setBirth,
        setEmail,
        setAuthCode,
        setCurrentStep,
        setIsConfirmState,
        setIsSentState,
    } = useResetPasswordStore();

    const birthday = formatBirth(birth);

    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toast, setToast] = useState({ message: '', isError: false });

    const { verifyEmail, verifyConfirm, isVerifyEmailLoading, isVerifyConfirmLoading } = useAuth();

    const handleCheck = () => {
        if (isSentState === 'SUCCESS' && isConfirmState === 'SUCCESS') return true;
        else return false;
    };

    const verifyCheck = () => {
        if (email.length && name.trim().length && isValidBirth(birth)) return true;
        else return false;
    };

    const handleVerifyEmail = async () => {
        setAuthCode('');
        setIsSentState('BEFORE');
        const res = await verifyEmail({
            name,
            email,
            birth: birthday,
            reset: true,
        });
        if (res !== 200) {
            setIsSentState('ERROR');
            setToast({ message: res.message, isError: true });
        } else {
            setIsSentState('SUCCESS');
            setToast({ message: '이메일로 인증번호가 발송되었습니다.', isError: false });
        }
        setIsToastOpen(true);
    };

    const handleVerifyConfirm = async () => {
        const res = await verifyConfirm(email, authCode);
        if (res !== 200) {
            setIsConfirmState('ERROR');
            setToast({ message: res.message, isError: true });
        } else {
            setIsConfirmState('SUCCESS');
            setToast({ message: '인증에 성공하였습니다', isError: false });
        }
        setIsToastOpen(true);
    };

    return (
        <FlexBox direction="col" className="gap-5 md:gap-6">
            <InputContainer label="이름">
                <InputField
                    value={name}
                    setValue={setName}
                    placeholder="이름을 입력해주세요"
                    disabled={isSentState === 'SUCCESS'}
                />
            </InputContainer>
            <InputContainer label="생년월일">
                <InputField
                    value={birth}
                    setValue={(val) => handleBirthInput(val, setBirth)}
                    placeholder="YYMMDD 형식으로 입력해주세요"
                    disabled={isSentState === 'SUCCESS'}
                ></InputField>
            </InputContainer>
            <InputContainer label="이메일 주소" description="가입했던 이메일로 작성해주세요 :)">
                <FlexBox className="gap-2 md:gap-3 items-center">
                    <InputField
                        type="email"
                        value={email}
                        setValue={setEmail}
                        placeholder="이메일 주소를 입력해주세요"
                        disabled={isSentState === 'SUCCESS'}
                    />
                    <ButtonAuth
                        text="인증요청"
                        onClick={handleVerifyEmail}
                        isLoading={isVerifyEmailLoading}
                        isActive={verifyCheck() && isConfirmState !== 'SUCCESS'}
                    />
                </FlexBox>
            </InputContainer>
            <InputContainer label="인증번호">
                <FlexBox className="gap-2 md:gap-3 items-center">
                    <InputField
                        value={authCode}
                        setValue={setAuthCode}
                        placeholder="인증번호를 입력해주세요"
                        isError={isConfirmState === 'ERROR'}
                        disabled={isSentState !== 'SUCCESS' || isConfirmState === 'SUCCESS'}
                        isCounting={isSentState === 'SUCCESS' && isConfirmState !== 'SUCCESS'}
                    />
                    <ButtonAuth
                        text="인증확인"
                        onClick={handleVerifyConfirm}
                        isLoading={isVerifyConfirmLoading}
                        isActive={authCode.length > 0 !== (isConfirmState === 'SUCCESS')}
                    />
                </FlexBox>
            </InputContainer>
            <FlexBox className="mt-6 md:mt-5 justify-end">
                <ButtonNavigate text="다음" onClick={() => setCurrentStep(2)} isActive={handleCheck()} />
            </FlexBox>
            {isToastOpen && (
                <ToastMessage
                    isOpen={isToastOpen}
                    isError={toast.isError}
                    setIsOpen={setIsToastOpen}
                    message={toast.message}
                />
            )}
        </FlexBox>
    );
};

export default FindPassword;
