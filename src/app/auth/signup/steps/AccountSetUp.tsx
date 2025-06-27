'use client';

import { useState } from 'react';
import { isValidPassword, validatePasswordConfirm } from '@/utils/validate';
import { useValidation } from '@/hooks/useValidation';
import { useSignUpStore } from '@/store/signUpStore';
import { formatBirth } from '@/utils/formatBirth';
import FlexBox from '@/components/layout/FlexBox';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import InputContainer from '@/components/layout/InputContainer';
import ToastMessage from '@/components/ToastMessage';
import InputField from '@/components/Input/InputField';
import ButtonAuth from '@/components/Button/ButtonAuth';
import useAuth from '@/hooks/useAuth';

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
        isConfirmState,
        isSentState,
        setEmail,
        setAuthCode,
        setPassword,
        setPasswordConfirm,
        setCurrentStep,
        setIsConfirmState,
        setIsSentState
    } = useSignUpStore();

    const passwordError = useValidation(password, isValidPassword);
    const confirmError = useValidation(password, validatePasswordConfirm, passwordConfirm);
    const birthday = formatBirth(birth);

    const { signUp, verifyEmail, verifyConfirm, isVerifyEmailLoading, isVerifyConfirmLoading } = useAuth();

    const [isToastOpen, setIsToastOpen] = useState(false);
    const [toast, setToast] = useState({ message: '', isError: false });

    const handleCheck = () => {
        if (passwordError.length === 0 && confirmError.length === 0 && isConfirmState === 'SUCCESS') return true;
        else return false;
    };

    const handleSignUp = async () => {
        const sex = selectedGender === '남성' ? 'MALE' : 'FEMALE';
        const res = await signUp({
            email,
            password,
            phoneNumber,
            username: name,
            birthday,
            sex,
        });
        if (res === 200) {
            setCurrentStep(4);
        }
    };

    const handleVerifyEmail = async () => {
        setAuthCode('');
        setIsSentState('BEFORE');
        const res = await verifyEmail({
            name,
            email,
            birth: birthday,
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
            setToast({ message: '인증번호가 확인되었습니다.', isError: false });
        }
        setIsToastOpen(true);
    };

    return (
        <FlexBox direction="col" className="gap-6 md:gap-7">
            <p className="font-bold md:text-2xl text-xl text-[#394150] text-center mb-1">개인 정보 입력</p>
            <InputContainer label="이메일 주소" description="자주 사용하는 이메일로 가입해주세요 :)">
                <FlexBox className="gap-2 md:gap-3 items-center">
                    <InputField
                        type="email"
                        value={email}
                        setValue={setEmail}
                        placeholder="이메일 주소를 입력해주세요"
                        isError={isSentState === 'ERROR'}
                        isPassed={isSentState === 'SUCCESS'}
                        disabled={isConfirmState === 'SUCCESS'}
                    />
                    <ButtonAuth
                        text="인증요청"
                        onClick={handleVerifyEmail}
                        isLoading={isVerifyEmailLoading}
                        isActive={email.length > 0 !== (isConfirmState === 'SUCCESS')}
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
                        isCounting={isSentState === 'SUCCESS' && !(isConfirmState === 'SUCCESS')}
                    />
                    <ButtonAuth
                        text="인증확인"
                        onClick={handleVerifyConfirm}
                        isLoading={isVerifyConfirmLoading}
                        isActive={authCode.length > 0 !== (isConfirmState === 'SUCCESS')}
                    />
                </FlexBox>
            </InputContainer>
            <InputContainer label="비밀번호" description="8자 이상, 대소문자 모두 포함, 특수문자(!@#$%^&*) 포함">
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
            <div className="flex flex-col-reverse md:flex-row md:justify-between mt-3 gap-1">
                <ButtonNavigate text="이전" hasBackGround={false} onClick={() => setCurrentStep(2)} />
                <ButtonNavigate text="다음" isActive={handleCheck()} onClick={handleSignUp} />
            </div>
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

export default AccountSetUp;
