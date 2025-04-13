"use client";

import { usePathname } from "next/navigation";
import StepBar from "@/components/StepBar";
import FlexBox from "@/components/layout/FlexBox";

/** terms - 이용약관, profile1 - 이름 등, profile2 - 이메일 등, complete - 가입완료 */
type RegisterProcess = "terms" | "account" | "profile" | "complete";
const registerMap: Record<RegisterProcess, number> = {
  terms: 1,
  profile: 2,
  account: 3,
  complete: 4,
};

const stepCount = Object.keys(registerMap).length;

const RegisterLayoutClient = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const pathName = usePathname();
  const step =
    registerMap[pathName.replace("auth/register/", "") as RegisterProcess] || 1;
  return (
    <>
      <div className="md:pt-28 md:pb-16 pt-20 pb-10">
        <StepBar title="JOIN TO TAVE" maxStep={stepCount} currentStep={step} />
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

export default RegisterLayoutClient;
