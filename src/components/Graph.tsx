import FlexBox from "./layout/FlexBox";
import GridBox from "./layout/GridBox";
import Icons from "./Icons";
import { Status, ApplicantData } from "@/app/types/mypage";

interface GraphProps {
  data: ApplicantData[];
}
const Graph = ({ data }: GraphProps) => {
  const getStatusColor = (status: Status) => {
    switch (status) {
      case "작성 중":
        return "text-gray-600";
      case "지원 완료":
        return "text-blue-600";
      case "서류 합격":
        return "text-green-600";
      case "불합격":
        return "text-pink-600";
      case "최종 합격":
        return "text-green-600";
      default:
        return "";
    }
  };

  return (
    <section className="w-[346px] h-auto md:w-[857px] bg-white rounded-xl border border-[#E5E7EB]">
      <div className="px-4 w-full">
        <GridBox
          cols={5}
          className="text-sm md:text-base text-[#8D95A0] py-4 md:py-6 px-4 md:px-8"
        >
          <span className="col-span-1">기수</span>
          <span className="col-span-3">파트</span>
          <span className="col-span-1 text-right">지원상태</span>
        </GridBox>

        <div className="border-b border-[#E5E7EB] w-full"></div>

        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={item.id}>
              <GridBox
                cols={5}
                className="text-sm md:text-base py-4 md:py-6 px-4 md:px-8 font-bold text-[#394150]"
              >
                <span className="col-span-1 ">{item.id}</span>
                <span className="col-span-3">{item.part}</span>
                <span
                  className={`col-span-1 text-right ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </GridBox>
              {index < data.length - 1 && (
                <div className="border-b border-[#E5E7EB] w-full"></div>
              )}
            </div>
          ))
        ) : (
          <FlexBox
            direction="col"
            className="items-center gap-2 justify-center h-[270px] md:h-[300px]"
          >
            <Icons name="x" width={20} height={20} />
            <p className="text-[#8D95A0]">아직 지원하신 내용이 없습니다</p>
          </FlexBox>
        )}
      </div>
    </section>
  );
};

export default Graph;
