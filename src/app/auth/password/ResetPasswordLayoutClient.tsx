"use client";

import { usePathname } from "next/navigation";
import StepBar from "@/components/StepBar";
import FlexBox from "@/components/layout/FlexBox";

/** 비밀번호 찾기 과정 - 1.찾기, 2.리셋 */
type ResetPasswordProcess = "find" | "reset";
const registerMap: Record<ResetPasswordProcess, number> = {
  find: 1,
  reset: 2,
};

const stepCount = Object.keys(registerMap).length;

const ResetPasswordLayoutClient = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const pathName = usePathname();
  const step =
    registerMap[
      pathName.replace("auth/password/", "") as ResetPasswordProcess
    ] || 1;
  return (
    <>
      <div className="md:pt-28 md:pb-16 pt-20 pb-10">
        <StepBar title="비밀번호 찾기" maxStep={stepCount} currentStep={step} />
      </div>
      <section className="bg-[#F9FAFB] flex-1">
        <FlexBox
          className="py-12 md:w-[562px] w-[348px] mx-auto h-full gap-4"
          direction="col"
        >
          {children}
        </FlexBox>
      </section>
    </>
  );
};

export default ResetPasswordLayoutClient;
