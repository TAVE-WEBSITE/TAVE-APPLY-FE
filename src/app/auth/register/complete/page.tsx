import Link from "next/link";
import FlexBox from "@/components/layout/FlexBox";

const Complete = () => {
  return (
    <FlexBox
      direction="col"
      className="text-[#394150] md:text-[32px] text-2xl font-bold text-center h-full justify-center gap-8"
    >
      <div>
        <p>홍길동님</p>
        <p>회원가입이 완료되었습니다!</p>
      </div>
      <FlexBox direction="col" className="items-center">
        <Link
          href="/"
          className="w-[98px] h-[50px] bg-[#195BFF] text-[#FFFFFF] font-bold text-base rounded-lg flex items-center justify-center"
        >
          돌아가기
        </Link>
      </FlexBox>
    </FlexBox>
  );
};

export default Complete;
