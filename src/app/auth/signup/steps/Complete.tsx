'use client';

import { useSignUpStore } from '@/store/signUpStore';
import FlexBox from '@/components/layout/FlexBox';
import ButtonNavigate from '@/components/Button/ButtonNavigate';

const Complete = () => {
    const { name } = useSignUpStore();

    return (
        <FlexBox direction="col" className="items-center justify-center h-full md:gap-8 gap-6">
            <div className="text-gray-700 sm:text-3xl text-2xl font-bold text-center">
                <p>{name}님</p>
                <p>회원가입이 완료되었습니다!</p>
            </div>
            <FlexBox className="items-center">
                <ButtonNavigate
                    text="돌아가기"
                    onClick={() => {
                        window.location.replace('/');
                    }}
                />
            </FlexBox>
        </FlexBox>
    );
};

export default Complete;
