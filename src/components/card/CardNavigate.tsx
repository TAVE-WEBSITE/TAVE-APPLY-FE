"use client";

import Link from "next/link";
import FlexBox from "../layout/FlexBox";

interface CardNavigateProps {
  title: string;
  buttonText: string;
}
const CardNavigate = ({ title, buttonText }: CardNavigateProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-0 w-full md:w-4/5 mx-auto bg-white border border-[#E5E7EB] p-4 rounded-xl justify-between items-center shadow-md">
      <FlexBox
        direction="col"
        className="w-full text-xs md:text-sm items-start font-medium"
      >
        <p>{title}</p>
        <p>
          <span className="text-blue-600 font-bold">00일 00시간 00분 00초</span>{" "}
          남았습니다.
        </p>
      </FlexBox>
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full md:w-auto bg-blue-600 py-2 px-3 text-white rounded-lg text-sm text-nowrap"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default CardNavigate;
