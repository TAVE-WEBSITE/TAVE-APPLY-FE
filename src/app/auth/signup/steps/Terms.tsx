'use client';

import CheckBox from '@/components/Input/CheckBox';
import FlexBox from '@/components/layout/FlexBox';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
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
        <>
            <p className="font-bold md:text-2xl text-xl text-[#394150] text-center mb-6 md:mb-8">약관 동의</p>
            <FlexBox
                direction="col"
                className="gap-5 sm:gap-6 md:gap-8 border border-gray-200 bg-white rounded-[20px] p-5 sm:p-6 md:p-8
                text-gray-700 md:text-base sm:text-sm text-xs"
            >
                <FlexBox className="gap-2 sm:gap-3 items-center">
                    <CheckBox isChecked={checkAll} setIsChecked={handleCheckAll} />
                    <p className="font-bold">모두 동의합니다</p>
                </FlexBox>
                <div className="h-[1.2px] w-full bg-[#E5E7EB]"></div>
                <FlexBox className="justify-between items-center">
                    <FlexBox className="gap-2 sm:gap-3 items-center">
                        <CheckBox isChecked={checkService} setIsChecked={setCheckService} />
                        <p className="font-medium">
                            TAVE 활동 정책에 동의합니다.
                            <span className="text-[#ED6661] text-xs font-bold ml-1">(필수)</span>
                        </p>
                    </FlexBox>
                    <a
                        href="https://snowy-cord-406.notion.site/TAVE-21a27a1548b480189c3fed254cec90a3?source=copy_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4584EE] cursor-pointer font-bold"
                    >
                        보기
                    </a>
                </FlexBox>
                <FlexBox className="justify-between items-center">
                    <FlexBox className="gap-2 sm:gap-3 items-center">
                        <CheckBox isChecked={checkPrivacy} setIsChecked={setCheckPrivacy} />
                        <span className="font-medium">
                            개인정보 수집 및 이용에 동의합니다
                            <span className="text-[#ED6661] text-xs font-bold ml-1"> (필수)</span>
                        </span>
                    </FlexBox>
                    <a
                        href="https://snowy-cord-406.notion.site/TAVE-Recruit-17427a1548b4805d8242d9009190a323?pvs=74"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4584EE] cursor-pointer font-bold"
                    >
                        보기
                    </a>
                </FlexBox>
            </FlexBox>
            <FlexBox className="justify-end mt-6">
                <ButtonNavigate
                    text="다음"
                    onClick={() => setCurrentStep(2)}
                    isActive={checkAll}
                />
            </FlexBox>
        </>
    );
};

export default Terms;
