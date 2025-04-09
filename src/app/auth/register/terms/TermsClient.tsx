"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CheckBox from "@/components/Input/CheckBox";
import FlexBox from "@/components/layout/FlexBox";
import ButtonNavigate from "@/components/Button/ButtonNavigate";

const TermsClient = () => {
  const router = useRouter();
  const [checkService, setCheckService] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);

  const checkAll = checkService && checkPrivacy;

  const handleCheckAll = () => {
    const next = !checkAll;
    setCheckService(next);
    setCheckPrivacy(next);
  };
  return (
    <>
      <FlexBox
        direction="col"
        className="gap-6 border border-[#E5E7EB] bg-white rounded-2xl p-8 text-[#394150] md:text-base text-sm"
      >
        <FlexBox className="justify-between">
          <FlexBox className="gap-3 font-bold items-center md:text-base text-xs">
            <CheckBox isChecked={checkAll} setIsChecked={handleCheckAll} />
            <span>모두 동의합니다</span>
            <span className="text-[#ED6661] text-xs">(필수)</span>
          </FlexBox>
        </FlexBox>
        <div className="h-[1.2px] md:w-[540px] bg-[#E5E7EB]"></div>
        <FlexBox className="font-bold justify-between">
          <FlexBox className="gap-3 items-center md:text-base text-xs">
            <CheckBox isChecked={checkService} setIsChecked={setCheckService} />
            <span className="font-medium">서비스 이용 약관에 동의합니다</span>
            <span className="text-[#ED6661] text-xs">(필수)</span>
          </FlexBox>
          <FlexBox className="items-center">
            <Link
              href="/"
              className="text-[#4584EE] cursor-pointer md:text-sm text-xs"
            >
              보기
            </Link>
          </FlexBox>
        </FlexBox>
        <FlexBox className="justify-between font-bold">
          <FlexBox className="gap-3 items-center justify-center md:text-base text-xs">
            <CheckBox isChecked={checkPrivacy} setIsChecked={setCheckPrivacy} />
            <span className="font-medium">
              개인정보 수집 및 이용에 동의합니다
            </span>
            <span className="text-[#ED6661] text-xs">(필수)</span>
          </FlexBox>
          <FlexBox className="items-center">
            <Link
              href="/"
              className="text-[#4584EE] cursor-pointer md:text-sm text-xs"
            >
              보기
            </Link>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <FlexBox className="justify-end pt-4">
        <ButtonNavigate
          text="다음"
          onClick={() => router.push("/auth/register/profile")}
          isActive={checkAll}
          isDisabled={!checkAll}
        />
      </FlexBox>
    </>
  );
};

export default TermsClient;
