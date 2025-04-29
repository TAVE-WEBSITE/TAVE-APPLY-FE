import FlexBox from "@/components/layout/FlexBox";
import ButtonNavigate from "@/components/Button/ButtonNavigate";
import Link from "next/link";
import { Grid } from "swiper/modules";
import GridBox from "@/components/layout/GridBox";
import CardNavigate from "@/components/card/CardNavigate";

const Passed = () => {
  return (
    <div className="text-[#394150] text-center">
      <FlexBox direction="col" className="gap-32">
        <div>
          <p className="text-lg md:text-xl font-bold ">
            TAVE 15기 회원이 되신 것을 <br className="block md:hidden" />{" "}
            진심으로 축하드립니다!
          </p>
          <p className="font-medium text-sm md:text-base">
            <br />
            안녕하세요, IT 연합 동아리 TAVE 15기 운영진 입니다.
            <br />
            000님께서 TAVE 15기 회원 모집에{" "}
            <span className="text-[#FF0073] font-bold">최종 합격</span>
            하셨습니다. <br />
            <br />
            아래 사항을 차근차근 읽고 이행해주시면 감사하겠습니다. <br />
            <span className="text-[#FF0073] font-bold">
              미 이행 시 합격이 취소될 수 있으니,
              <br className="block md:hidden" />이 점 유의해 주시기 바랍니다.
            </span>
          </p>
        </div>
        <FlexBox
          direction="col"
          className="gap-4 font-bold text-sm md:text-base"
        >
          <div>
            <p className="text-[#39415099] text-opacity-60 font-bold text-xl">
              STEP 01
            </p>
            <p className="text-2xl">회비 입금</p>
          </div>
          <div>
            <p className="mt-4 text-md">
              15기 회비는 총{" "}
              <span className="text-blue-600 font-bold">90,000원</span>입니다.
            </p>
            <p className="text-[#39415099] opacity-60">
              (동아리 회비 60,000원 + MT 회비 30,000원)
            </p>
          </div>
          <p className="mt-6">
            TAVE의 회비의 사용 내역은 투명하게 공개하고,{" "}
            <br className="block md:hidden" />
            정기적으로 회계 결산 발표가 진행됩니다.
          </p>

          <CardNavigate title="회비 입금 마감" buttonText="지금 입금하기" />
        </FlexBox>

        <FlexBox direction="col" className="gap-8 font-bold">
          <div>
            <p className="text-[#39415099] text-opacity-60 font-bold text-xl">
              STEP 02
            </p>
            <p className="text-2xl">아지트 초대 설문 조사</p>
          </div>
          <p className="text-sm md:text-base font-medium">
            온라인 플랫폼 “
            <span className="text-blue-600 font-bold">아지트</span>”를 활용하여
            TAVE 공지와 활동이 이루어지고 있습니다.
            <br />
            원활한 아지트 초대를 위해 정보 조사를 진행하고 있으니 꼭 작성
            부탁드립니다.
          </p>
          <CardNavigate title="아지트 설문 조사" buttonText="지금 작성하기" />
        </FlexBox>

        <FlexBox direction="col" className="gap-8 font-bold">
          <div>
            <p className="text-[#39415099] text-opacity-60 font-bold text-xl">
              STEP 03
            </p>
            <p className="text-2xl">OT 공지방 입장</p>
          </div>
          <p className="text-sm md:text-base font-medium">
            0월 0일에 진행될 TAVE 15기의 첫 행사인{" "}
            <br className="block md:hidden" /> ‘OT 및 MT’를 위한 공지방입니다.
            <br className="block md:hidden" />
            <br />
            원활한 인원 파악 및 진행을 위해 <br className="block md:hidden" />{" "}
            하단의 주의 사항을 읽고 진행해주세요.
          </p>
          <div>
            <p className="font-bold text-[#39415099] text-opacity-50">
              입장시 주의사항
            </p>
            <GridBox
              cols={2}
              className="text-xs md:text-sm mt-4 font-medium gap-4"
            >
              <div className="w-[160px] md:w-[270px] border border-[#E5E7EB] rounded-xl bg-white p-4">
                <p className="font-bold text-black text-opacity-60">이름</p>
                <p className="hidden md:block">전화번호 뒷자리/기수/지원분야</p>
                <p className="block md:hidden">전화번호 뒷자리/기수/분야</p>
              </div>
              <div className="w-auto md:w-[270px] border border-[#E5E7EB] rounded-xl bg-white p-4">
                <p className="font-bold text-black text-opacity-60">예시</p>
                <p>2018/15기/FE</p>
              </div>

              <div className="w-[160px] md:w-[270px] h-[237px] border border-[#E5E7EB] rounded-xl bg-white p-4">
                <p className="font-bold text-black text-opacity-60">
                  지원분야 양식
                </p>
                <div className="flex flex-col items-center justify-evenly h-full">
                  <FlexBox className="w-full items-center justify-between">
                    <span>디자인</span>
                    <span>DE</span>
                  </FlexBox>
                  <FlexBox className="w-full items-center justify-between">
                    <span>웹 & 앱 프론트엔드</span>
                    <span>FE</span>
                  </FlexBox>
                  <FlexBox className="w-full items-center justify-between">
                    <span>백엔드</span>
                    <span>BE</span>
                  </FlexBox>
                  <FlexBox className="w-full items-center justify-between">
                    <span>데이터분석</span>
                    <span>DA</span>
                  </FlexBox>
                  <FlexBox className="w-full items-center justify-between">
                    <span>딥러닝</span>
                    <span>DL</span>
                  </FlexBox>
                </div>
              </div>

              <FlexBox direction="col" className="gap-4">
                <FlexBox
                  direction="col"
                  className="w-[160px] md:w-[270px] h-[108px] rounded-xl bg-[#2554FF14] bg-opacity-8 border border-[#2554FF14] border-opacity-20 p-4 justify-center items-center text-blue-600"
                >
                  <p className="font-bold opacity-60">사담 금지</p>
                  <p>조용히 입장 부탁드립니다</p>
                </FlexBox>
                <FlexBox
                  direction="col"
                  className="w-[160px] md:w-[270px] h-[108px] border border-[#E5E7EB] rounded-xl bg-blue-600 p-4 justify-center items-center text-white"
                >
                  <p className="font-bold opacity-60">참여 코드</p>
                  <p>1207</p>
                </FlexBox>
              </FlexBox>
            </GridBox>
          </div>

          <CardNavigate title="공지방 입장" buttonText="지금 입장하기" />
        </FlexBox>

        <FlexBox direction="col" className="gap-8 items-center font-bold pb-32">
          <p className="text-2xl md:text-3xl">궁금한 점이 있으신가요?</p>
          <Link
            href="/"
            className="w-[154px] bg-black text-white rounded-xl py-3 px-4"
          >
            1:1 문의하기
          </Link>
        </FlexBox>
      </FlexBox>
    </div>
  );
};

export default Passed;
