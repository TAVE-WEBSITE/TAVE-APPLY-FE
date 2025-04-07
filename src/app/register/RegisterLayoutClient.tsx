"use client";

import { usePathname } from "next/navigation";
import StepBar from "@/components/StepBar";
import FlexBox from "@/components/layout/FlexBox";

type RegisterProcess = "account" | "profile" | "complete";
const registerMap: Record<RegisterProcess, number> = {
  account: 1,
  profile: 2,
  complete: 3,
};

const RegisterLayoutClient = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const pathName = usePathname();
  const step =
    registerMap[pathName.replace("/register/", "") as RegisterProcess] || 1;
  return (
    <>
      {" "}
      <div className="pt-28 pb-16">
        <StepBar title="JOIN TO TAVE" maxStep={3} currentStep={step} />
      </div>
      <section className="bg-[#F9FAFB] flex-1">
        <FlexBox
          className="py-12 md:w-[562px] w-[328px] mx-auto h-full gap-4"
          direction="col"
        >
          {children}
        </FlexBox>
      </section>
    </>
  );
};

export default RegisterLayoutClient;
