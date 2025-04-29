"use client";

import Link from "next/link";
import { JSX, useState } from "react";
import { Status } from "../types";
import FlexBox from "@/components/layout/FlexBox";
import Passed from "./Passed";

const welcomeMap: Record<Status, JSX.Element> = {
  "최종 합격": <Passed />,
  "작성 중": <div />,
  "지원 완료": <div />,
  "서류 합격": <div />,
  불합격: <div />,
};

const Welcome = () => {
  const [status, setStatus] = useState<Status>("최종 합격");

  return (
    <div className="h-screen flex flex-col">
      <div className="pt-24 pb-12 md:pt-32 md:pb-18">
        <h2 className="font-bold text-2xl md:text-5xl text-white text-center">
          WELCOME TO 15TH TAVE
        </h2>
      </div>
      <section className="bg-[#F9FAFB] flex-1">
        <FlexBox
          className="py-12 md:w-[562px] w-[348px] mx-auto h-full gap-4 items-center"
          direction="col"
        >
          {welcomeMap[status]}
        </FlexBox>
      </section>
    </div>
  );
};

export default Welcome;
