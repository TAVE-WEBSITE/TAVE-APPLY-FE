import { useRouter } from "next/navigation";
import ButtonNavigate from "@/components/Button/ButtonNavigate";
import FlexBox from "@/components/layout/FlexBox";

const Complete = () => {
  const router = useRouter();
  return (
    <>
      <h1 className="font-bold text-2xl text-[#394150] text-center">
        지원 완료
      </h1>
      <h2 className="text-center text-[#394150] font-lg font-medium mt-2">
        작성해주신 서류가 성공적으로 제출되면 <br />
        가입하신 이메일로 지원 완료 메일 전송됩니다.
      </h2>

      <FlexBox direction="col" className="w-full gap-4 items-center">
        <p className="w-full font-semibold text-[#394150] text-sm md:text-base rounded-[20px] border border-gray-200 p-6 mt-4">
          1) TAVE 15기 활동은 매주 토요일에 오프라인으로 진행됩니다.
        </p>

        <p className="w-full font-semibold text-[#394150] text-sm md:text-base rounded-[20px] border border-gray-200 p-6 mt-4">
          2) 모든 정기 세션은 필수 참여가 원칙이며, 토요일 14시 ~ 18시 사이에
          진행됩니다.
        </p>

        <p className="w-full font-semibold text-[#394150] text-sm md:text-base rounded-[20px] border border-gray-200 p-6 mt-4">
          3) TAVE 16기 OT 및 MT는 8/31 (토) 이며, 만남의 장은 9/7 (토) 에 진행될
          예정입니다.
        </p>

        <p className="w-full font-semibold text-[#394150] text-sm md:text-base rounded-[20px] border border-gray-200 p-6 mt-4">
          4) 합격 후 OT 및 MT 참석, 만남의 장 불참으로 인한 합격 취소 시 회비
          환불되지 않습니다.
        </p>
      </FlexBox>
      <FlexBox className="justify-center mt-8">
        <ButtonNavigate
          text="확인했습니다"
          onClick={() => router.push("/")}
          className="md:w-[140px]"
        />
      </FlexBox>
    </>
  );
};

export default Complete;
