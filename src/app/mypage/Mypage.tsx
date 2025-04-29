import Link from "next/link";
import FlexBox from "@/components/layout/FlexBox";
import Graph from "@/components/Graph";
import { ApplicantData } from "../types/mypage";

const Mypage = () => {
  const applicantData: ApplicantData[] = [
    { id: 15, part: "백엔드", status: "작성 중" },
    { id: 14, part: "웹 프론트엔드", status: "지원 완료" },
    { id: 13, part: "백엔드", status: "서류 합격" },
    { id: 12, part: "데이터 분석", status: "불합격" },
    { id: 11, part: "딥러닝", status: "최종 합격" },
  ];

  return (
    <main className="h-screen flex flex-col">
      <div className="pt-24 pb-12 md:pt-40 md:pb-25">
        <FlexBox direction="col" className="items-center gap-2">
          <h2 className="font-bold text-3xl md:text-5xl text-white text-center">
            15TH TAVE
          </h2>
          <h2 className="font-bold text-3xl md:text-5xl text-white text-center">
            RECRUITING
          </h2>
          <Link
            href="/recruit"
            className="bg-[#FFFFFF40] bg-opacity-25 text-white px-5 py-3 rounded-xl mt-8 cursor-pointer"
          >
            지원하러 가기
          </Link>
        </FlexBox>
      </div>
      <section className="bg-[#F9FAFB] flex-1">
        <FlexBox
          className="py-12 md:w-[562px] w-[348px] mx-auto h-full gap-4 items-center"
          direction="col"
        >
          <h1 className="font-bold md:text-2xl text-xl text-[#394150] text-center mb-4">
            지원 현황
          </h1>

          <Graph data={applicantData} />
        </FlexBox>
      </section>
    </main>
  );
};

export default Mypage;
