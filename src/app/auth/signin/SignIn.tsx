'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import InputContainer from '@/components/layout/InputContainer';
import InputField from '@/components/Input/InputField';
import FlexBox from '@/components/layout/FlexBox';
import LoadingSpinner from '@/components/LoadingSpinner';
import useAuth from '@/hooks/useAuth';

const SignIn = () => {
    const router = useRouter();
    const { signIn, isSignInLoading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = async () => {
        const res = await signIn({
            email,
            password,
        });
        if (res === 200) {
            router.replace('/');
        } else if (res?.message === '아이디 혹은 비밀번호가 일치하지 않습니다.') {
            setLoginError(true);
            setEmail('');
            setPassword('');
        }
    };

    return (
        <>
            <FlexBox direction="col" className="gap-3.5 mb-5.5">
                <InputContainer label="이메일">
                    <InputField
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="이메일을 입력해주세요"
                        isError={loginError}
                    />
                </InputContainer>
                <InputContainer label="비밀번호">
                    <InputField
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="비밀번호를 입력해주세요"
                        isError={loginError}
                    />
                </InputContainer>
            </FlexBox>
            {loginError && (
                <p className="text-pink-600/80 md:text-base text-sm font-medium">
                    * 이메일 또는 비밀번호가 잘못 되었습니다.
                </p>
            )}
            <FlexBox direction="col" className="mt-5.5 gap-4">
                <button
                    onClick={handleLogin}
                    className="bg-[#195BFF] md:py-4 py-3 rounded-[10px] w-full font-semibold cursor-pointer"
                >
                    {isSignInLoading ? (
                        <FlexBox className="justify-center">
                            <LoadingSpinner />
                        </FlexBox>
                    ) : (
                        '로그인'
                    )}
                </button>
                <FlexBox className="justify-center gap-3 md:gap-4 items-center">
                    <Link href="/auth/signup" className="text-[#888D96] text-sm md:text-[15px]">
                        회원 가입
                    </Link>
                    <div className="w-[1.4px] h-4 bg-[#E5E7EB]" />
                    <Link href="/auth/reset" className="text-[#888D96] text-sm md:text-[15px]">
                        비밀번호 찾기
                    </Link>
                </FlexBox>
            </FlexBox>
        </>
    );
};

export default SignIn;
