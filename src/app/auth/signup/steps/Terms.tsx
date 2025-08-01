'use client';

import CheckBox from '@/components/Input/CheckBox';
import FlexBox from '@/components/layout/FlexBox';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import Link from 'next/link';
import { useSignUpStore } from '@/store/signUpStore';

const Terms = () => {
    const { checkPrivacy, checkService, setCheckPrivacy, setCheckService, setCurrentStep } = useSignUpStore();

    const checkAll = checkPrivacy && checkService;

    const handleCheckAll = () => {
        const next = !checkAll;
        setCheckService(next);
        setCheckPrivacy(next);
    };

    return (
        <FlexBox direction="col" className="gap-6 md:gap-8">
            <p className="font-bold md:text-2xl text-xl text-[#394150] text-center">약관 동의</p>
            <FlexBox
                direction="col"
                className="gap-5 sm:gap-6 md:gap-8 border border-gray-200 bg-white rounded-[20px] p-5 sm:p-6 md:p-8
                text-gray-700 md:text-base sm:text-sm text-xs"
            >
                <FlexBox className="gap-2 sm:gap-3 items-center">
                    <CheckBox id="all" isChecked={checkAll} setIsChecked={handleCheckAll} />
                    <label htmlFor="all" className="font-bold cursor-pointer">
                        모두 동의합니다
                    </label>
                </FlexBox>
                <div className="h-[1.2px] w-full bg-[#E5E7EB]" />
                <FlexBox className="justify-between items-center">
                    <FlexBox className="gap-2 sm:gap-3 items-center">
                        <CheckBox id="privacy" isChecked={checkPrivacy} setIsChecked={setCheckPrivacy} />
                        <label htmlFor="privacy" className="font-medium cursor-pointer">
                            개인정보 수집 및 이용에 동의합니다.
                            <span className="text-[#ED6661] text-xs font-bold ml-1">(필수)</span>
                        </label>
                    </FlexBox>
                    <Link
                        href="https://alluring-eagle-b3d.notion.site/TAVE-Recruit-21f8f2c5125080fc9d6fe2de8caf4615"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4584EE] cursor-pointer font-bold"
                    >
                        보기
                    </Link>
                </FlexBox>
                <FlexBox className="justify-between items-center">
                    <FlexBox className="gap-2 sm:gap-3 items-center">
                        <CheckBox id="service" isChecked={checkService} setIsChecked={setCheckService} />
                        <label htmlFor="service" className="font-medium cursor-pointer">
                            TAVE 활동 정책에 동의합니다.
                            <span className="text-[#ED6661] text-xs font-bold ml-1">(필수)</span>
                        </label>
                    </FlexBox>
                    <Link
                        href="https://alluring-eagle-b3d.notion.site/TAVE-21f8f2c5125080c0a9e2e21ffbbf07da"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4584EE] cursor-pointer font-bold"
                    >
                        보기
                    </Link>
                </FlexBox>
            </FlexBox>
            <FlexBox className="justify-end">
                <ButtonNavigate text="다음" onClick={() => setCurrentStep(2)} isActive={checkAll} />
            </FlexBox>
        </FlexBox>
    );
};

export default Terms;
